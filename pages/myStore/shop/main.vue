<template>
    <div class="shop">
      <div class="shop-tit">
        <div class="shop-tit-leftIcon">
          <i class="iconfont" @click="goBack">&#xe62d;</i>
        </div>
         <div class="shop-tit-title">{{shopMessage.shopdeName}}</div>
         <p></p>
        <span :class="[isFox === false?'foxFalse':'foxTrue']" :style="{background:isFox === false? baseColor:''}"  @click="tabFox">{{isFox === false?'收藏+':'已收藏'}}</span>
      </div>
      <swiper
        :indicator-dots="indicatorDots"
        indicator-color="rgba(255,255,255,0.5)"
        indicator-active-color="#fff"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :style="{height:'319rpx',width:'690rpx',margin:'20rpx auto 38rpx'}"
        v-show="imgUrls.length>0"
      >
        <div v-for="(imgItem,imgIndex) in imgUrls" :key="imgIndex" class="shop-swiper" >
          <swiper-item>
            <img :src="domain+imgItem" class="slide-image" width="690" height="319" />
          </swiper-item>
        </div>
      </swiper>
      <div class="shop-list" v-if="items.length>0">
        <ul>
          <li v-for="(item,index) in items" :key="index">
            <a @click="goodsDetail(item.skuCode)">
              <img :src="item.dataPic||userImgurl"/>
              <div class="list-box">
                <h3 :style="{color:'#d66377'}">{{unitPrice.obpay}}{{item.pricesetNprice}}{{unitPrice.mapay}}</h3>
                <p>{{item.goodsName?item.goodsName:''}}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="shop-nulls" v-else>
        <img :src="nullImg"/>
        <p>暂无商品</p>
      </div>
      <lastPageLine :lastPageLine="lastPageLine"/>
    </div>
    
</template>

<script>
import http from '@/api/http.js'
import {$storage,$router,$message} from '@/utils/prototype/vue.js'
import {querySkuFromSc,queryShopdeByMerchant,checkCollectExit,deleteCollectByCode,saveCollect} from '@/api/interface.js'
import vueTabBar from '@/components/communal/vueTabBar'
import lastPageLine from '@/components/communal/last-page-line';
export default {
  data() {
    return {
      baseColor:"",
      delStatus:true,
      isChecked:false,
      tChecked:true,
      allChecked:false,
      total:0,
      page:1,
      rows:10,
      domain:this.$domain,
      shopMessage:{},//店铺信息
      items:[],//商品信息
      isFox:false,
      imgUrls: [
        // 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        // 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        // 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      lastPageLine:false,
      code:'',
      userImgurl:this.$imgDomain+'/paas/shop-master/c-static/images/wxminiImg/img_default.jpg',
      nullImg:this.$imgDomain+'/paas/shop-master/c-static/images/wxminiImg/noGoods.png',
      collectionShop:'',// 收藏的路径
      shopList:''// 优选商家的路径
    }
  },
  components:{
    lastPageLine
  },
  computed: {
    unitPrice() {
      // mapay 主单位（后面）  mbpay 主单位（前面）  obpay 辅单位（前面）   oapay 辅单位（后面）
      return this.$state.unitPrice || $storage.get("unitPrice");
    }
  },
  onLoad(options) {
     wx.setNavigationBarTitle({
      title: $storage.get('proappEnvName')
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: '#'+this.$state.baseColor
    })
    
    if(options.json){
      $storage.set('skuMemberCode',JSON.parse(options.json))
    }
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    if(prevpage&&prevpage.route){
      $storage.set('prevpage',prevpage.route)
    }

    Object.assign(this, this.$options.data());
  },
  mounted() {
    
    this.baseColor='#'+this.$state.baseColor
    this.$state.nav.map(v=>{
      if(v.menuAction=='collectionShop'){
        this.collectionShop = v.menuJspath
      }
    })
    $storage.get('getTopPerMenuList').map(v=>{
      if(v.menuAction=='shopList'){
        this.shopList = v.menuJspath
      }
    })
     http.get(queryShopdeByMerchant,{memberCode: $storage.get('skuMemberCode').memberCode,page:1,rows:10}).then(res=>{
      if(res&&res.rows.length>0){
        this.shopMessage = res.rows[0]
        if(this.shopMessage.shopdeUrl){
          this.imgUrls.push(this.shopMessage.shopdeUrl)
        }
        if(this.shopMessage.shopdeUrl1){
          this.imgUrls.push(this.shopMessage.shopdeUrl1)
        }
        if(this.shopMessage.shopdeUrl2){
          this.imgUrls.push(this.shopMessage.shopdeUrl2)
        }
        console.log(this.imgUrls)
        http.post(checkCollectExit,{
          collectType: '1', 
          collectOpcode: $storage.get('skuMemberCode').memberCode,
        }).then(res=>{
          if(res.success){
            if(res.dataObj){
              this.isFox = true
              this.code = res.dataObj
            }else{
              this.isFox = false    
            }
          }else{
            this.isFox = false    
          }
        })
      }
    })
    
    this.commonMounted()
  },
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    this.loadMore();
    
    
  },
  methods: {
    commonMounted(){
       http.post(querySkuFromSc,{memberCode:$storage.get('skuMemberCode').memberCode,page:this.page,rows:this.rows}).then(res=>{
        this.items = res.rows;
        this.items.map(v=>{
          if(!RegExp(/http/).test(v.dataPic)){
            v.dataPic=this.$domain+v.dataPic
          }
        })
        if(this.items.length===0){
          this.lastPageLine = false;
        }
      })
    },
    tabFox(){
      console.log(this.isFox);
      if(this.isFox){
        http.post(deleteCollectByCode,{
          collectCode: this.code?this.code:$storage.get('skuMemberCode').memberCode,
          collectType: "1" //店铺
        }).then(res => {
          if(res.success){
            $message.alert("取消收藏成功")
            this.isFox = false
            this.code=""
          }else{
            $message.alert("取消收藏失败")
          }
        })
      }else{
        http.post(saveCollect,{
          collectType: '1', //0商品1店铺2其它
          collectOpcode:this.code?this.code:$storage.get('skuMemberCode').memberCode, //（商品code/店铺code）
          collectOppic:this.shopMessage.shopdeLogo,   //（商品图片/店铺图片）
          collectOpcont: this.shopMessage.shopdeName  //（商品名称/店铺名称）
        }).then(res => {
          if(res.success){
            $message.alert("收藏成功")
            this.isFox = true
            this.code = res.dataObj
          }else{
            $message.alert("收藏失败")
          }
        })
      }
    },
    goodsDetail(skuCode){
      $router.replace('web',{defaultUrl:this.$businessDomain+'/paas/shop/'+$storage.get('hrefs')+skuCode+'.html',path:'shop'})
    },
    goBack(){
      if($storage.get('prevpage') == 'pages/'+this.collectionShop+'/main'){
        $router.replace(this.collectionShop)
      }else if($storage.get('prevpage') == 'pages/'+this.shopList+'/main'){
         $router.replace(this.shopList)
      }else{
        let attr = this.$businessDomain+'/paas/shop/'+$storage.get('hrefs')+$storage.get('skuMemberCode').skuCode+'.html'
        $router.replace('web',{defaultUrl:this.$businessDomain+'/paas/shop/'+$storage.get('hrefs')+$storage.get('skuMemberCode').skuCode+'.html'})
      }
     
    },
    loadMore(){
      let num = Math.ceil(this.total/10);
      this.page++;
      if(this.page<= num){
        http.post(querySkuFromSc,{memberCode:$storage.get('skuMemberCode').memberCode,page:this.page,rows:this.rows}).then(res=>{
          let list = res.rows
          list.map(v=>{
            if(!RegExp(/http/).test(v.dataPic)){
              v.dataPic=this.$domain+v.dataPic
            }
          })
          
          this.items = [...this.items,...list]
        })
      }else{
        this.lastPageLine = true;
      }
    },
    
  },
}
</script>

<style lang="less" scoped>
@import '../../../common/css/common.less';
.shop{
  width: 100%;
  &-tit{
    height: 90rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 30rpx;
    position: relative;
    &-leftIcon{
      display: flex;
      align-items: center;
      font-size: 36rpx;
      color: @color-333;
      i{
        padding-right: 10rpx;
      }
    }
    &-title{
      font-size: 36rpx;
    }
    span{
      font-size: 22rpx;
      border-radius: 22rpx;
      margin-left: 20rpx;
      padding: 5rpx 12rpx;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right:30rpx;
    }
    .foxFalse{
      color: @white-color;
      background: #b79f77;
      
    }
    .foxTrue{
      color: #ccc;
      background: @white-color;
      border: 1rpx solid #ccc;
    }
  }
  .shop-swiper{
    text-align: center;
    // margin: 20rpx 0 38rpx;
    img{
      width: 690rpx;
      height: 319rpx;
      border-radius: 7rpx;
    }
  }
  &-list{
    width: 100%;
    margin-top:38rpx;
    ul{
      width: 100%;
      overflow: hidden;
      zoom: 1;
      li{
        width: calc(50% - 1rpx);
        float: left;
        border-right: 2rpx solid #f5f5f5;
        border-bottom: 2rpx solid #f5f5f5;
        &:nth-child(2n){
          border-right: 0;
        }
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
          font-size: @middle-title;
          text-align: center;
          img{
            width: 374.5rpx;
            height: 374.5rpx;
          }
          .list-box{
            padding:0 30rpx;
            h3{
              font-size: 32rpx;
              padding:16rpx 0;
            }
            p{
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical; 
              padding-bottom: 26rpx;

            }
          }
          
        }
      }
    }
  }
  &-nulls{
    width: 100%;
    margin-top: 400rpx;
    text-align: center;
    img{
      width: 284rpx;
      height: 212rpx;
      margin: 0 auto;
    }
    p{
      font-size: @middle-title;
      color: @color-666;
      margin-top: 15rpx;
    }
  }
}

</style>




