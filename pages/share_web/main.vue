<template>
	<web-view :src="defaultUrl"></web-view>
</template>
<script>
	import {
		$storage,
		$router,
		$message
	} from '@/utils/prototype/vue.js';
	import http from "@/api/http.js";
	import {
		getTopPerMenuListFPc,
		getProappinfo,
		loginMiniProgram
	} from "@/api/interface.js";
	export default {
		data() {
			return {
				defaultUrl: '',
				skuCode: ''
			};
		},
		onLoad(options) {
			console.log('onLoad');
			if (options && options.scene) {
				this.skuCode = decodeURIComponent(options.scene)
			}
			
		},

		onShow() {
			console.log('onShow');
		},

		mounted() {
			this.setBaseInfo()
		},
		methods: {
			// 产品基本信息 登陆颜色 商城名字信息
			getBaseInfo() {
				return http.get(getProappinfo);
			},
			// 路由菜单配置信息
			getRouterMenuInfo() {
				return http.get(getTopPerMenuListFPc);
			},

			setStaticPages(element) {
				// 三个静态页首页 分类页 普通商品详情页
				if (element.menuCode == "00000042") {
					this.$state.set("homeUrl", element.menuAction);
					this.setStaticPagesChildren(element.children);
				}
				if (element.menuCode == "00000043") {
					this.$state.set("classifyUrl", element.menuAction);
				}
			},

			//设置静态页下的子级页面
			setStaticPagesChildren(children) {

				if (children.length > 0) {
					for (let index = 0; index < children.length; index++) {
						const element = children[index];
						if (element.menuCode == "P0000111") {
							this.$storage.set(
								"hrefs",
								element.menuAction.split("${htmldataFilename}")[0]
							);
						}
					}
				}
			},


			async setBaseInfo() {
				let baseInfo = await this.getBaseInfo();
				let baseColor = baseInfo.proappEnvTheme;
				this.$storage.set("proappEnvName", baseInfo.proappEnvName);
				this.$storage.set("baseColor", baseColor);
				this.$storage.set("unitPrice", JSON.parse(baseInfo.proappEnvOpenconf));
				this.$state.set("baseColor", baseColor);
				this.$state.set("unitPrice", JSON.parse(baseInfo.proappEnvOpenconf));
				wx.setNavigationBarColor({
					frontColor: "#ffffff", // 必写项
					backgroundColor: baseColor // 必写项
				});
				let menuInfo = await this.getRouterMenuInfo();
				if (!menuInfo.menuList) return;
				let menuList = menuInfo.menuList;
				this.$storage.set("getTopPerMenuList", menuList);
				this.$storage.set("footerMenu", menuList.filter(v => v.menuShow === 0));

				for (let i = 0; i < menuList.length; i++) {
					const element = menuList[i];
					this.setStaticPages(element);
				}
				let path = this.$businessDomain + '/paas/shop/' + $storage.get('hrefs') + this.skuCode + '.html';
				this.defaultUrl =
					path +
					'?miniUserName=' +
					wx.getStorageSync('miniUserName') +
					'&miniToken=' +
					wx.getStorageSync('miniToken') +
					'&proappcode=' +
					wx.getStorageSync('proappcode');
				
			}
		}
	};
</script>
