<template>
	<view id="index">
		<!-- 顶部导航 -->
		<uni-nav-bar v-if="navBarShow">
			<view class="tabs-box">
				<view class="one-nav" :class="currentSwiperIndex === 0 ? 'nav-actived' : '' " @tap="swiperChange(0)">推荐
				</view>
				<view class="one-nav" :class="currentSwiperIndex === 1 ? 'nav-actived' : '' " @tap="swiperChange(1)">资讯
				</view>
			</view>
		</uni-nav-bar>
		<!-- 页面 header 相关部分 -->
		<view class="header-box">
			<!-- 顶部广告位轮播图 -->
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="2500" :duration="500">
				<swiper-item v-for="item in swiperAdList" :key="item.id">
					<navigator open-type="navigate" :url=" '/pages/webview/webview?url='+item.link">
						<image class="banner-swiper-img" :src="item.image" mode="aspectFill" />
					</navigator>
				</swiper-item>
			</swiper>
			<!-- 遮罩使用弧形框 -->
			<image class="crile" src="@/static/crile.png" mode="aspectFill" />
			<!-- 两个选项按钮 -->
			<view class="card-header">
				<view class="card-one card-left" @tap="gotoTap('/pages/feeds/feeds')">
					<image class="img" src="@/static/coffee.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">精彩动态</view>
					</view>
				</view>
				<view class="card-one card-right" @tap="gotoTap('/pages/me/me')">
					<image class="img" src="@/static/ran.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">个人中心</view>
					</view>
				</view>
			</view>
			<!-- Tab 选项卡 -->
			<view class="tabs-box">
				<view class="one-nav" :class="currentSwiperIndex === 0 ? 'nav-actived' : '' " @tap="swiperChange(0)">推荐
				</view>
				<view class="one-nav" :class="currentSwiperIndex === 1 ? 'nav-actived' : '' " @tap="swiperChange(1)">资讯
				</view>
			</view>

		</view>
		<!-- 内容轮播导航实现 -->
		<swiper class="swiper-box" :style=" 'height:'+swiperSliderHeight" :current="currentSwiperIndex"
			@animationfinish="swiperSlider">
			<!-- 推荐动态实现 -->
			<swiper-item class="swiper-item sns-now">
				<view class="feeds-box">
					<sts-waterfall v-model="feedsList" ref="waterfall">
						<template v-slot:left="{leftList}">
							<view class="feed-one" v-for="(item, index) in leftList" :key="index">
								<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?name=' + item.name">
									<image class="feed-img" :src="item.cover" mode="widthFix" :lazy-load="true" />
									<view class="u-line-2 feed-title" v-if="!!item.feed_content">{{ item.feed_content }}
									</view>
									<view class="feed-info">
										<view class="iview">
											<image class="avatar" :src=" item.avatar" />
											<text class="name u-line-1">{{ item.name }}</text>
										</view>
										<view class="iview">
											<view class="ilike" @tap.stop="clickLove(item)">
												<image v-if="item.has_like" src="@/static/lover.png" class="micon" />
												<image v-else src="@/static/love.png" class="micon" />
												<text class="love-count"
													v-if="item.like_count>0">{{ item.like_count }}</text>
											</view>
										</view>
									</view>
								</navigator>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="feed-one" v-for="(item, index) in rightList" :key="index">
								<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?name=' + item.name">
									<image class="feed-img" :src="item.cover" mode="widthFix" :lazy-load="true" />
									<view class="u-line-2 feed-title" v-if="!!item.feed_content">{{ item.feed_content }}
									</view>
									<view class="feed-info">
										<view class="iview">
											<image class="avatar" :src=" item.avatar" />
											<text class="name u-line-1">{{ item.name }}</text>
										</view>
										<view class="iview">
											<view class="ilike" @tap.stop="clickLove(item)">
												<image v-if="item.has_like" src="@/static/lover.png" class="micon" />
												<image v-else src="@/static/love.png" class="micon" />
												<text class="love-count"
													v-if="item.like_count>0">{{ item.like_count }}</text>
											</view>
										</view>
									</view>
								</navigator>
							</view>
						</template>
					</sts-waterfall>
				</view>
			</swiper-item>
			<!-- 资讯列表实现 -->
			<swiper-item class="swiper-item sns-news">
				<view v-for="(item, index) in newsList" :key="index">
					<navigator class="one-new" open-type="navigate"
						:url=" '/subpages/newinfo/newinfo?name=' + item.author">
						<view class="left">
							<view class="title u-line-2">{{item.title}}</view>
							<view class="uinfo">
								<view class="iview">
									<view class="utime">
										<text class="name">{{ item.author }}</text>
									</view>
								</view>
								<text class="uptime">{{ item.created_at | timeFormate }}发布</text>
							</view>
						</view>
						<view class="right">
							<image class="pic" mode="aspectFill" :src="item.cover" />
						</view>
					</navigator>
				</view>
			</swiper-item>
		</swiper>
		<u-back-top :scroll-top="scrollTop" :bottom="250" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
		
		<!-- 登录组件 -->
		<login ref="login" v-if="!loginState"></login>
		<!-- 发布动态组件 -->
		<goto-share />
	</view>
</template>

<script>
	// 引入 时间日期格式化显示函数
	import timeFrom from '@/tools/timeFrom.js'
	import stsWaterfall from '@/components/sts-waterfall.vue'
	import {
		mapState,
		mapAction
	} from 'vuex'
	import todoLoveMixin from '@/mixins/todoLove.js'
	import API from '@/mock/api.js'
	export default {
		components: {
			stsWaterfall
		},
		mixins: [todoLoveMixin],
		data() {
			return {
				// 轮播图广告信息
				swiperAdList: [],
				//当前推荐 资讯滑动位置
				currentSwiperIndex: 0,
				//动态列表数据
				feedsList: [],
				//资讯列表数据
				newsList: [],
				//滑动页面轮播器全局高度
				swiperSliderHeight: '1000px',
				swiperSliderFeedsHeight: 0,
				swiperSliderNewsHeight: 0,
				//控制顶部导航显示
				navBarShow: false,
				//当前滑动位置
				oldFeedsScrollTop: 0,
				oldNewsScrollTop: 0,
				scrollTop: 0,
				iconStyle: {
					fontSize: '32rpx',
					color: '#2979ff'
				},
				customStyle: {
					backgroundColor: '#ffffff'
				}
			}
		},
		//监听页面下滑位置
		onPageScroll(event) {
			this.scrollTop = event.scrollTop;
			if (this.currentSwiperIndex === 0) {
				this.oldFeedsScrollTop = event.scrollTop
			} else {
				this.oldNewsScrollTop = event.scrollTop
			}
			if (event.scrollTop > 220) {
				this.navBarShow = true
			} else {
				this.navBarShow = false
			}
		},
		//顶部下拉更新数据
		onPullDownRefresh() {
			this.getAdverts()
			if (this.currentSwiperIndex === 0) {
				this.$refs.waterfall.clear()
				this.getFeeds()
			} else {
				this.getNews()
			}
		},
		//下拉置底请求新的数据
		onReachBottom() {
			if (this.currentSwiperIndex === 0) {
				this.getFeeds()
			} else {
				this.getNews()
			}
		},
		computed: {
			...mapState(['loginState'])
		},
		onLoad() {
			//初始化获取广告信息
			this.getAdverts()
			//初始化获取推荐信息
			this.getFeeds()
			//初始化获取资讯信息
			this.getNews()

			//用户登录完成后触发的行为
			uni.$on('indexUserLogin', () => {
				this.currentSwiperIndex = 0
				this.feedsList = []
				this.$refs.waterfall.clear()
				this.getFeeds()
			})
			uni.$on('indexUserLogout', () => {
				this.currentSwiperIndex = 0
				this.feedsList = []
				this.$refs.waterfall.clear()
				this.getFeeds()
			})
			// 用户点赞一条动态后触发数据更新
			uni.$on('indexFeedLoveChange', item => {
				this.$refs.waterfall.modify(item.id, "like_count", item.like_count);
				this.$refs.waterfall.modify(item.id, "has_like", item.has_like);
			})
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
			//推荐 资讯滑动切换方法
			swiperSlider(event) {
				let index = event.detail.current
				if (index === 0) {
					this.swiperSliderHeight = this.swiperSliderFeedsHeight
					uni.pageScrollTo({
						duration: 0,
						scrollTop: this.oldFeedsScrollTop
					})
				} else {
					this.swiperSliderHeight = this.swiperSliderNewsHeight
					uni.pageScrollTo({
						duration: 0,
						scrollTop: this.oldNewsScrollTop
					})
				}
				this.currentSwiperIndex = index
			},
			//跳转详情页方法
			gotoTap(url) {
				uni.switchTab({
					url
				})
			},
			// 推荐 资讯点击切换方法
			swiperChange(index) {
				if (index === 0) {
					this.swiperSliderHeight = this.swiperSliderFeedsHeight
					uni.pageScrollTo({
						duration: 0,
						scrollTop: this.oldFeedsScrollTop
					})
				} else {
					this.swiperSliderHeight = this.swiperSliderNewsHeight
					uni.pageScrollTo({
						duration: 0,
						scrollTop: this.oldNewsScrollTop
					})
				}
				this.currentSwiperIndex = index
			},
			// 请求 广告轮播图信息
			async getAdverts() {
				let adverts = await API.getAdverts()
				console.log(adverts, "adverts")
				this.swiperAdList = adverts.data.map(item => {
					return {
						id: item.id,
						link: item.link,
						image: item.image
					}
				})


			},
			// 请求 动态列表信息
			async getFeeds() {
				let feeds = await API.getFeeds()
				console.log(feeds, "feeds")
				let feedsList = feeds.data
				this.feedsList = [...this.feedsList, ...feedsList]
				uni.$on('swiperHeightChange', height => {
					console.log('高度为：' + height)
					this.swiperSliderFeedsHeight = height
					this.swiperSliderHeight = height
				})
			},
			// 请求 资讯列表信息
			async getNews() {
				let news = await API.getNews()
				console.log(news, "news")
				let newsList = news.data
				this.newsList = [...this.newsList, ...newsList]
				this.swiperSliderNewsHeight = (this.newsList.length * 95 + 100) + 'px'
				this.swiperSliderHeight = this.swiperSliderNewsHeight
			},
			// //点赞和取消点赞方法
			// clickLove(item) {
			// 	console.log((item))
			// 	this.feedsList = this.feedsList.map(value => {
			// 		if (value.id == item.id) {
			// 			if (value.has_like) {
			// 				value.has_like = false
			// 				value.like_count = value.like_count - 1
			// 			}
			// 			value.has_like = true
			// 			value.like_count = value.like_count + 1
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	#sns {
		background-color: #f1f1f1;
	}

	// 推荐、咨询 按钮样式
	.tabs-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 750upx;

		.one-nav {
			width: 120upx;
			color: #9B9B9B;
			font-size: 36upx;
			text-align: center;
			font-weight: blod;

			&.nav-actived {
				color: #0050FF;
			}
		}
	}

	.header-box {
		position: relative;
		left: 0;
		height: 500upx;
		background-color: #f1f1f1;
		z-index: 1;

		// 广告位轮播器相关样式
		.swiper {
			width: 750upx;
			height: 400upx;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			z-index: 1;

			.banner-swiper-img {
				width: 750upx;
				height: 400upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
			}
		}

		.crile {
			width: 750upx;
			height: 50upx;
			position: absolute;
			left: 0;
			top: 355upx;
			z-index: 9;
		}

		// 新鲜事 活动墙 按钮样式
		.card-header {
			position: absolute;
			left: 0;
			top: 320upx;
			height: 160upx;
			z-index: 99;
			width: 710upx;
			margin-left: 20upx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			align-content: center;

			.card-one {
				width: 328upx;
				height: 96upx;
				border-radius: 49upx;
				background-color: #fff;
				margin: 0 10upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;

				.img {
					width: 44upx;
					height: 44upx;
					margin-left: 50upx;
				}

				.iright {
					margin-left: 30upx;
					text-align: left;
					color: #888;

					.title {
						font-size: 30upx;
						color: #001432;
					}

					.iview {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: space-between;
						align-items: center;
						align-content: center;
						font-size: 20upx;
						margin-top: -5upx;
					}
				}
			}
		}

		// 推荐、咨询 按钮样式
		.tabs-box {
			width: 750upx;
			position: absolute;
			z-index: 1;
			left: 0;
			top: 480upx;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.one-nav {
				height: 80upx;
				width: 110upx;
				color: #9B9B9B;
				font-size: 36upx;
				text-align: center;
				font-weight: blod;

				&.nav-actived {
					color: #0050FF;
				}
			}
		}
	}

	// 此刻 栏目样式\
	.swiper-box {
		background-color: #f1f1f1;
		padding: 60upx 0 40upx;
	}

	.sns-now {

		// 动态相关瀑布流样式
		.feeds-box {
			width: 735upx;
			margin-left: 13upx;
			padding-bottom: 20upx;

			.feed-one {
				width: 358upx;
				margin-bottom: 12upx;
				background-color: #FFF;
				border-radius: 20upx;

				position: relative;

				.feed-img {
					width: 358upx;
					height: 300upx;
					border-radius: 10upx;
				}

				.feed-title {
					width: 350upx;
					margin-top: 15upx;
					margin-left: 10upx;
					font-size: 28upx;
					line-height: 40upx;
					color: #001432;
					text-align: left;
				}

				.feed-info {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 10upx;
					font-size: 20upx;
					color: #666;
					padding: 0 10upx 16upx;

					.iview {
						display: flex;
						flex-direction: row;
						flex-wrap: nowrap;
						justify-content: space-between;
						align-items: center;
						align-content: center;

						.ilike {
							display: flex;
							flex-direction: row;
							flex-wrap: nowrap;
							justify-content: space-between;
							align-items: center;
							align-content: center;
							height: 60upx;
							padding: 0 10upx;
							background-color: #FFFFFF;
						}
					}

					.avatar {
						margin-right: 10upx;
						height: 40upx;
						width: 40upx;
						border-radius: 50%;
						border: 1upx solid #eee;
					}

					.name {
						max-width: 120upx;
						color: #757474;
					}

					.micon {
						width: 32upx;
						height: 28upx;
					}

					.love-count {
						padding-left: 10upx;
						color: #757474;
					}
				}
			}
		}
	}

	// 轮播页面 资讯
	.sns-news {
		background-color: #fff;
		width: 750upx;

		.one-new {
			width: 700upx;
			height: 74px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: flex-start;
			align-content: center;
			padding-bottom: 10px;
			padding-top: 10px;
			padding-left: 25upx;
			padding-right: 25upx;
			border-bottom: 1px solid #f1f1f1;

			.left {
				width: 490upx;
				height: 140upx;
				text-align: left;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;

				.title {
					font-size: 30upx;
					line-height: 42upx;
					color: #001432;
					margin-top: 21upx;
				}

				.uinfo {
					width: 490upx;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 6upx;
					font-size: 20upx;
					color: #999;

					.utime {
						font-size: 24upx;

						.name {
							max-width: 120upx;
							color: #777;
						}
					}
				}
			}

			.right {
				width: 120upx;

				.pic {
					width: 120upx;
					height: 120upx;
					margin-top: 20upx;
					border-radius: 6upx;
				}
			}
		}
	}
</style>
