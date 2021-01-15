<template>
	<div class="couponList">
		<commonHeader :leftIcon="leftIcon" :rightIcon="rightIcon" :title="title" />
		<div class="couponList-con" v-if="items.length > 0"><coupon-list-item :list="items" @getCoupon="getCoupon"></coupon-list-item></div>
		<div class="couponList-nulls" v-else><img :src="nullImg" /></div>
		<lastPageLine :lastPageLine="lastPageLine" />
	</div>
</template>

<script>
import http from '@/api/http.js';
import { $storage, $router } from '@/utils/prototype/vue.js';
import { coupon } from '@/api/interface.js';
import commonHeader from '@/components/communal/commonHeader';
import vueTabBar from '@/components/communal/vueTabBar';
import { formatDate, formatTimes } from '@/utils/prototype/date.js';
import lastPageLine from '@/components/communal/last-page-line';
import couponListItem from '@/components/coupon-list-item/coupon-list-item.vue';
export default {
	data() {
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
			nullImg: this.$imgDomain + '/paas/shop-master/c-static/images/wxminiImg/no_coupon.png'
		};
	},
	components: {
		commonHeader,
		lastPageLine,
		couponListItem
	},
	onLoad(options) {
		wx.setNavigationBarTitle({
			title: $storage.get('proappEnvName')
		});
		wx.setNavigationBarColor({
			frontColor: '#ffffff', // 必写项
			backgroundColor: '#' + this.$state.baseColor
		});
	},
	mounted() {
		this.baseColor = '#' + this.$state.baseColor;
	},
	onShow() {
		this.commonMounted();
	},
	onReachBottom() {
		// 到这底部在这里需要做什么事情
		this.loadMore();
	},
	methods: {
		// promotionInType  0是活动  1是券
		commonMounted() {
			http.post(coupon.queryCouponList, { page: this.page, rows: this.rows, promotionInType: 1 }).then(res => {
				if (res && res.rows) {
					this.items = res.rows;
					this.items.map(v => {
						v.promotionBegintime = formatTimes(v.promotionBegintime);
						v.promotionEndtime = formatTimes(v.promotionEndtime);
					});
				}
				if (this.items.length === 0) {
					this.lastPageLine = false;
				}
			});
		},
		getCoupon(item, index) {
			let newTime = new Date().getTime();
			if (this.items[index].couponOnceNums * 1 <= 0) {
				this.items[index].couponOnceNums = 0;
				this.$message.alert('该优惠券已经领取完');
				return;
			}
			if (item.receiveStart && item.receiveEnd) {
				if (newTime < item.receiveStart) {
					this.$message.alert('领取时间未到，请耐心等待');
					return;
				}
				if (newTime > item.receiveEnd) {
					this.$message.alert('领取时间已过，不可领取');
					return;
				}
			} else {
				if (newTime > item.promotionEndtime) {
					this.$message.alert('优惠券已过期，不可领取');
					return;
				}
			}
			this.$message.loading();
			http.get(coupon.saveUsercoupon, {
				couponAmount: 1, //数量默认一张
				promotionCode: item.promotionCode
			}).then(res => {
				if (res.success) {
					this.$message.alert('领取成功');
					this.items[index].couponOnceNums -= 1;
				} else {
					this.$message.alert(res.msg);
				}
			});
		},
		loadMore() {
			let num = Math.ceil(this.total / 10);
			this.page++;
			if (this.page <= num) {
				http.post(coupon.queryCouponList, { page: this.page, rows: this.rows, promotionInType: 1 }).then(res => {
					let list = res.rows;
					list.map(v => {
						v.promotionBegintime = formatTimes(v.promotionBegintime);
						v.promotionEndtime = formatTimes(v.promotionEndtime);
					});

					this.items = [...this.items, ...list];
				});
			} else {
				this.lastPageLine = true;
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../../../common/css/common.less';
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
		margin-top: 116rpx;
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
