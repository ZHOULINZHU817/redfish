<template>
	<div class="paySelect">
		<commonHeader :title="title" :leftIcon="leftIcon" :rightIcon="rightIcon" />
		<div class="paySelect-tit">
			<h2 :style="{ color: baseColor }">
				<i class="iconfont">&#xe69f;</i>
				订单提交成功
			</h2>
			<p>订单号：{{ payMessage.contractBillcode }}&nbsp;&nbsp;|&nbsp;&nbsp;总金额：{{ unitPrice.obpay }}{{ payMessage.dataBmoney }}{{ unitPrice.mapay }}</p>
		</div>
		<div class="paySelect-payRadio">
			<ul>
				<li v-for="(list, index) in payChannelList" :key="index">
					<div class="pay-method">
						<div>
							<i class="iconfont" :style="{ color: baseColor }">&#xe76d;</i>
							{{ list.fchannelName }}
						</div>
						<div @click="selectRadio(list, index)">
							<i class="iconfont" :style="{ color: baseColor }" v-if="current === index">&#xe671;</i>
							<i class="iconfont" :style="{ color: baseColor }" v-else>&#xe672;</i>
						</div>
					</div>
					<div class="base-account-info" v-if="list.fchannelCode == '01'">
						<div class="account-balance">账户余额：{{ list.faccountAmount }}{{ unitPrice.mapay }}</div>
						<div class="need-pay-money">本单抵扣：{{ payMessage.dataBmoney }}{{ unitPrice.mapay }}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="paySelect-btn" @click="paySubmit" :style="{ backgroundColor: baseColor }">立即支付</div>
		<!-- #ifdef MP-WEIXIN -->
		<u-popup class="pwd-popup" v-model="pwdShow" mode="center" border-radius="16" length="90%">
			<view class="title">请输入支付密码</view>
			<view class="content"><u-message-input mode="box" :maxlength="inputLength" :dot-fill="true" @finish="pwdInputFinish" @change="pwdInputChange"></u-message-input></view>
			<view class="btn" v-bind:style="{ backgroundColor: baseColor }" @click="pwdPay">确认支付</view>
		</u-popup>
		<!-- #endif -->
	</div>
</template>

<script>
import http from '@/api/http.js';
import { $storage, $router, $message } from '@/utils/prototype/vue.js';
import { syncContractState, addContractSub, saveOrderSubToPay, paymentCommit, saveOrderToPay, syncContractPayState } from '@/api/interface.js';
import commonHeader from '@/components/communal/commonHeader';
export default {
	data() {
		return {
			box: 'box',
			inputLength: 6,
			title: '支付方式',
			leftIcon: true,
			rightIcon: false,
			baseColor: '',
			payMessage: {}, //订单信息
			payChannelList: [], //支付方式
			contractBlance: '', // 结算方式 0 全款 1 订金 2 分次 3 分期    多个用,分割
			payJsons: [],
			ptradeSeqno: '',
			current: 0,
			userImgurl: require('../../../static/img/mine/default_header.png'),
			pwdShow: false,
			pwd: ''
		};
	},
	components: {
		commonHeader
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: $storage.get('proappEnvName')
		});
		wx.setNavigationBarColor({
			frontColor: '#ffffff', // 必写项
			backgroundColor: '#' + this.$state.baseColor
		});
	},
	computed: {
		unitPrice() {
			// mapay 主单位（后面）  mbpay 主单位（前面）  obpay 辅单位（前面）   oapay 辅单位（后面）
			return this.$state.unitPrice || $storage.get('unitPrice');
		}
	},
	mounted() {
		this.baseColor = '#' + this.$state.baseColor;
		if (this.$root.$mp.query && this.$root.$mp.query.contractBillcode) {
			this.payMessage = this.$root.$mp.query;
			this.setPayChannelList();
		} else {
			http.post(syncContractState, {
				contractBillcode: this.$state.contractBillcode
			}).then(res => {
				if (res.success && res.dataObj != null) {
					this.payMessage = res.dataObj;
					this.setPayChannelList();
				} else {
					if (res.msg) {
						this.$message.alert(res.msg);
					} else {
						this.$message.alert('下单失败');
					}
					this.$router.back(1, { stay: 1000 });
				}
			});
		}
	},
	methods: {
		// 设置支付方式，必须在syncContractState接口之后
		setPayChannelList() {
			http.post(saveOrderToPay, {
				contractBillcode: this.$state.contractBillcode
			}).then(res => {
				this.payChannelList = res.payChannelList;
				this.ptradeSeqno = res.ptradeSeqno;
				this.contractBlance = res.contractBlance;
				this.payJsons = [
					{
						faccountIdType: 'ACCOUNT',
						fchannelCode: res.payChannelList[0].fchannelCode,
						orderAmount: this.payMessage.dataBmoney,
						faccountId: res.payChannelList[0].faccountOuterNo || ''
					}
				];
			});
		},

		selectRadio(list, index) {
			this.current = index;
			this.payJsons = [
				{
					faccountIdType: 'ACCOUNT',
					fchannelCode: list.fchannelCode,
					orderAmount: this.payMessage.dataBmoney,
					faccountId: list.faccountOuterNo || ''
				}
			];
		},

		pwdInputFinish(val) {
			this.pwd = val;
		},

		pwdInputChange(val) {
			this.pwd = val;
		},

		pwdPay() {
			if (!this.pwd) {
				$message.alert('请输入支付密码');
				return;
			}
			if (this.pwd.length < 6) {
				$message.alert('请输入完整支付密码');
				return;
			}
			let payparams = JSON.stringify(this.payJsons);
			$message.loading();
			http.post(paymentCommit, {
				ptradeSeqno: this.ptradeSeqno,
				payCommitStr: payparams,
				contractBlance: this.contractBlance,
				paywd: this.pwd
			}).then(res => {
				if (res && res.success) {
					// let data = res.dataObj.requestData;
					// let that = this;
					$message.loading();
					http.post(syncContractPayState, {
						contractBillcode: this.$state.contractBillcode
					})
						.then(res => {
							if (res.success) {
								$router.replace('pay/paySuccess', {
									contractBillcode: this.$state.contractBillcode
								});
							} else {
								$message.alert('支付失败！');
							}
						})
						.catch(err => {
							$message.alert('支付失败！');
						});
				} else {
					$message.alert(res.msg);
				}
			});
		},

		paySubmit() {
			if (this.payJsons.length === 0) {
				$message.alert('请选择支付方式');
				return;
			}

			if (this.payChannelList[this.current].fchannelCode == '01') {
				if (this.payChannelList[this.current].faccountAmount == 0) {
					$message.alert('您的账户余额为零');
					return;
				}
				if (this.payChannelList[this.current].faccountAmount < this.payMessage.dataBmoney) {
					$message.alert('您的账户余额不足');
					return;
				}
				// #ifdef MP-WEIXIN
				this.pwdShow = true;
				// #endif

				// #ifdef MP-ALIPAY || MP-TOUTIAO

				$router.push('pay/payPassword', {
					ptradeSeqno: this.ptradeSeqno,
					payCommitStr: JSON.stringify(this.payJsons),
					contractBlance: this.contractBlance
				});
				// #endif
			}

			// 微信支付
			if (this.payChannelList[this.current].fchannelCode == 'wechatmini') {
				let payparams = JSON.stringify(this.payJsons);
				http.post(paymentCommit, {
					ptradeSeqno: this.ptradeSeqno,
					payCommitStr: payparams,
					contractBlance: this.contractBlance
				}).then(res => {
					if (res && res.success) {
						let data = res.dataObj.requestData;
						let that = this;
						wx.requestPayment({
							timeStamp: data.timeStamp,
							nonceStr: data.nonceStr,
							package: data.package,
							signType: data.signType,
							paySign: data.paySign,
							success: function(res) {
								http.post(syncContractPayState, {
									contractBillcode: that.$state.contractBillcode
								})
									.then(res => {
										if (res.success) {
											$router.replace('pay/paySuccess', {
												contractBillcode: that.$state.contractBillcode
											});
										} else {
											$router.replace('pay/payFail', {
												contractBillcode: that.$state.contractBillcode
											});
										}
									})
									.catch(err => {
										$message.alert('支付失败！');
									});
							},
							fail: function(res) {
								console.log(res, '失败参数');
								$message.alert('支付失败！');
								//$router.replace('pay/payFail')
							},
							complete: function(res) {}
						});
					}
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../../common/css/common.less';

/* #ifdef MP-WEIXIN */
.pwd-popup {
	height: 300rpx;
	background-color: @white-color;
	display: flex;
	flex-direction: column;

	.title {
		width: 100%;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid #cccccc;
	}

	.content {
		flex: 1;
		width: 100%;
		padding: 30rpx 0;
	}

	.btn {
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		color: @white-color;
		font-size: 28rpx;
		width: 100%;
	}
}
/* #endif */

/* #ifdef MP-ALIPAY || MP-TOUTIAO */
.pwd-popup {
}
/* #endif */

.paySelect {
	width: 100%;
	height: 100%;
	background: @white-color;
	margin-top: 90rpx;

	&-tit {
		padding: 49rpx 32rpx 45rpx;
		border-bottom: 20rpx solid #fafafa;

		h2 {
			display: flex;
			align-items: center;
			font-size: 36rpx;
			margin-bottom: 26rpx;

			i {
				font-size: 46rpx;
				margin-right: @margin-right;
			}
		}

		p {
			font-size: @middle-title;
			color: #7a7a7a;
		}
	}

	&-payRadio {
		ul {
			li {
				.pay-method {
					height: 112rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					padding: 0 32rpx;

					div:first-child {
						display: flex;
						align-items: center;

						i {
							margin-right: 16rpx;
							font-size: 40rpx;
						}
					}
				}

				.base-account-info {
					height: 112rpx;
					padding: 0 32rpx;
					padding-left: 80rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				border-bottom: 1rpx solid #f5f5f5;
			}
		}
	}

	&-btn {
		width: 556rpx;
		height: 78rpx;
		margin: 0 auto;
		background: #FFFFFF;
		text-align: center;
		line-height: 78rpx;
		font-size: @top-title;
		color: @white-color;
		position: fixed;
		bottom: 48rpx;
		left: 97rpx;
		z-index: 99;
		border-radius: 4rpx;
	}
}
</style>
