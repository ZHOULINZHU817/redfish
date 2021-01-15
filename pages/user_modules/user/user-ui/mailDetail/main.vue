<template>
	<div class="mian-informDetail">
		<commonHeader :title="title" :leftIcon="leftIcon" :rightIcon="rightIcon"></commonHeader>
		<div v-if="info" class="info">
			<h1>
				{{info.pushmsgExp.paramMap.title}}
			</h1>
			<span class="time">{{date}}</span>
			<p>{{info.pushmsgExp.paramMap.content}}</p>
		</div>
	</div>
</template>
<script>
	import commonHeader from "@/components/communal/commonHeader.vue";
	import {
		getImsgPushmsgs
	} from "@/api/interface.js";
	import http from "@/api/http.js";
	import {
		formatDate
	} from "@/utils/prototype/date.js";
	export default {
		components: {
			commonHeader
		},
		computed: {
			date() {
				return formatDate(this.info.gmtCreate)
			}
		},
		data() {
			return {
				title: '消息',
				leftIcon: true,
				rightIcon: false,
				info: '',
				msgId: ""
			};
		},
		onLoad(options) {
			this.msgId = options.msgId;
		},
		mounted() {
			this.getinfo();
		},
		methods: {
			getinfo() {
				http.get(getImsgPushmsgs, {
						pushmsgId: this.msgId
					})
					.then(res => {
						this.info = res;
						this.info.pushmsgExp = JSON.parse(res.pushmsgExp)
						this.info.pushmsgExp.paramMap = JSON.parse(this.info.pushmsgExp.paramMap)
						console.log(this.info, '2333');

					})
					.catch(err => {});
			}
		}
	};
</script>
<style lang='less' scoped>
	.mian-informDetail {
		background-color: #fff;
		width: 100%;
		height: 100%;

		.info {
			padding: 93px 24px 0 24px;

			h1 {
				font-size: 36rpx;
				line-height: 48rpx;
				color: #101010;
				margin-bottom: 15rpx;
			}

			.time {
				font-size: 24rpx;
				line-height: 36rpx;
				color: #333333;
			}

			p {
				font-size: 24rpx;
				line-height: 42rpx;
				color: #666666;
				margin-top: 12rpx;
			}
		}


	}
</style>
