<template>
	<div class="accounts" ref="accounts">
		<commonHeader :title="title" :leftIcon="leftIcon" :rightIcon="rightIcon" />
		<div class="accounts-back">
			<div @click="goBack"><i class="iconfont">&#xe62d;</i></div>
		</div>
		<div class="accounts-haveAddress" v-if="isHaveAddress">
			<div class="accounts-haveAddress-l">
				<h5>
					收货人：{{ addressList.addressMember }}
					<span>{{ addressList.addressPhone }}</span>
				</h5>
				<p>
					<span v-if="addressList.addressDefault == 1" :style="{ background: baseColor }">默认</span>
					{{ addressList.provinceName }} {{ addressList.cityName }} {{ addressList.areaName }} {{ addressList.addressDetail }}
				</p>
			</div>
			<div class="accounts-haveAddress-r" @click="addClass"><i class="iconfont">&#xe61d;</i></div>
		</div>
		<div class="accounts-noAddress" @click="addClass" v-else>
			<i class="iconfont">&#xe752;</i>
			添加收货地址
		</div>

		<div class="accounts-info" v-for="(shoppingItem, index) in shoppingItems" :key="index" v-if="shoppingItems && shoppingItems.length > 0">
			<div class="accounts-info-tit">{{ shoppingItem.memberName }}</div>
			<div v-for="(list, listIndex) in shoppingItem.shoppingpackageList" :key="listIndex">
				<div class="accounts-info-con" v-for="(goods, goodsIndex) in list.shoppingGoodsList" :key="goodsIndex">
					<img :src="goods.dataPic" />
					<div>
						<h2>{{ goods.goodsName }}</h2>
						<h3>{{ goods.skuName }}</h3>
						<h4>
							{{ unitPrice.obpay }}{{ goods.pricesetNprice }}{{ unitPrice.mapay }}
							<span>×{{ goods.goodsCamount }}</span>
						</h4>
					</div>
				</div>
				<div class="accounts-info-con" v-for="(gift, giftIndex) in list.giftList" :key="giftIndex">
					<img :src="gift.dataPic" />
					<div>
						<h2>
							<span :style="{ color: baseColor, borderColor: baseColor }">赠品</span>
							{{ gift.goodsName }}
						</h2>
						<h3>{{ gift.skuName }}</h3>
						<h4>
							{{ unitPrice.obpay }}0{{ unitPrice.mapay }}
							<span>×1</span>
						</h4>
					</div>
				</div>
				<div class="accounts-con">
					<div>
						配送方式
						<div>
							<span>普通快递</span>
							<i class="iconfont">&#xe61d;</i>
						</div>
					</div>
				</div>
				<div class="accounts-textarea">
					<span>备注信息：</span>
					<input placeholder="请填写" v-model="list.packageRemark" />
				</div>
				<div class="accounts-info-money">
					共{{ list.goodsNum }}件，小计：
					<span :style="{ color: baseColor }" v-if="list.goodsMoney">{{ unitPrice.obpay }}{{ list.goodsMoney }}{{ unitPrice.mapay }}</span>
					<!-- <span :style="{color:baseColor}" v-if="shoppingItem.pmInfo.totalAmount> 0 && shoppingItem.pmInfo.totalPefAmount> 0">+</span>
          <span :style="{color:baseColor}" v-if="shoppingItem.pmInfo.totalPefAmount> 0">{{unitPrice.obpay}}{{shoppingItem.pmInfo.totalPefAmount.toFixed(2)}}{{unitPrice.oapay}}</span>-->
				</div>
			</div>
		</div>

		<div class="accounts-con">
			<div>
				支付方式
				<div>
					<span>在线支付</span>
					<i class="iconfont">&#xe61d;</i>
				</div>
			</div>
		</div>
		<div class="accounts-con">
			<div>
				优惠券
				<div @click="isShowPreferential">
					<span>{{ selectPromotionName }}</span>
					<i class="iconfont">&#xe61d;</i>
				</div>
			</div>
		</div>
		<!-- <div class="accounts-textarea">
        <span>备注信息：</span><input placeholder="请填写"/>
    </div>-->
		<div class="accounts-count">
			<p>
				商品金额
				<span>{{ unitPrice.obpay }}{{ shoppingCountPrice }}{{ unitPrice.mapay }}</span>
			</p>
			<!-- <p>满减优惠<span>-￥1815.30</span></p> -->
			<p>
				运费
				<span>{{ unitPrice.obpay }}{{ freight }}{{ unitPrice.mapay }}</span>
			</p>
			<!-- <p>优惠券<span>{{unitPrice.mbpay}}{{discount}}{{unitPrice.mapay}}</span></p> -->
			<p>
				优惠
				<span>{{ unitPrice.obpay }}{{ comDisMoney }}{{ unitPrice.mapay }}</span>
			</p>
			<p>
				会员权益
				<span>{{ unitPrice.obpay }}{{ totalDiscountPrice }}{{ unitPrice.mapay }}</span>
			</p>
		</div>
		<div class="accounts-sum">
			<p>
				应付金额:
				<i>{{ unitPrice.obpay }}{{ accountsSumPrice }}{{ unitPrice.mapay }}</i>
			</p>
			<div @click="savePayPrice" :style="{ background: baseColor }">立即支付</div>
		</div>
		<div class="accounts-preferential" v-show="isShow">
			<div class="accounts-preferential-con">
				<div
					@click="
						() => {
							isShow = false;
						}
					"
				>
					优惠劵
					<i class="iconfont">&#xe609;</i>
				</div>
				<ul>
					<li v-for="(coupon, couponIndex) in couponList" :key="couponIndex" v-if="coupon.dataState == 0">
						<div class="pre-left">
							<h1>
								<i :style="{ color: baseColor }">{{ coupon.pbName }}</i>
							</h1>
							<h2 v-if="coupon.dataState == 0">{{ coupon.discName }}</h2>
							<h2 v-else></h2>
						</div>
						<div class="pre-center">
							<h3>{{ coupon.promotionName }}</h3>
							<h4>{{ coupon.couponStart }}至{{ coupon.couponEnd }}</h4>
						</div>
						<div class="pre-right" @click="checkCoupon(coupon, couponIndex)">
							<i class="iconfont" :style="{ color: couponIndex === currentIndex ? baseColor : '#e0e0e0' }">&#xe671;</i>
						</div>
					</li>
				</ul>
				<div class="pre-btn" :style="{ background: baseColor }" @click="couponOK">确认</div>
			</div>
		</div>
	</div>
</template>

<script>
import http from '@/api/http.js';
import { $storage, $router, $message } from '@/utils/prototype/vue.js';
import {
	addressList,
	queryToContract,
	calculateFreightFare,
	getTotalDiscountPrice,
	queryShoppingToContract,
	saveContract,
	syncContractState,
	addContractSub,
	saveOrderSubToPay,
	paymentCommit,
	coupon
} from '@/api/interface.js';
import commonHeader from '@/components/communal/commonHeader';
import { formatTimes } from '@/utils/prototype/date.js';
export default {
	data() {
		return {
			title: '确认订单',
			leftIcon: false,
			rightIcon: false,
			isHaveAddress: false, //判断是否存在地址
			addressList: {},
			shoppingItems: [],
			totalDiscountPrice: 0.0, //权益差价
			shoppingCountPrice: 0, //商品总金额
			accountsSumPrice: 0.0, //最后应付金额

			discount: 0.0, //优惠劵
			freight: 0.0, //运费
			comDisMoney: 0.0, //优惠
			copyComDisMoney: 0.0, // 复制一份优惠值
			contractGoodsList: [], //结算时候需要将所有的商品信息传过去
			scontractBlance: '', // 结算方式 0 全款 1 订金 2 分次 3 分期    多个用,分割
			scontractPmode: '', // 付款方式 0 线上、 1 线下  2 不付款  多个用,分割
			orderDomainStr: [],
			contractBillcode: '',
			contractSubCode: '',
			ptradeSeqno: '', //支付流水号
			query: {},
			baseColor: '',
			isShow: false, //优惠劵弹窗
			couponList: [], //优惠劵列表
			currentIndex: -1,
			currentCoupon: {},
			pmContractGoodsDomainListStr: [], // 获取优惠劵列表需要传所有商品的参数
			selectPromotionName: '', // 选中的优惠劵名字
			userImgurl: require('../../../static/img/mine/default_header.png')
		};
	},
	onLoad(options) {
		Object.assign(this, this.$options.data());
		wx.setNavigationBarTitle({
			title: $storage.get('proappEnvName')
		});
		wx.setNavigationBarColor({
			frontColor: '#ffffff', // 必写项
			backgroundColor: '#' + this.$state.baseColor
		});
		let pages = getCurrentPages();
		let prevpage = pages[pages.length - 2];
		//判断是否是h5详情页跳转过来的
		if (options && options.json) {
			let attr = JSON.parse(options.json);
			$storage.set('pageRouter', '0');
			$storage.set('beforeRouter', 'h5');
			$storage.set('htmlMessage', attr);
		} else {
			if ($storage.get('beforeRouter') != 'h5') {
				$storage.set('pageRouter', prevpage.route);
			}
		}

		// console.log($storage.get("htmlMessage"));
	},
	onShow() {
		// 初始化涉及到钱的变量，防止页面从后台到前台的时候在原有基础上再次计算
		this.shoppingCountPrice = 0;
		this.totalDiscountPrice = 0.0;
		this.shoppingCountPrice = 0;
		this.accountsSumPrice = 0.0;
		this.discount = 0.0;
		this.freight = 0.0;
		this.comDisMoney = 0.0;
		this.copyComDisMoney = 0.0;
		// 初始化地址信息
		this.addressList = {};
		if ($storage.get('changeaddress') && $storage.get('changeaddress') != '') {
			this.addressList = $storage.get('changeaddress');
			this.isHaveAddress = true;
		} else {
			http.get(addressList).then(res => {
				if (res && res.length > 0 && res[0].addressDefault == '1') {
					this.isHaveAddress = true;
					this.addressList = res[0];
				} else {
					this.isHaveAddress = false;
				}
			});
		}

		//地址接口
		let shoppingGoodsIdStr = JSON.stringify(this.$state.shoppingGoodsIdStr);
		let rsSkuListStr = JSON.stringify(this.$state.rsSkuListStr);
		//商品总价+ 商品列表
		let params = $storage.get('pageRouter') == '0' ? $storage.get('htmlMessage') : { shoppingGoodsIdStr: shoppingGoodsIdStr };
		http.post($storage.get('pageRouter') == '0' ? queryToContract : queryShoppingToContract, params).then(res => {
			// 如果返回nologin，则return，避免请求并行造成的弹出多个授权框
			if (res.errorCode == 'nologin') {
				return;
			}
			if (res) {
				this.shoppingItems = res;
				this.shoppingItems.map(v => {
					v.shoppingpackageList.map(vk => {
						this.comDisMoney += vk.disMoney;
						this.copyComDisMoney += vk.disMoney;

						vk.shoppingGoodsList.map(val => {
							val.dataPic = this.$domain + val.dataPic;
							this.contractGoodsList.push(val);
							this.pmContractGoodsDomainListStr.push(val);
						});
						if (vk.giftList) {
							vk.giftList.map(val => {
								val.dataPic = this.$domain + val.dataPic;
								this.contractGoodsList.push(val);
							});
						}
					});
				});

				//运费接口
				let _htmlMessage = [];
				if ($storage.get('pageRouter') == '0') {
					_htmlMessage.push($storage.get('htmlMessage'));
				}

				let freightFare =
					$storage.get('pageRouter') == '0'
						? {
								skuIdStr: JSON.stringify(_htmlMessage),
								areaCode: this.addressList.areaCode
						  }
						: {
								areaCode: this.addressList.areaCode,
								shoppingGoodsIdStr: shoppingGoodsIdStr
						  };

				http.post(calculateFreightFare, freightFare)
					.then(res => {
						if (res && res.success) {
							this.freight = res.dataObj;
						} else {
							if ((res.errorCode = '-1')) {
								$message.alert(res.msg);
							}
						}
					})
					.then(() => {
						console.log(this.shoppingItems, '111111111111');
						this.shoppingItems.map((v, k) => {
							v.shoppingpackageList.map(vk => {
								vk.shoppingGoodsList.map((val, index) => {
									// console.log(val.pricesetNprice, "val.pricesetNprice");
									// console.log(val.goodsCamount, "goodsCamount");
									this.shoppingCountPrice += val.pricesetNprice * val.goodsCamount;
								});
							});

							this.accountsSumPrice = (this.shoppingCountPrice - this.totalDiscountPrice - this.discount - this.comDisMoney + this.freight).toFixed(2);
							this.shoppingCountPrice = this.shoppingCountPrice;
						});
					});

				//用户权益差价
				let skuList = { rsSkuListStr: rsSkuListStr };
				http.post(getTotalDiscountPrice, skuList).then(res => {
					if (res && res.success) {
						this.totalDiscountPrice = res.dataObj.totalDiscountPrice;
					}
				});
			}
		});
	},
	computed: {
		unitPrice() {
			// mapay 主单位（后面）  mbpay 主单位（前面）  obpay 辅单位（前面）   oapay 辅单位（后面）
			return this.$state.unitPrice || $storage.get('unitPrice');
		}
	},
	mounted() {
		this.discount = 0;
		this.currentIndex = -1;
		this.freight = 0;
		this.baseColor = '#' + this.$state.baseColor;
		this.shoppingCountPrice = 0;

		if (this.$root.$mp.query.addressMember) {
			this.isHaveAddress = true;
			this.addressList = this.$root.$mp.query;
		}
	},
	components: {
		commonHeader
	},
	watch: {
		accountsSumPrice(v) {
			//   console.log(v);
			return parseFloat((this.shoppingCountPrice - this.totalDiscountPrice - this.comDisMoney + this.freight).toFixed(2));
		},
		discount() {
			this.accountsSumPrice = parseFloat((this.shoppingCountPrice - this.totalDiscountPrice - this.comDisMoney + this.freight).toFixed(2));
		}
	},
	methods: {
		goBack() {
			$storage.set('htmlMessage', '');
			$storage.set('pageRouter', '');
			$router.back(1, { stay: 500 });
		},
		addClass() {
			//   console.log("添加地址");
			//   this.$state.columnList.map(v => {
			//     if (v.menuAction == "selectAddress") {
			//       $router.replace(v.menuJspath);
			//     }
			//   });
			$router.push('user_modules/address/manage', { json: 1 });
		},
		isShowPreferential() {
			http.post(coupon.couponList, {
				pmContractGoodsDomainListStr: JSON.stringify(this.pmContractGoodsDomainListStr)
			}).then(res => {
				if (res) {
					this.couponList = res.rows;
					this.couponList.map(v => {
						v.couponStart = formatTimes(v.couponStart);
						v.couponEnd = formatTimes(v.couponEnd);
					});
				}
			});
			if (this.isShow) {
				this.isShow = false;
			} else {
				this.isShow = true;
			}
		},
		checkCoupon(coupon, couponIndex) {
			this.currentIndex = couponIndex;
			this.currentCoupon = coupon;
			console.log(this.currentCoupon);
		},
		couponOK() {
			if (this.currentCoupon.discStart > this.shoppingCountPrice) {
				$message.alert('该优惠劵不满足条件，请使用其他优惠劵');
				this.currentCoupon = {};
			} else {
				this.isShow = false;
				this.selectPromotionName = this.currentCoupon.promotionName;
				if (Object.keys(this.currentCoupon).length > 0) {
					if (this.currentCoupon.pbCode === '0003' || this.currentCoupon.pbCode === '0004') {
						this.discount = this.currentCoupon.discAmount;
						this.comDisMoney = (this.copyComDisMoney + this.discount).toFixed(2);
						//this.accountsSumPrice = this.accountsSumPrice-this.currentCoupon.pmPromotion.pmPromotionDiscountList[0].discAmount
					}
					if (this.currentCoupon.pbCode === '0005') {
						this.discount = this.shoppingCountPrice * parseFloat(1 - this.currentCoupon.discAmount / 100).toFixed(2);
						console.log(this.discount, this.copyComDisMoney);
						this.comDisMoney = (this.copyComDisMoney + this.discount).toFixed(2);
						//this.accountsSumPrice = this.accountsSumPrice*(this.currentCoupon.pmPromotion.pmPromotionDiscountList[0].discAmount/100)
					}
					// if(this.currentCoupon.dataState == 0 && this.currentCoupon.pbCode === '0004'){
					//   this.discount = this.currentCoupon.condResultAmount
					//   this.comDisMoney = this.comDisMoney + this.discount
					// //this.accountsSumPrice = this.accountsSumPrice-this.currentCoupon.pmPromotion.pmPromotionConditionList[0].condResultAmount
					// }
				}
			}
		},
		savePayPrice() {
			if (JSON.stringify(this.addressList) === '{}') {
				$message.alert('请选择地址');
			} else {
				let shoppingGoodsIdStr = this.$state.shoppingGoodsIdStr;
				// console.log(shoppingGoodsIdStr);
				this.orderDomainStr = [];
				let _htmlMessage = [];
				let pares = $storage.get('contractTypepro');
				let code;
				let typepro;

				if (pares && pares == '01') {
					code = $storage.get('goodsPmbillno');
					typepro = '01';
				} else {
					code = $storage.get('promotionCode');
					typepro = '0';
				}
				let dateTimes = new Date();
				let minTimes = dateTimes.getMinutes();
				dateTimes.setMinutes(minTimes + $storage.get('payTime'));
				//商品详情直接下单
				if ($storage.get('pageRouter') == '0') {
					_htmlMessage.push($storage.get('htmlMessage'));
				}
				// console.log(this.freight, "discount");
				// console.log(this.shoppingCountPrice, "shoppingCountPrice");
				let htmlDomainStr = [
					{
						contractPaytime: new Date().getTime(),
						contractPaydate: dateTimes.getTime() ? dateTimes.getTime() : 0,
						goodsPbillno: $storage.get('goodsPbillno'), // 成团人数
						goodsPmbillno: code, // 团购 平团  描述营销单号
						contractProperty: '0', //订单性质
						contractTypepro: typepro, //订单类型属性(引合同、发货/中转)
						contractBlance: this.scontractBlance || 0, //结算方式:全款、订金、融资
						contractPmode: this.scontractPmode || 0, //付款方式：场内、场外，即线上、线下
						contractPumode: '0', //提货方式
						goodsSupplierName: '', //配送商
						goodsSupplierCode: '', //配送商Code
						packageList: [],
						packageMode: '', //配送方式
						contractType: this.shoppingItems[0].shoppingType,
						ocContractSettlList:
							Object.keys(this.currentCoupon).length > 0
								? [
										{
											contractSettlBlance: 'COP',
											contractPmode: '0',
											contractSettlGmoney: Number(this.currentCoupon.couponAmount),
											contractSettlPmoney: Number(this.discount.toFixed(2)),
											contractSettlOpno: this.currentCoupon.usercouponCode,
											contractSettlOpemo: this.currentCoupon.promotionCode
										}
								  ]
								: [],
						contractInmoney: (Number(this.shoppingCountPrice) - this.copyComDisMoney + Number(this.freight.toFixed(2))).toFixed(2), //  销售含税金额 (优惠前)
						contractMoney: (Number(this.shoppingCountPrice) - this.copyComDisMoney - Number(this.discount.toFixed(2))).toFixed(2), // 最终销售含税金额 (优惠后)
						goodsReceiptMem: this.addressList.addressMember, //收货人
						goodsReceiptPhone: this.addressList.addressPhone, //收货联系方式
						goodsReceiptArrdess: this.addressList.provinceName + this.addressList.cityName + this.addressList.areaName + this.addressList.addressDetail,
						areaCode: this.addressList.areaCode, //从地址上面带过来`
						contractNbillcode: this.shoppingItems[0].contractNbillcode,
						skuIdList: _htmlMessage,
						giftSkuIdList: []
					}
				];

				this.shoppingItems.map((v, index) => {
					this.orderDomainStr.push({
						contractPaytime: new Date().getTime(),
						contractPaydate: dateTimes.getTime() ? dateTimes.getTime() : 0,
						goodsPbillno: $storage.get('goodsPbillno'), // 成团人数
						goodsPmbillno: code, // 团购 平团  描述营销单号
						contractProperty: '0', //订单性质
						contractTypepro: typepro, //订单类型属性(引合同、发货/中转)
						contractBlance: this.scontractBlance || 0, //结算方式:全款、订金、融资
						contractPmode: this.scontractPmode || 0, //付款方式：场内、场外，即线上、线下
						contractPumode: '0', //提货方式
						goodsSupplierName: '', //配送商
						goodsSupplierCode: '', //配送商Code
						packageMode: '', //配送方式
						contractType: v.shoppingType,
						packageList: [],
						//contractType: this.$state.shoppingType[index].shoppingType,
						ocContractSettlList:
							Object.keys(this.currentCoupon).length > 0
								? [
										{
											contractSettlBlance: 'COP',
											contractPmode: '0',
											contractSettlGmoney: Number(this.currentCoupon.couponAmount),
											contractSettlPmoney: Number(this.discount.toFixed(2)),
											contractSettlOpno: this.currentCoupon.usercouponCode,
											contractSettlOpemo: this.currentCoupon.promotionCode
										}
								  ]
								: [],
						// shoppingGoodsIdList:this.$state.shoppingGoodsIdStr,
						contractInmoney: (Number(this.shoppingCountPrice) - this.copyComDisMoney + Number(this.freight.toFixed(2))).toFixed(2), //  销售含税金额 (优惠前)
						contractMoney: (Number(this.shoppingCountPrice) - this.copyComDisMoney - Number(this.discount.toFixed(2))).toFixed(2), // 最终销售含税金额 (优惠后)
						goodsReceiptMem: this.addressList.addressMember, //收货人
						goodsReceiptArrdess: this.addressList.provinceName + this.addressList.cityName + this.addressList.areaName + this.addressList.addressDetail, //收货地址
						goodsReceiptPhone: this.addressList.addressPhone, //收货联系方式
						areaCode: this.addressList.areaCode //从地址上面带过来`
					});
					//   console.log(v.shoppingpackageList);
					v.shoppingpackageList.map(val => {
						let list = [];
						if (val.giftList) {
							list = [...val.giftList, ...val.shoppingGoodsList];
						} else {
							list = val.shoppingGoodsList;
						}
						let shoppingGoodsIdList = [];
						val.shoppingGoodsList.map(vk => {
							shoppingGoodsIdList.push(vk.shoppingGoodsId);
						});
						if (val.disMoney && val.disMoney > 0) {
							if (val.pmCalcBeanList && val.pmCalcBeanList.length > 0) {
								val.pmCalcBeanList.map(els => {
									this.orderDomainStr[index].ocContractSettlList.push({
										contractSettlBlance: els.promotionInType == 0 ? 'PM' : 'COP',
										contractPmode: '0',
										contractSettlGmoney: Number(els.disMoney.toFixed(2)),
										contractSettlPmoney: Number(els.disMoney.toFixed(2)),
										contractSettlOpno: els.promotionCode,
										contractSettlOpemo: els.promotionName
									});
								});
							}
							htmlDomainStr[0].ocContractSettlList = this.orderDomainStr.ocContractSettlList;
						}
						this.orderDomainStr[index].packageList.push({
							contractGoodsList: list,
							shoppingGoodsIdList: shoppingGoodsIdList,
							promotionCode: val.promotionCode,
							packageRemark: val.packageRemark
						});
						htmlDomainStr[0].packageList.push({
							contractGoodsList: list,
							shoppingGoodsIdList: [],
							promotionCode: val.promotionCode,
							packageRemark: val.packageRemark
						});
					});
				});

				let orderDomainStr = $storage.get('pageRouter') == '0' ? JSON.stringify(htmlDomainStr) : JSON.stringify(this.orderDomainStr);
				let params = { orderDomainStr: orderDomainStr };

				http.post(saveContract, params).then(res => {
					if (res.errorCode == 'nologin') {
						return;
					}
					this.contractBillcode = res.dataObj.contractBillcode;
					this.$state.set('contractBillcode', this.contractBillcode);
					$storage.set('htmlMessage', '');
					$storage.set('pageRouter', '');
					$router.push('pay/paySelect');
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../../common/css/common.less';
.accounts {
	&-back {
		div {
			width: 70rpx;
			height: 90rpx;
			position: fixed;
			z-index: 99999;
			left: 30rpx;
			top: 0;
			display: inline-block;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}
	&-noAddress {
		height: 178rpx;
		margin-top: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 20rpx solid #fafafa;
		background: @white-color;
		i {
			margin-right: @margin-right;
			font-size: 50rpx;
		}
	}
	&-haveAddress {
		height: 180rpx;
		margin-top: 90rpx;
		background: @white-color;
		padding: @padding-30;
		border-bottom: 20rpx solid #fafafa;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-l {
			font-size: @top-title;
			width: 618rpx;
			h5 {
				margin-bottom: 12rpx;
				span {
					margin-left: 112rpx;
				}
			}
			p {
				overflow: hidden;
				-webkit-line-clamp: 3;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				width: 618rpx;
				color: @color-666;
				font-size: @middle-title;
				span {
					display: inline-block;
					font-size: 18rpx;
					padding: 3rpx 15rpx;
					border-radius: 15rpx;
					background: #b79f77;
					margin-right: 12rpx;
					color: @white-color;
				}
			}
		}
		&-r {
		}
	}
	&-info {
		padding: 10rpx 30rpx 0rpx 30rpx;
		border-bottom: 20rpx solid #fafafa;
		background: @white-color;
		border-bottom: 20rpx solid #fafafa;
		&-tit {
			height: 68rpx;
			line-height: 68rpx;
			border-bottom: 1rpx solid #f6f6f8;
			margin-bottom: 30rpx;
		}
		&-con {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			&:last-child {
				margin-bottom: 0;
			}
			img {
				width: 160rpx;
				height: 160rpx;
				margin-right: 30rpx;
			}
			div {
				width: 500rpx;
				h2 {
					width: 500rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 28rpx;
					span {
						border: 1rpx solid #b79f77;
						border-radius: 6rpx;
						padding: 0 5rpx;
						margin-right: 5rpx;
						font-size: @middle-title;
						color: #b79f77;
					}
				}
				h3 {
					color: @color-999;
					font-size: @middle-title;
					margin: 10rpx 0;
				}
				h4 {
					color: #d66377;
					display: flex;
					align-items: center;
					justify-content: space-between;
					span {
						font-size: @middle-title;
						color: @color-666;
					}
				}
			}
		}
		.accounts-con,
		.accounts-textarea {
			height: 108rpx;
			padding: 0;
			border-bottom: 1rpx solid #fafafa;
		}
		&-money {
			padding: 0;
			height: 102rpx;
			line-height: 102rpx;
			text-align: right;
			font-size: @middle-title;
		}
	}
	&-con {
		padding: @padding-30;
		background: @white-color;
		border-bottom: 20rpx solid #fafafa;
		div {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			height: 110rpx;
			border-bottom: 1rpx solid #f6f6f8;
			div {
				display: flex;
				align-items: center;
				i {
					font-size: 28rpx;
					color: #999;
				}
				span {
					color: @color-999;
					margin-right: 10rpx;
				}
			}
			&:last-child {
				border-bottom: 0;
			}
		}
	}
	&-textarea {
		display: flex;
		align-items: center;
		height: 88rpx;
		border-bottom: 20rpx solid #fafafa;
		background: @white-color;
		padding: @padding-30;
		font-size: 28rpx;
		span {
			display: inline-block;
			width: 172rpx;
		}
		input {
		}
	}
	&-count {
		padding: 30rpx;
		background: @white-color;
		margin-bottom: 116rpx;
		p {
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 55rpx;
			font-size: @middle-title;
			span {
				color: @color-666;
			}
		}
	}
	&-sum {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		height: 96rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: @white-color;
		text-indent: 20rpx;
		width: 100%;
		p {
			display: flex;
			align-items: center;
			i {
				color: #d66377;
			}
		}
		div {
			display: inline-block;
			height: 96rpx;
			width: 245rpx;
			line-height: 96rpx;
			color: @white-color;
			font-size: 32rpx;
			text-align: center;
			background: #b79f77;
		}
	}
	&-preferential {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999999;
		background: rgba(0, 0, 0, 0.6);
		&-con {
			background-color: #fff;
			height: 880rpx;
			position: absolute;
			width: 100%;
			bottom: 0;
			div {
				height: 92rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// border-bottom: 1rpx solid #f5f5f5;
				padding: @padding-lr;
			}
			ul {
				height: 675rpx;
				overflow: scroll;
				li {
					background-color: #fff;
					-webkit-box-shadow: 0rpx 0rpx 30rpx #eee;
					box-shadow: 0rpx 0rpx 30rpx #eee;
					border-radius: 8rpx;
					margin: 20rpx 30rpx 0;
					display: -moz-box;
					display: -webkit-box;
					display: box;
					padding: 20rpx 0;
					.pre-left {
						// width: 186rpx;
						text-align: center;
						display: flex;
						flex-direction: column;
						h1 {
							display: inline-block;
							color: #d66377;
							font-size: 40rpx;
							i {
								font-size: @middle-title;
								display: inline-block;
								vertical-align: top;
								color: #b79f77;
							}
						}
						h2 {
							font-size: 22rpx;
							color: @color-999;
						}
					}
					.pre-center {
						-webkit-box-flex: 1;
						box-flex: 1;
						width: 0;
						display: flex;
						align-items: center;
						flex-direction: column;
						justify-content: center;

						h3 {
							font-size: @top-title;
							color: @color-333;
							margin-bottom: 10rpx;
							text-align: left;
						}
						h4 {
							font-size: 20rpx;
							color: @color-999;
						}
					}
					.pre-right {
						width: 86rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
			.pre-btn {
				display: flex;
				justify-content: center;
				height: 96rpx;
				position: absolute;
				bottom: 0;
				width: 100%;
				text-align: center;
				line-height: 96rpx;
				color: @white-color;
				font-size: @top-title;
				background: #b79f77;
			}
		}
	}
}
</style>
 