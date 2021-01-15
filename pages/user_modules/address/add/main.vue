<template>
	<div class="address">
		<commonHeader :title="title" :leftIcon="leftIcon" :rightIcon="rightIcon" />
		<div class="address-save" @click="saveAddress">保存</div>
		<div class="address-dlBox">
			<dl>
				<dt>收货人</dt>
				<dd><input type="text" placeholder="请输入收货人姓名" v-model="addressMember" /></dd>
			</dl>
			<dl>
				<dt>手机号</dt>
				<dd><input type="text" placeholder="请输入手机号码" v-model="addressPhone" /></dd>
			</dl>
			<!-- #ifdef MP-WEIXIN -->
			<dl>
				<dt>选择省、市、区</dt>
				<a></a>
				<picker @change="changeRegin" mode="region" :value="region">
					<view class="tui-picker-detail">{{ region[0] }} - {{ region[1] }} - {{ region[2] }}</view>
				</picker>
			</dl>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY || MP-TOUTIAO -->
			<dl @click="selectRegion">
				<dt>选择省、市、区</dt>
				<a></a>
				<view>{{ region[0] }} - {{ region[1] }} - {{ region[2] }}</view>
			</dl>
			<!-- #endif -->
			<dl>
				<dt>详细地址</dt>
				<dd><textarea type="text" name="addressDetail" id="addressDetail" placeholder="请输入详细地址" v-model="addressDetail"></textarea></dd>
			</dl>
		</div>
		<div class="address-isdefault">
			<dl class="check_item">
				<dd>默认地址</dd>
				<div @click="isDefault">
					<i class="iconfont" v-if="defaultIcon" :style="{ color: baseColor }">&#xe671;</i>
					<i class="iconfont" v-else>&#xe672;</i>
				</div>
			</dl>
		</div>
		<!-- #ifdef MP-ALIPAY || MP-TOUTIAO -->
		<u-picker mode="region" v-model="alipayRegionShow" :area-code="['11', '1101', '110101']" @confirm="uRegionPicker"></u-picker>
		<!-- #endif -->
	</div>
</template>

<script>
import http from '@/api/http.js';
import { $storage, $router, $message } from '@/utils/prototype/vue.js';
import { addAddress } from '@/api/interface.js';
import commonHeader from '@/components/communal/commonHeader';
export default {
	data() {
		return {
			title: '新增收货地址',
			leftIcon: true,
			rightIcon: false,
			items: [],
			defaultIcon: false,
			baseColor: '',
			region: ['北京市', '北京市', '东城区'],
			code: ['110000', '110100', '110101'],
			addressMember: '', //用户名
			addressPhone: '', //手机号
			provinceCode: '11000', //省code
			provinceName: '北京市', //省名称
			cityCode: '110100', //市code
			cityName: '北京市', //市名称
			areaCode: '110101', //区code
			areaName: '东城区', //区名称
			addressDefault: 0,
			addressDetail: '',
			userCode: '00000017',
			alipayRegionShow: false
		};
	},
	components: {
		commonHeader
	},
	onLoad() {
		Object.assign(this.$data, this.$options.data()); //初始化数据
		let pages = getCurrentPages();
		let prevpage = pages[pages.length - 2];
		$storage.set('prevpage', prevpage.route);
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
	methods: {
		// #ifdef MP-ALIPAY || MP-TOUTIAO
		selectRegion() {
			this.alipayRegionShow = true;
		},
		// #endif

		/**
		 * 支付宝小程序地址选择器
		 * @param {Object} params
		 */
		uRegionPicker(params) {
			console.log(params);
			let str = 'test';
			console.log(str.joinEnd('6', '0'));
			this.provinceCode = params.province.value.joinEnd(6, '0');
			this.provinceName = params.province.label;
			this.cityCode = params.city.value.joinEnd(6, '0');
			this.cityName = params.city.label;
			this.areaCode = params.area.value;
			this.areaName = params.area.label;
			this.region = [this.provinceName, this.cityName, this.areaName];
			this.code = [this.provinceCode, this.cityCode, this.areaCode];
			console.log(this.region, this.code);
		},

		changeRegin(e) {
			// console.log('picker发送选择改变，携带值为', e.mp.detail)
			console.log(e)
			this.region = e.mp.detail.value;
			this.code = e.mp.detail.code;
			this.provinceCode = e.mp.detail.code[0];
			this.provinceName = e.mp.detail.value[0];
			this.cityCode = e.mp.detail.code[1];
			this.cityName = e.mp.detail.value[1];
			this.areaCode = e.mp.detail.code[2];
			this.areaName = e.mp.detail.value[2];
		},
		isDefault() {
			if (this.defaultIcon) {
				this.addressDefault = 0;
				this.defaultIcon = false;
			} else {
				this.addressDefault = 1;
				this.defaultIcon = true;
			}
		},
		saveAddress() {
			let params = {
				addressMember: this.addressMember,
				addressPhone: this.addressPhone,
				provinceCode: this.provinceCode,
				provinceName: this.provinceName,
				cityCode: this.cityCode,
				cityName: this.cityName,
				areaCode: this.areaCode,
				areaName: this.areaName,
				addressDefault: this.addressDefault,
				addressDetail: this.addressDetail,
				userCode: this.userCode
			};
			if (this.addressMember == '') {
				$message.alert('收货人不能为空');
			} else if (this.addressPhone == '') {
				$message.alert('手机号不能为空');
			} else if (!/^1[34578]\d{9}$/.test(this.addressPhone)) {
				$message.alert('手机号格式不正确');
			} else if (this.addressDetail == '') {
				$message.alert('详细地址不能为空');
			} else {
				http.get(addAddress, params).then(res => {
					if (res && res.success) {
						console.log($storage.get('prevpage'));
						$router.back();
						// $router.replace("user_modules/address/manage")
						// if($storage.get('prevpage')=='pages/address/addressList/main'){
						//   this.$state.columnList.map(v=>{
						//     if(v.menuAction=='addAddress'){
						//     //  $router.replace(v.menuJspath)
						//     $router.replace("user_modules/address/manage")
						//     }
						//   })
						//   //$router.replace('address/addressList');
						// }else{
						//   this.$state.columnList.map(v=>{
						//     if(v.menuAction=='selectAddress'){
						//     //  $router.replace(v.menuJspath)
						//     $router.replace("user_modules/address/manage")
						//     }
						//   })
						//   //$router.replace('address/selectAddressList');
						// }
					}
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../../../common/css/common.less';
.address {
	position: relative;
	padding-top: 90rpx;
	&-save {
		position: fixed;
		z-index: 99999;
		height: 90rpx;
		width: 70rpx;
		line-height: 90rpx;
		text-align: right;
		right: 30rpx;
		top: 0;
		font-size: @big-title;
	}
	&-dlBox {
		padding: 15rpx 30rpx 0;
		background: @white-color;
		dl {
			overflow: hidden;
			border-bottom: 1rpx solid #f6f6f8;
			display: flex;
			align-items: center;
			line-height: 88rpx;
			.tui-picker-detail {
				font-size: @big-title;
			}
			&:last-child {
				border-bottom: none;
				align-items: flex-start;
			}
			&:nth-child(3) {
				display: flex;
				justify-content: space-between;
				align-items: center;
				dt {
					width: 220rpx;
				}
			}
			dt {
				float: left;
				font-size: @big-title;
				width: 160rpx;
			}
			dd {
				float: left;
				font-size: @big-title;
				width: calc(100% - 160rpx);
				input {
					border: 0;
					color: @color-333;
					&::-webkit-input-placeholder {
						color: #999;
					}
					　　&:-moz-placeholder {
						color: #999;
					}
					&::-moz-placeholder {
						color: #999;
					}
					&:-ms-input-placeholder {
						color: #999;
					}
				}
				textarea {
					border: 0;
					height: 150rpx;
					margin: 30rpx 0;
					font-size: @big-title;
					width: 100%;
				}
			}
		}
	}
	&-isdefault {
		margin-top: 30rpx;
		padding: 0 30rpx;
		background: #fff;
		line-height: 88rpx;
		dl {
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
			div {
				float: right;
				i {
					color: #8d8d8d;
				}
			}
			dd {
				float: left;
				font-size: @top-title;
			}
		}
	}
}
</style>
