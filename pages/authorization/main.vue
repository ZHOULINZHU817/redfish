<template>
	<div class="auth-box">
		<div class="img-container"><img :src="imgUrl" alt /></div>
		<div class="auth-prompt">
			<p>申请获得以下权限</p>
			<p>获取您的公开信息(昵称，头像等)</p>
		</div>
		<div class="auth-btn">
			<!-- #ifdef MP-WEIXIN -->
			<button :style="{ backgroundColor: '#' + baseColor }" @getuserinfo="bindGetUserInfo" open-type="getUserInfo">授权微信用户信息</button>
			<!-- #endif -->
			<!-- #ifdef MP-TOUTIAO -->
			<button :style="{ backgroundColor: '#' + baseColor }" @click="userAuth">授权获取用户信息</button>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY -->
			<button open-type="getAuthorize" @getAuthorize="onGetAuthorize" @error="onAuthError" scope="userInfo" v-bind:style="{ backgroundColor: '#' + baseColor }">
				授权获取用户信息
			</button>
			<!-- #endif -->
			<button @click="cancel" type="default">取消</button>
		</div>
	</div>
</template>

<script>
import { $storage, $router, $message } from '@/utils/prototype/vue.js';
import http from '@/api/http.js';
import { getTopPerMenuList, loginMiniProgram, getTopPerMenuListFPc, aliLogin, warrantyLogin } from '@/api/interface.js';

export default {
	data() {
		return {
			imgUrl: this.$domain + '/paas/shop-master/c-static/images/wx/au.png',
			baseColor: $storage.get('baseColor'),
			redirectUrl: '',
			isInviteRegister: false,
			inviteCode: '',
			replaceRouter: 'my/bindPhone',
			// 静态页跳转小程序传递的参数
			htmlJson: '',
			// 商品详情静态页跳转登录需要回跳的路由
			skuCode: '',
			htmlPath: '',
			goodsDetailsUrl: ''
		};
	},
	onLoad(options) {
		this.redirectUrl = options.redirectUrl;
		this.isInviteRegister = options.isInviteRegister;
		this.inviteCode = options.code;
		this.htmlJson = options.json;
		if (this.htmlJson) {
			let json = JSON.parse(this.htmlJson);
			if (json.skuCode) this.skuCode = json.skuCode;
			if (json.path) this.htmlPath = json.path;
		}
		if (this.skuCode && this.htmlPath == 'goodsDetails') {
			this.goodsDetailsUrl = this.$businessDomain + '/paas/shop/' + $storage.get('hrefs') + this.skuCode + '.html';
		}
	},
	mounted() {},
	methods: {
		setReplaceRouterParams() {
			let _obj = {
				'my/bindPhone': {
					redirectUrl: this.redirectUrl
				},
				'user_modules/invitation': {
					code: this.inviteCode
				}
			};

			return _obj[this.replaceRouter];
		},
		/**
		 * 获取服务提供商
		 * @param {Object} callback
		 */
		getProvider(callback) {
			uni.getProvider({
				service: 'oauth',
				success(res) {
					callback(res.provider[0]);
				}
			});
		},

		checkSetting() {
			return uni.getSetting();
		},

		// 服务端登录接口，前端将code传过去
		loginRequest(code, userInfo) {
			http.get(warrantyLogin, {
				js_code: code
			}).then(res => {
				console.log(res);
				$storage.set('userInfo', userInfo);
				$storage.set('userOpenid', res.dataObj.userOpenid);
				if (res.dataObj.register == 'true') {
					if (this.inviteCode && this.isInviteRegister) {
						$router.back();
					} else {
						$router.replace('my/bindPhone', {
							redirectUrl: this.redirectUrl || this.goodsDetailsUrl
						});
					}
				} else {
					let loginInfor = JSON.parse(res.dataObj.userInfo);
					$storage.set('loginInfor', loginInfor);
					$storage.set('userId', loginInfor.userId);
					$storage.set('sessionid', loginInfor.ticketTokenid);
					let miniToken = $storage.get('miniToken');
					let cookie = loginInfor.ticketTokenid;
					let miniCookie = miniToken + '=' + cookie + '; Domain=' + this.$domain.substring(8) + '; Path=/';
					$storage.set('miniUserName', miniCookie);

					this.setLoginAfterRouter();
				}
			});
		},

		setLoginAfterRouter() {
			http.get(getTopPerMenuListFPc).then(res => {
				if (res) {
					$storage.set('getTopPerMenuList', res.menuList);
					$storage.set('footerMenu', res.menuList.filter(v => v.menuShow === 0));
					$message.hide();
					if (this.isInviteRegister && this.inviteCode) {
						// console.log(11)
						$router.reOpen(
							'mainindex',
							{},
							{
								stay: 500
							}
						);
					} else if (this.goodsDetailsUrl) {
						$router.replace('web', {
							defaultUrl: this.goodsDetailsUrl
						});
					} else {
						$router.back();
					}
				}
			});
		},

		// 微信小程序授权登录逻辑
		bindGetUserInfo: function(e) {
			$message.loading();
			let that = this;
			if (e.target.userInfo) {
				let userInfo = e.target.userInfo;
				wx.login({
					success(lo) {
						if (lo.code) {
							$storage.set('code', lo.code);

							that.loginRequest(lo.code, userInfo);
						} else {
							$message.alert('登录失败');
							console.log('登录失败！' + res.errMsg);
						}
					}
				});
			} else {
				console.log('用户按了取消授权');
			}
		},

		onGetAuthorize() {
			$message.loading();
			my.getOpenUserInfo({
				fail: res => {},
				success: res => {
					let userInfo = JSON.parse(res.response).response; // 以下方的报文格式解析两层 response
					console.log(userInfo);
					my.getAuthCode({
						scopes: 'auth_user',
						success: res => {
							if (res.authCode) {
								this.loginRequest(res.authCode, userInfo);
							}
						}
					});
				}
			});
		},

		onAuthError() {
			$message.alert('用户拒绝授权');
		},

		userAuth() {
			$message.loading();
			this.getProvider(provider => {
				let _this = this;
				console.log(provider);
				uni.login({
					provider: provider,
					scopes: 'auth_user',
					success(res) {
						console.log(res);
						let code = res.code;
						uni.getUserInfo({
							provider: provider,
							lang: 'zh_CN',
							success(res) {
								_this.loginRequest(code, res.userInfo);
								console.log(res);
							}
						});
					}
				});
			});
		},

		cancel() {
			// 从首页静态页到商品详情静态页，授权登录，此时页面栈里只剩授权登录页面。
			if (getCurrentPages().length > 1) {
				$router.back();
			} else {
				$router.replace('mainindex');
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../common/css/common.less';

.img-container {
	width: 100%;
	display: flex;
	justify-content: center;
}

.auth-box {
	background: #fff;
	position: fixed;
	height: 100%;
	width: 100%;

	.auth-prompt {
		text-align: center;

		p {
			&:first-child {
				font-size: 32rpx;
				color: #333;
			}

			&:last-child {
				font-size: 26rpx;
				color: #999;
				margin-top: 6rpx;
			}
		}
	}

	.auth-btn {
		margin-top: 60rpx;

		button {
			font-size: 36rpx;
			width: 90%;
			margin: 20rpx 5%;

			&::after {
				border: none;
			}

			&:last-child {
				color: #999;
			}

			&:first-child {
				color: #fff;
			}
		}
	}
}
</style>
