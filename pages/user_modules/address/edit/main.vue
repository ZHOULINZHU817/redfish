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
import { getAddress, updateAddress } from '@/api/interface.js';
import commonHeader from '@/components/communal/commonHeader';
export default {
	data() {
		return {
			title: '编辑收货地址',
			leftIcon: true,
			rightIcon: false,
			items: [],
			region: [],
			code: [],
			addressMember: '', //用户名
			addressPhone: '', //手机号
			provinceCode: '', //省code
			provinceName: '', //省名称
			cityCode: '', //市code
			cityName: '', //市名称
			areaCode: '', //区code
			areaName: '', //区名称
			addressDefault: 0,
			defaultIcon: false,
			addressDetail: '',
			addressId: 0,
			addressCode: '',
			baseColor: '',
			alipayRegionShow: false
		};
	},
	components: {
		commonHeader
	},
	onLoad: function(options) {
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
		//console.log(prevpage.route)
	},
	mounted() {
		this.baseColor = '#' + this.$state.baseColor;
		let params = {
			addressId: this.$state.addressId
		};
		http.get(getAddress, params).then(res => {
			this.addressMember = res.addressMember;
			this.addressPhone = res.addressPhone;
			this.addressDefault = res.addressDefault;
			this.addressId = this.$state.addressId;
			this.addressDetail = res.addressDetail;
			this.code = [res.provinceCode, res.cityCode, res.areaCode];
			this.region = [res.provinceName, res.cityName, res.areaName];
			this.defaultIcon = this.addressDefault == '1' ? true : false;
			this.provinceCode = res.provinceCode;
			this.provinceName = res.provinceName;
			this.cityCode = res.cityCode;
			this.cityName = res.cityName;
			this.areaCode = res.areaCode;
			this.areaName = res.areaName;
			this.addressCode = res.addressCode;
		});
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
				addressId: this.addressId,
				addressCode: this.addressCode,
				dataState: 0
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
				http.get(updateAddress, params).then(res => {
					if (res && res.success) {
						$router.back();
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
	width: 100%;
	height: 100%;
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
				width: 520rpx;
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
					height: 200rpx;
					padding: 30rpx 0;
					font-size: @big-title;
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
			i {
				float: right;
				color: #8d8d8d;
			}
			dd {
				float: left;
				font-size: @top-title;
			}
		}
	}
}
</style>
