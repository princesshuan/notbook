<template>
	<view class="rfeeds">
		<view class="one-feeds-box" v-for=" (feedsList, i) in showFeedsList " :key="i">
			<view v-for=" (item, k) in feedsList " :key="item.id" class="one-feed"
				:class="k % 6 == 0 ? ( i%2==0 ? 'feed-big-left' :'feed-big-right' ) : '' ">
				<navigator :url=" '/subpages/feedinfo/feedinfo?name=' + item.name">
					<image :src="item.cover" class="feed-content" mode="aspectFill" :lazy-load="true" />
				</navigator>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
		<!-- 分享按钮组件 -->
		<!-- <goto-share /> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 动态列表数据
				feedsList: [],
				// 用来展示的栅格系统的列表数据
				showFeedsList: [],
				//返回顶部
				scrollTop: 0,
				// 记录请求 feed 状态
				canRequestFeeds: "yes",
				iconStyle: {
					fontSize: '32rpx',
					color: '#2979ff'
				},
				customStyle: {
					backgroundColor: '#ffffff'
				}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 顶部下拉刷新新数据
		onPullDownRefresh() {
			this.feedsList = []
			this.getImaes()
		},
		// 滚动置底刷新请求数据
		onReachBottom() {
			this.getImaes()
		},
		onLoad() {
			this.getImaes()
		},
		methods: {
			async getImaes() {
				if (this.canRequestFeeds === "yes") {
					uni.showToast({
						title: "请求中...",
						icon: "loading",
						duration: 1000
					});
				}
				// 设置状态
				this.canRequestFeeds = "no"
				let feeds = await this.$api.getImage()
				let feedsList = feeds.data
				if (feedsList.length > 5) {
					// 记录总列表数据
					this.feedsList = [...this.feedsList, ...feedsList];
					// 在这里要处理页面的内容布局模式为栅格模式，6个元素一组
					let showArrList = [];
					for (let i = 0; i < this.feedsList.length; i++) {
						if (i % 6 == 0 && !!this.feedsList[i + 5]) {
							// 返回一个新的数组，包含从 start 到 end （不包括该元素）元素。
							// 该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。
							showArrList.push(this.feedsList.slice(i, i + 6))
						}
					}
					this.showFeedsList = showArrList
					console.log(this.showFeedsList, 'showFeedsList')
					this.canRequestFeeds = "yes"
				} else {
					this.canRequestFeeds = "end"
					uni.showToast({
						title: "到底啦！",
						icon: "success",
						duration: 1000
					});
				}
				// 如果请求状态到底了后，则提示到底了
				if (this.canRequestFeeds === "end") {
					uni.hideToast();
					uni.showToast({
						title: "到底啦！",
						icon: "success",
						duration: 1000
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.rfeeds {
		background-color: #FFFFFF;
		padding-bottom: 20upx;

		.one-feeds-box {
			width: 704upx;
			margin: 4upx 22upx 0 22upx;
			// 定义栅格布局
			display: grid;
			// 定义栅格每一列的宽度
			grid-template-columns: 232upx 232upx 232upx;
			// 定义栅格每一行的高度
			grid-template-rows: 232upx 232upx 232upx;
			// grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）
			grid-row-gap: 4upx;
			grid-column-gap: 4upx;
			background-color: #DADADA;

			.one-feed {
				position: relative;

				.feed-content {
					width: 232upx;
					height: 232upx;
					border: 1px solid #EEEEEE;
					border-radius: 4upx;
				}

				.icon {
					position: absolute;
					right: 10upx;
					top: 10upx;

					.play-icon {
						width: 40upx;
						height: 40upx;
					}
				}

				&.feed-big-left {
					grid-column-start: 1;
					grid-column-end: 3;
					grid-row-start: 1;
					grid-row-end: 3;
					background-color: #DADADA;

					.feed-content {
						width: 466upx;
						height: 466upx;
						border: 1px solid #EEEEEE;
					}
				}

				&.feed-big-right {
					grid-column-start: 2;
					grid-column-end: 4;
					grid-row-start: 1;
					grid-row-end: 3;
					background-color: #DADADA;

					.feed-content {
						width: 466upx;
						height: 466upx;
						border: 1px solid #EEEEEE;
					}
				}
			}
		}
	}
</style>
