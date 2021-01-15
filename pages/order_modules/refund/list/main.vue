<template>
    <div class="orderList">
      <commonHeader 
      :title="title"
      :leftIcon="leftIcon"
      :rightIcon="rightIcon"
      />
     <!-- <div class="orderList-tit">
       <ul>
         <li v-for="(item,index) in items" :key="index" @click="orderTitle(item,index)">
           <a :class="current === index ? 'active' : ''">{{item}}<span></span></a>
         </li>
       </ul>
     </div> -->
     <div class="orderList-info" v-if="items.length>0">
       <ol>
         <li v-for="(item,index) in items" :key="index">
           <a>
             <div class="order-status">
               <div>订单编号：{{item.contractBillcode}}</div>
               <div></div>
             </div>
             <div class="order-msg" v-for="(goods,goodsIndex) in item.ocRefundGoodsList" :key="goodsIndex">
                <img :src="goods.dataPic||userImgurl"/>
                <div>
                  <div>
                    <p class="currentP">{{goods.goodsName}}</p>
                    <h6>{{goods.skuName}}</h6>
                  </div>
                  <div style="text-align:right;">
                    <!-- <p style="width:160rpx;">￥{{goods.pricesetNprice}}</p> -->
                    <p style="color:#999">x{{goods.goodsNum}}</p>
                    <h5></h5>
                  </div>
                </div>
             </div>
             <div class="order-btn">
               <div class="left" >退款金额：<i>{{unitPrice.obpay}}{{item.refundMoney}}{{unitPrice.mapay}}</i></div>
               <div class="right">
                 <div class="btn-check-detail" :style="{borderColor:baseColor,color:baseColor}" @click="seeAfterDetail(item)">查看详情</div>
               </div>
             </div>
           </a>
         </li>
       </ol>
     </div>
     <div class="orderList-nulls" v-else>
        <img :src="nullImg"/>
      </div>
      <lastPageLine :lastPageLine="lastPageLine"/>
    </div>
    
</template>

<script>
import http from '@/api/http.js'
import {$storage,$router} from '@/utils/prototype/vue.js'
import {refund} from '@/api/interface.js'
import commonHeader from '@/components/communal/commonHeader';
import lastPageLine from '@/components/communal/last-page-line';
export default {
  data() {
    return {
      title:"售后中心",
      leftIcon:true,
      rightIcon:false,
      current:0,
      baseColor:'',
      page:1,
      rows:10,
      items:[],
      total:10,
      lastPageLine:false,
      userImgurl:this.$imgDomain+'/paas/shop-master/c-static/images/wxminiImg/img_default.jpg',
      nullImg:this.$imgDomain+'/paas/shop-master/c-static/images/wxminiImg/noOrder.png'

    }
  },
  components:{
    commonHeader,
    lastPageLine
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
  computed: {
    unitPrice() {
      // mapay 主单位（后面）  mbpay 主单位（前面）  obpay 辅单位（前面）   oapay 辅单位（后面）
      return this.$state.unitPrice || $storage.get("unitPrice");
    }
  },
  mounted() {
    this.baseColor='#'+this.$state.baseColor
    this.page = 1
    this.items = []
    this.commonMounted()
  },
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    this.loadMore();
  },
  methods: {
    commonMounted(){
      this.lastPageLine = false;
      http.post(refund.queryRefundPage,{page:this.page,rows:this.rows}).then(res=>{
        if(res&&res.rows){
          this.items = [...this.items,...res.rows];
          this.items.map(v=>{
            v.ocRefundGoodsList.map(val=>{
              if(!RegExp(/http/).test(val.dataPic)){
                val.dataPic=this.$domain+val.dataPic
              }
            })
          })
          
          this.total = res.total;
        }
      })
    },
    // orderTitle(item,index){
    //   this.current = index;
    // },
    seeAfterDetail(item){
      this.$state.orderMenu.map(v=>{
        if(v.menuAction=='refundInfor'){
          $router.push(v.menuJspath,{refundCode:item.refundCode})
        }
      })
      //$router.push('afterService/afterDetail',{refundCode:item.refundCode})
      //http.post(refund.getRefundByCode,{refundCode:item.refundCode}).then()
    },
    loadMore(){
      let num = Math.ceil(this.total/10);
      this.page++;
      if(this.page<= num){
        this.commonMounted()
      }else{
        this.lastPageLine = true;
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../../../common/css/common.less';
  .orderList{
    width: 100%;
    height: 100%;
    background: @white-color;
    &-tit{
      width: 100%;
      position: fixed;
      top: 100rpx;
      left: 0;
      ul{
        display: flex;
        height: 90rpx;
        li{
          height: 90rpx;
          flex:1;
          a{
            width: 100%;
            height: 100%;
            line-height: 90rpx;
            text-align: center;
            display: inline-block;
            position: relative;
            font-size: 28rpx;
            color:@color-333;
          }
          .active{
            color: #bfa676;
            span{
            position: absolute;
            height: 3rpx;
            width: 100%;
            background: #bfa676;
            bottom: 0;
            left: 0;
            }
          }
        }
      }
    }
    &-info{
      
      margin-top: 90rpx;
      ol{
        li{
          border-bottom: 20rpx solid #fafafa;
          padding:@padding-30;
          background: @white-color;
          &:first-child{
            border-top: 20rpx solid #fff;
          }
          a{
            .order-status{
              height: 79rpx;
              display: flex;
              align-items: center;
              justify-content: space-between;
              >div{
                font-size: @big-title;
              }
            }
            .order-msg{
              padding-top:15rpx;
              // border-top: 1rpx solid #f6f6f8;
              // border-bottom: 1rpx solid #f6f6f8;
              display: flex;
              justify-content: space-between;
              img{
                width: 130rpx;
                height: 130rpx;
                margin-right: @margin-right;
              }
              >div{
                display: flex;
                justify-content: space-between;
                p{
                  font-size: @big-title;
                  color:@color-333;
                  margin: 12rpx 0 25rpx 0;
                }
                .currentP{
                  width: 380rpx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                h6{
                  font-size: 24rpx;
                  color:@color-999;
                }
              }

            }
            .order-btn{
              height: 88rpx;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .left{
                font-size: @big-title;
                display: flex;
                align-items: center;
                i{
                  color: #d66377;
                }
              }
			  .right{
				  display: flex;
				  align-items: center;
				  .btn-check-detail{
				    display: inline-block;
				    border:1rpx solid #d4d4d4;
				    line-height: 46rpx;
				    border-radius: 26rpx;
				    padding: 0 20rpx;
				    font-size: 22rpx;
				    color:@color-666;
				    margin-right: @margin-right;
				    &:last-child{
				      margin-right: 0;
				    }
				  }
			  }
              
            }
          }
        }
      }
    }
    &-nulls{
    height: calc(100% - 202rpx);
    text-align: center;
      img{
        width: 424rpx;
        height: 311rpx;
        margin: 280rpx auto 0;
      }
    }
  }
</style>




