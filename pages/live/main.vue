<template>
	<view class="room-zui">
		<view class="room">
			<view class="roomList" v-for="(item, index) in roomList" :key="index" @click="goLiveRoom(item)">
				<view class="roomList-top">
					<image :src="item.infuencerUrl">
						<text v-bind:style="{ background: flagBg[item.dataState] || '#333333E6' }">{{ liveState(item) }}</text>
					</image>
				</view>
				<view class="roomList-bottom">
					<text class="title">{{ item.infuencerName }}</text>
					<view class="center">
						<!-- <image :src="item.Userimage" /> -->
						<text class="name">{{ item.infuencerInfname }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '@/api/http.js';
import { queryLiveRoomByDistributor } from '@/api/interface.js';
import { formatHours } from '@/utils/prototype/date.js';
export default {
	data() {
		return {
			// 直播间列表
			roomList: [],
			flagBg: {
				'1': '#FA4F4FE6',
				'101': '#FA4F4FE6',
				'102': '#FA4F4FE6',
				'103': '#333333E6'
			}
		};
	},

	computed: {
		// 直播状态
		liveState: function() {
			return function(item) {
				if (item.dataState == '1') {
					return `即将开始 | ${formatHours(item.infuencerStart)}`;
				}
				if (item.dataState == '101') {
					return '直播中';
				}
				if (item.dataState == '102') {
					return '未开播';
				}
				if (item.dataState == '103') {
					return '已结束';
				}
				if (item.dataState == '104') {
					return '禁播';
				}
				if (item.dataState == '105') {
					return '暂停中';
				}
				if (item.dataState == '106') {
					return '异常';
				}
				if (item.dataState == '107') {
					return '已过期';
				}
			};
		}
	},

	mounted() {
		http.get(queryLiveRoomByDistributor).then(res => {
			if (res.rows) {
				this.roomList = res.rows;
				this.roomList.map(val => {
					if (!RegExp(/http/).test(val.infuencerUrl)) {
						val.infuencerUrl = `${this.$imgDomain}${val.infuencerUrl}`;
					}
				});
			}
		});
	},

	methods: {
		goLiveRoom(item) {
			wx.navigateTo({
				url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${item.infuencerEcode}`
			});
		}
	}
};
</script>

<style lang="less" scoped>
.room-zui {
	background: #efefef;
	height: 100vh;
}
.room {
	padding: 0 23rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.roomList {
		margin-top: 27rpx;
		background: #fff;
		width: 341rpx;
		height: 518rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10rpx;
		.roomList-top {
			position: relative;
			image {
				width: 341rpx;
				height: 407rpx;
				border-radius: 10rpx;
			}
			text {
				position: absolute;
				top: 16rpx;
				left: 20rpx;
				height: 32rpx;
				font-size: 22rpx;
				color: #fff;
				line-height: 32rpx;
				opacity: 0.9;
				border-radius: 4rpx;
				padding: 5rpx 16rpx;
			}
		}
		.roomList-bottom {
			padding: 0 23rpx;
			.title {
				// height:25px;
				font-size: 26rpx;
				// font-weight:bold;
				color: rgba(51, 51, 51, 1);
				line-height: 50rpx;
				font-family: PingFang SC;
				font-weight: bold;
			}
			.center {
				display: flex;
				align-items: center;
				image {
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
				}
				.name {
					// margin-left: 8rpx;
					font-size: 26rpx;
				}
			}
		}
	}
}
</style>
