<template>
  <div class="couponList">
    <commonHeader :leftIcon="leftIcon" :rightIcon="rightIcon" :title="title" />
    <div class="couponList-con" v-if="items.length>0">
      <ul>
        <li :key="itemIndex" v-for="(item,itemIndex) in items">
          <div>
            <!-- <div class="price">
              <p v-if="item.pbCode === '0003'">
                ￥
                <span>{{item.discAmount}}</span>
              </p>
              <p v-if="item.pbCode === '0004'">
                减
                <span>{{item.discAmount}}</span>
              </p>
              <p v-if="item.pbCode === '0005'">
                <span>{{item.discAmount/10}}</span>折
              </p>
            </div>-->

            <h1 :style="{color:baseColor}">
              <span v-if="item.pbCode === '0003'">
                ￥
                <i>{{item.discAmount}}</i>
              </span>
              <span v-if="item.pbCode === '0004'">
                减
                <i>{{item.discAmount}}</i>
              </span>
              <span v-if="item.pbCode === '0005'">
                <i>{{item.discAmount/10}}</i>折
              </span>
            </h1>

            <h3>{{item.promotionName}}</h3>
          </div>
          <div>
            <h2
              v-if="item.dataState == 0 && item.pbCode === '0004'"
            >满{{item.pmPromotion.pmPromotionConditionList[0].condAmount}}减{{item.pmPromotion.pmPromotionConditionList[0].condResultAmount}}</h2>
            <h2 v-else></h2>
            <h4>{{item.couponStart}}至{{item.couponEnd}}</h4>
            <div @click="getCoupon(item.promotionCode)" class="right">领取</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="couponList-nulls" v-else>
      <img :src="nullImg" />
    </div>
    <lastPageLine :lastPageLine="lastPageLine" />
  </div>
</template>

<script>
import http from '@/api/http.js'
import { $storage, $router } from '@/utils/prototype/vue.js'
import { coupon } from '@/api/interface.js'
import commonHeader from '@/components/communal/commonHeader'
import vueTabBar from '@/components/communal/vueTabBar'
import { formatDate, formatTimes } from '@/utils/prototype/date.js'
import lastPageLine from '@/components/communal/last-page-line'

export default {
  data () {
    return {
      title: '领劵中心',
      leftIcon: true,
      rightIcon: true,
      baseColor: '',
      current: 0,
      total: 0,
      page: 1,
      rows: 10,
      items: [],
      dataState: 0,
      lastPageLine: false,
      // userImgurl: require("../../../../../..static/img/mine/default_header.png"),
      nullImg: this.$imgDomain + '/paas/shop-master/c-static/images/wxminiImg/no_coupon.png'
    }
  },
  components: {
    commonHeader,
    lastPageLine
  },
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: $storage.get('proappEnvName')
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: '#' + this.$state.baseColor
    })
  },
  mounted () {
    this.baseColor = '#' + this.$state.baseColor
    // queryCouponList 查询所有的优惠券
    // http.post(coupon.queryUsercouponNember).then(res => {

    // })
    this.commonMounted()
  },
  onReachBottom () {
    // 到这底部在这里需要做什么事情
    this.loadMore()
  },
  methods: {
    commonMounted () {
      http.post(coupon.queryCouponList, { page: this.page, rows: this.rows }).then(res => {
        if (res && res.rows) {
          this.items = res.rows
          this.items.map(v => {
            v.couponStart = formatTimes(v.promotionBegintime)
            v.couponEnd = formatTimes(v.promotionEndtime)
          })
        }
        if (this.items.length === 0) {
          this.lastPageLine = false
        }
      })
    },
    getCoupon (code) {
      console.log('点击领劵')
      http.post(coupon.saveUsercoupon, {
        couponAmount: 1, // 数量默认一张
        promotionCode: code
      }).then(res=>{
        if(res.success){
          wx.showToast({
            title:'领取成功',
            icon:'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title:res.msg,
            icon:'none',
            duration: 2000
          })
        }
      })
    },
    loadMore () {
      let num = Math.ceil(this.total / 10)
      this.page++
      if (this.page <= num) {
        http.post(coupon.couponList, { page: this.page, rows: this.rows, dataState: this.dataState }).then(res => {
          let list = res.rows
          list.map(v => {
            v.couponStart = formatDate(v.couponStart)
            v.couponEnd = formatDate(v.couponEnd)
          })

          this.items = [...this.items, ...list]
        })
      } else {
        this.lastPageLine = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../../../common/css/common.less';
.couponList {
  width: 100%;
  height: 100%;
  background: @white-color;
  .couponList-get {
    position: fixed;
    z-index: 9999;
    height: 90rpx;
    width: 70rpx;
    line-height: 90rpx;
    text-align: right;
    right: 30rpx;
    top: 0;
    font-size: @big-title;
  }

  &-con {
    margin-top: 90rpx;
    padding: 15rpx 30rpx 0;
    ul {
      li {
        padding: 38rpx 33rpx 30rpx;
        border-radius: 5rpx;
        box-shadow: 0rpx 0rpx 30rpx #eee;
        margin: 30rpx 0 20rpx;
        div {
          display: flex;
          align-items: center;
          h1 {
            color: #d66377;
            font-size: 22rpx;
            margin-right: 50rpx;
            width: 136rpx;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              font-size: 50rpx;
            }
          }
          h2 {
            font-size: 22rpx;
            color: @color-999;
            width: 136rpx;
            text-align: center;
            margin-right: 50rpx;
          }
          h3 {
            font-size: @top-title;
            color: @color-333;
          }
          h4 {
            font-size: 20rpx;
            color: @color-999;
          }
        }
      }
      .right {
        width: 80rpx;
        height: 40rpx;
        border-radius: 40rpx;
        background-color: #208e43;
        line-height: 40rpx;
        // text-align: center;
        position: absolute;
        right: 60rpx;
        margin-top: -30rpx;
        color: white;
        font-size: 24rpx;
        text-align: right;
        padding-left: 30rpx;
      }
    }
  }
  &-nulls {
    height: calc(100% - 202rpx);
    text-align: center;
    img {
      width: 395rpx;
      height: 330rpx;
      margin: 280rpx auto 0;
    }
  }
}
</style>




