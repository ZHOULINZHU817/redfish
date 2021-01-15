<template>
	<div class="bindPhone">
		<commonHeader :title="title" :leftIcon="leftIcon" :rightIcon="rightIcon" />
		<div class="bindPhone-con">
			<div class="bindPhone-con-box">
				<i class="iconfont">&#xe696;</i>
				<div><input placeholder="请输入手机号" v-model="phone" /></div>
			</div>
			<div class="bindPhone-con-box">
				<i class="iconfont">&#xe695;</i>
				<div>
					<input placeholder="请输入验证码" v-model="phoneWorld" type="number" />
					<view v-bind:style="{ color: baseColor }" v-if="code == '获取验证码'" @click="havePwd">{{ code }}</view>
					<view v-bind:style="{ color: baseColor }" v-else>{{ code }}</view>
				</div>
			</div>
		</div>
		<div :style="{ background: baseColor }" class="bindPhone-btn" @click="bindPhoneBtn">确定</div>
	</div>
</template>

<script>
	import http from '@/api/http.js';
	import {
		$storage,
		$router,
		$message
	} from '@/utils/prototype/vue.js';
	import {
		changePhone,
		getTopPerMenuListFPc
	} from '@/api/interface.js';
	import commonHeader from '@/components/communal/commonHeader';
	export default {
		data() {
			return {
				title: '绑定手机号',
				leftIcon: false,
				rightIcon: false,
				baseColor: '',
				phone: '',
				phoneWorld: '',
				pass: true,
				code: '获取验证码',
				redirectUrl: '',

			};
		},
		components: {
			commonHeader
		},
		onLoad(options) {
			if (options.redirectUrl) this.redirectUrl = options.redirectUrl;
			wx.setNavigationBarTitle({
				title: $storage.get('proappEnvName')
			});
			wx.setNavigationBarColor({
				frontColor: '#ffffff', // 必写项
				backgroundColor: '#' + this.$state.baseColor
			});
			this.baseColor = '#' + this.$state.baseColor;
		},
		mounted() {

		},
		methods: {
			havePwd() {

				if (this.phone == '') {
					$message.alert('手机号不能为空！');
				} else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					$message.alert('手机号格式不正确');
				} else {
					http.post(changePhone.sendPhone, {
						userPhone: this.phone
					}).then(res => {
						if (res && res.success) {
							$message.alert('验证码发送成功');
							let time = 60;
							const set = setInterval(() => {
								this.code = time-- + 's重新获取';
								this.pass = false;
								if (time < 0) {
									clearInterval(set);
									this.pass = true;
									this.code = '获取验证码';
								}
							}, 1000);
						}
					});
				}
			},
			bindPhoneBtn() {
				if (this.phone == '') {
					$message.alert('手机号不能为空！');
				} else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					$message.alert('手机号格式不正确！');
				} else if (this.phoneWorld == '') {
					$message.alert('验证码不能为空！');
				} else {
					http.post(changePhone.wechatLogin, {
						userPhone: this.phone,
						code: this.phoneWorld,
						userOpenid: $storage.get('userOpenid')
					}).then(res => {
						if (res && res.success) {
							$message.alert('绑定成功！');
							$storage.set('userId', res.dataObj.userId);
							$storage.set('sessionid', res.dataObj.ticketTokenid);
							wx.getUserInfo({
								success: function(res) {
									console.log(res, 'rrrr');
									$storage.set('userInfo', res.userInfo);
								}
							});
							let miniToken = wx.getStorageSync('miniToken');
							let cookie = res.dataObj.ticketTokenid;
							let miniCookie = miniToken + '=' + cookie + '; Domain=' + this.$domain.substring(8) + '; Path=/';
							$storage.set('miniUserName', miniCookie);
							// $router.replace('web',{defaultUrl:this.$domain+'/paas/shop/'+this.$state.homeUrl})
							http.get(getTopPerMenuListFPc).then(res => {
								if (res) {
									$storage.set('getTopPerMenuList', res.menuList);
									$storage.set('footerMenu', res.menuList.filter(v => v.menuShow === 0));

									if (this.redirectUrl) {
										$router.replace('web', {
											defaultUrl: this.redirectUrl
										});
									} else {
										$router.back();
									}

								}
							});
							// $router.replace("index_modules");
						} else if (!res.success) {
							$message.alert(res.msg);
						}
					});
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	@import '../../../common/css/common.less';

	.bindPhone {
		width: 100%;
		height: 100%;
		background: @white-color;

		&-con {
			padding: 290rpx 80rpx 209rpx;

			&-box {
				display: flex;
				align-items: center;
				justify-content: space-between;

				&:last-child {
					margin-top: 46rpx;
				}

				i {
					margin-right: 12rpx;
					color: #cfcfcf;
				}

				div {
					border-bottom: 1rpx solid #e5e5e5;
					height: 72rpx;
					flex: 1;
					position: relative;
					display: flex;
					align-items: center;

					input {
						font-size: @big-title;
						width: 380rpx;
					}

					input::-webkit-input-placeholder {
						color: #ccc;
					}

					input::-moz-placeholder {
						/* Mozilla Firefox 19+ */
						color: #ccc;
					}

					input:-moz-placeholder {
						/* Mozilla Firefox 4 to 18 */
						color: #ccc;
					}

					input:-ms-input-placeholder {
						/* Internet Explorer 10-11 */
						color: #ccc;
					}

					view {
						font-size: @big-title;
						color: #b79f77;
					}
				}
			}
		}

		&-btn {
			width: 590rpx;
			height: 84rpx;
			margin: 0 auto;
			background: #b79f77;
			color: #fff;
			line-height: 84rpx;
			font-size: @top-title;
			text-align: center;
			border-radius: 45rpx;
		}
	}
</style>
