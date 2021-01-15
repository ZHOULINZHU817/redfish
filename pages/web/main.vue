<template>
	<web-view :src="defaultUrl"></web-view>
</template>
<script>
import { $storage, $router, $message } from '@/utils/prototype/vue.js';
export default {
	data() {
		return {
			defaultUrl: ''
		};
	},
	onLoad(options) {
		console.log('onLoad');
		if (options.path) {
			this.defaultUrl =
				options.defaultUrl +
				'?miniUserName=' +
				encodeURIComponent(wx.getStorageSync('miniUserName')) +
				'&miniPath=' +
				options.path +
				'&menuJspath=' +
				options.menuJspath +
				'&miniToken=' +
				wx.getStorageSync('miniToken') +
				'&proappenv=' +
				wx.getStorageSync('proappenv');
		} else {
			this.defaultUrl =
				options.defaultUrl +
				'?miniUserName=' +
				encodeURIComponent(wx.getStorageSync('miniUserName')) +
				'&miniToken=' +
				wx.getStorageSync('miniToken') +
				'&proappenv=' +
				wx.getStorageSync('proappenv');
			console.log(this.defaultUrl);
			$storage.set('pagesUrl', this.defaultUrl);
		}

		wx.setNavigationBarTitle({
			title: $storage.get('proappEnvName')
		});
		wx.setNavigationBarColor({
			frontColor: '#ffffff', // 必写项
			backgroundColor: '#' + this.$state.baseColor
		});
	},

	onShow() {
		console.log('onShow');
	},
	mounted() {},
	methods: {
	}
};
</script>
