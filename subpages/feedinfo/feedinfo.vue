<template>
	<view v-if="getRequestOK">
		<view class="feed-user">
			<u-avatar size="60" class="avatar" :src=" feedInfo.avatar" />
			<view class="info">
				<text>{{ feedInfo.name }}</text>
			</view>
		</view>
		<view class="feed-info">
			<view class="title" v-if="!!feedInfo.feed_content">{{ feedInfo.feed_content }}</view>
			<image class="feed-imgs" mode="widthFix" v-for="(image, index) in feedInfo.images" :key="index" :src="image" @tap="previewImage(index)" />
			<view class="other">
				<text>{{ feedInfo.created_at | timeFormate }} 发布</text>
				<text>{{ feedInfo.feed_view_count }} 阅读 {{ feedInfo.like_count }} 点赞</text>
			</view>
		</view>
		<view class="line" />
		<comment :oneInfo="feedInfo" type="feed" />
	</view>
</template>

<script>
	// 引入 时间日期格式化显示函数
	import timeFrom from '@/tools/timeFrom.js'
	// 引入 评论插件
	import comment from '@/subpages/components/comment/comment.vue'
	export default {
		components: {
			comment
		},
		data() {
			return {
				feedInfo:{},
				getRequestOK:false
			}
		},
		
		async onLoad(option) {
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus:['shareAppMessage', 'shareTimeline']
			})
			// #endif
			
			let res= this.$api.feedInfo(option.name)
			console.log(res,'res')
			this.feedInfo = res.data
			this.getRequestOK = true
			
		},
		filters: {
			timeFormate(timeDate) {
				let Time = new Date(timeDate);
				let timestemp = Time.getTime();
				let t = timeFrom(timestemp, "yyyy年mm月dd日");
				return t;
			}
		},
		methods: {
			previewImage(index) {
				uni.previewImage({
					urls: this.feedInfo.images,
					current:index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feed-user {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		margin: 20upx 0 0 25upx;

		.info {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			justify-content: flex-end;
			align-items: left;
			margin-left: 20upx;
			font-size: 24upx;
			font-weight: bolder;
			color: #1f2046;
		}
	}

	.feed-info {
		width: 700upx;
		margin-top: 20upx;
		margin-left: 25upx;
		text-align: center;
		padding-bottom: 10upx;

		.title {
			font-size: 32upx;
			margin-bottom: 30upx;
			text-align: left;
			line-height: 52upx;
			color: #666;
		}

		.feed-imgs {
			margin: 5upx 0;
			width: 100%;
		}

		.other {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			align-content: center;
			padding: 40upx 0 20upx;
			font-size: 24upx;
			color: #888;

			.micon {
				padding: 10upx 20upx;
			}
		}
	}

	.line {
		height: 30upx;
		width: 750upx;
		background-color: #f3f3f3;
	}
</style>
