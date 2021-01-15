<template>
    <div class="evaluateList">
      <commonHeader 
      :title="title"
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      />
      <div class="evaluateList-box">
        <ul>
          <li v-for="(item,index) in items" :key="index">
            <div class="box-con">	
              <div class="box-tit">
                <div class="box-left">
                  <img :src="item.userImgurl?item.userImgurl:userImgurl"/>
                    <div>
                      <h3>{{item.memberBname}}</h3>
                      <p  :style="{color:baseColor}">
                        <i class="iconfont" v-for="(scope,scopeIndex) in item.evaluateScopeReList" :key="scopeIndex">&#xe610;</i>
                        <i class="iconfont" v-if='item.evaluateScopeReList.length<5' :style="{color:baseColor}" v-for='(sc,scIndex) in (5-item.evaluateScopeReList.length)' :key="scIndex">&#xe60e;</i>
                      </p>
                    </div>

                </div>
                <div class="box-right">{{item.gmtCreate}}</div>
              </div>
              <div class="box-info">{{item.evaluateGoodsContent}}</div>
              <div class="reply" v-if="item.shopReply">
                <i class="iconfont">&#xe766;</i>
                <p>客服回复：{{item.shopReply[0].evaluateReplyContent}}</p>
              </div>
              <ol v-show="item.evaluateGoodsImgs&&item.evaluateGoodsImgs.length>0">
                <li v-for="(imgs,imgIndex) in item.evaluateGoodsImgs" :key="imgIndex">
                  <img :src="domain+imgs"/>
                </li>
                
              </ol>
              <div class="spec">规格：{{item.skuName}}</div>
              <div class="goods">
                <div class="goods-l">
                  <img :src="item.dataPic|| userImgurl"/>
                  <p>{{item.goodsName}}</p>
                </div>
                <div class="goods-r"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
</template>

<script>
import http from '@/api/http.js'
import {$storage,$router} from '@/utils/prototype/vue.js'
import {getAllComment} from '@/api/interface.js'
import commonHeader from '@/components/communal/commonHeader';
import {formatDate} from '@/utils/prototype/date.js'
import lastPageLine from '@/components/communal/last-page-line';
export default {
  data() {
    return {
      title:"我的评价",
      leftIcon:true,
      rightIcon:false,
      page:1,
      rows:10,
      total:0,
      items:[],
      domain:this.$domain,
      lastPageLine:false,
      baseColor:'',
      userImgurl: require("../../../../static/img/mine/default_header.png"), 

    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: $storage.get('proappEnvName')
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: '#'+this.$state.baseColor
    })
  },
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    this.loadMore();
  },
  mounted() {
    this.baseColor='#'+this.$state.baseColor
    this.commonMounted()
  },

  components:{
    commonHeader,
    lastPageLine
  },
  computed: {
    unitPrice() {
      // mapay 主单位（后面）  mbpay 主单位（前面）  obpay 辅单位（前面）   oapay 辅单位（后面）
      return this.$state.unitPrice || $storage.get("unitPrice");
    }
  },
  methods: {
    commonMounted(){
      http.post(getAllComment,{page:this.page,rows:this.rows}).then(res=>{
        if(res){
          this.items = res.rows;
          this.items.map(v=>{
            
            v.gmtCreate = formatDate(v.gmtCreate)
            v.memberBname = v.memberBname.substring(0,1)+'***'+v.memberBname.substring(v.memberBname.length-1)
            if(v.evaluateGoodsImgs){
              v.evaluateGoodsImgs=v.evaluateGoodsImgs.split(",")
            }
            
            
            if(!RegExp(/http/).test(v.dataPic)){
              v.dataPic=this.$domain+v.dataPic
            }
            if(!RegExp(/http/).test(v.userImgurl)){
              v.userImgurl=this.$domain+v.userImgurl
            }
          })
          this.total = res.total;
        }
      })
    },
    loadMore(){
      let num = Math.ceil(this.total/10);
      this.page++;
      if(this.page<= num){
        http.post(getAllComment,{page:this.page,rows:this.rows}).then(res=>{
          let list = res.rows;
          list.map(v=>{
            v.gmtCreate = formatDate(v.gmtCreate)
            v.evaluateGoodsImgs = v.evaluateGoodsImgs.split(',')
          })
          this.items = [...this.items,...list]
        })
      }else{
        this.lastPageLine = true;
      }
    },
	goToGoodsDetail(item) {
		$storage.get('footerMenu').map(v => {
			if (v.menuAction == 'car') {
				$router.push('web', {
					defaultUrl: this.$businessDomain + '/paas/shop/' + $storage.get('hrefs') + item.skuCode + '.html'
				});
			}
		});
	},
  }
}
</script>

<style lang="less" scoped>
@import '../../../../common/css/common.less';
  .evaluateList{
    width: 100%;
    background: @white-color;
    &-box{
      padding-top: 90rpx;
      margin-top: 10rpx;
      ul{
        li{
          padding: 40rpx 0;
          border-bottom: 1rpx solid #f6f6f8;
          .box-con{
            padding:@padding-30;
            .box-tit{
              display: flex;
              align-items: center;
              justify-content:space-between;
              .box-left{
                display: flex;
                align-items: center;
                p{
                  i{
                    float: left;
                    margin-right: 10rpx;
                    font-size: 26rpx;
                  }
                }
                img{
                  width: 70rpx;
                  height: 70rpx;
                  border-radius: 50%;
                  margin-right: 16rpx;
                }
                h3{
                  color:#252525;
                  font-size: @big-title;
                }

              }
              .box-right{
                font-size: 20rpx;
                color:@color-999;
              }
            }
            .box-info{
              font-size: @top-title;
              color:@color-333;
              margin:32rpx 0 14rpx 0;
            }
            ol{
              overflow: hidden;
              zoom: 1;
              li{
                width: 214rpx;
                height: 214rpx;
                margin-right: 24rpx;
                float: left;
                img{
                  width: 214rpx;
                  height: 214rpx;
                }
                &:nth-child(3n){
                  margin-right: 0;
                }
              }
            }
            .spec{
              font-size: @middle-title;
              color:@color-999;
              margin-top: 30rpx;
            }
            .goods{
              display: flex;
              align-items: center;
              justify-content:space-between;
              margin-top: 32rpx;
              .goods-l{
                display: flex;
                align-items: center;
                img{
                  width: 92rpx;
                  height: 92rpx;
                  margin-right: 33rpx;
                }
                p{
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 400rpx;
                  white-space: nowrap;
                }
              }
              .goods-r{
                font-size: @big-title;
                color:@color-333;
              }
            }
            .reply{
              background: #f6f6f6;
              border-radius: 2rpx;
              position: relative;
              padding: 20rpx;
              p{
                line-height: 40rpx;
                font-size: @middle-title;
                color: @color-666;
              }
              i{
                color: #f6f6f6;
                position: absolute;
                top:-26rpx;
                left: 42rpx;
              }
            }
          }
        }
      }
    }
  }
</style>




