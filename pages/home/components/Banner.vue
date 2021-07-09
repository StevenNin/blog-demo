<template>
	<view class="banner-swiper-box">
		<canvas canvas-id="colorThief" class="hide-canvas"></canvas>
		<swiper class="banner-carousel Shop-selector-rect" circular @change="swiperChange" :autoplay="true">
			<swiper-item v-for="(item, index) in detail" :key="index" class="carousel-item">
				<image class="swiper-image "  :src="item.pic" @click="goRoll(item)" mode=""  lazy-load>
				</image>
			</swiper-item>
		</swiper>
		<view class="banner-swiper-dots">
			<text :class="swiperCurrent === index ? 'banner-dot-active' : 'banner-dot'" v-for="(dot, index) in detail.length"
			 :key="index"></text>
		</view>
	</view>
</template>

<script>
	import colorThief from 'miniapp-color-thief';

	export default {
		data() {
			return {
				swiperCurrent: 0, //轮播下标
				webviewId: 0,
				detail1: [
					{	
						bgcolor: "#c40414",
						name: "0",
						pic: "../../../static/index/bar.png",
						sort: 0 ,
						status: 1 ,
						url: "/"
					},
					{
						bgcolor: "#c40414",
						name: "0",
						pic: "../../../static/index/ba2r.png",
						sort: 0 ,
						status: 1 ,
						url: "/"
					},
					{
						bgcolor: "#c40414",
						name: "0",
						pic: "../../../static/index/bar3.png",
						sort: 0 ,
						status: 1 ,
						url: "/"
					},
				]
			};
		},
		props: {
			detail: {
				type: Array,
				default: []
			}
		},
		created: async function() {
			await this.doColorThief();
			console.log('類',this.detail)
		},
		computed: {},
		methods: {
			async doColorThief() {
				let that = this;
				// 获取轮播图
				let item = this.detail[this.swiperCurrent];
				// 获取轮播图颜色
				let bgcolor = item.color;
				// 颜色不存在
				if (!bgcolor) {
					that.$set(item, 'bgcolor', '#c40414');
					that.$emit('getbgcolor', '#c40414');
				} else {
					that.$set(item, 'bgcolor', bgcolor);
					that.$emit('getbgcolor', bgcolor);
				}

			},
			swiperChange(e) {
				this.swiperCurrent = e.detail.current;
				this.doColorThief();
				let bgcolor = this.detail[this.swiperCurrent].bgcolor;
				this.$emit('getbgcolor', bgcolor);
			},

			// 路由跳转
			goRoll(item) {
				if (item.uniapp_url) {
					this.$yrouter.push(item.uniapp_url)
				}
			},
		}

	}
</script>

<style lang="less">
	// 轮播
	.banner-swiper-box {
		// box-sizing: border-box;
		// background-image: linear-gradient(to bottom, #FEFCD0 0%, #F2C95F 100%);
		// background-image: -moz-linear-gradient(to bottom,  #FEFCD0 0%, #F2C95F 100%);
		border-radius: 20rpx;
		// margin: 0.3*100rpx;
	}

	.banner-swiper-box,
	.banner-carousel {
		// width: 680rpx;
		height: 350upx;
		position: relative;

		.carousel-item {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			// padding: 2%;
			overflow: hidden;
		}

		.swiper-image {
			width: 100%;
			height: 3.6*100upx;
			// border-radius: 10upx;
			// background: #ccc;
		}
	}

	.banner-swiper-dots {
		display: flex;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20rpx;
		z-index: 5;

		.banner-dot {
			width: 14rpx;
			height: 14rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 50%;
			margin-right: 10rpx;
		}

		.banner-dot-active {
			width: 14rpx;
			height: 14rpx;
			background: #a8700d;
			border-radius: 50%;
			margin-right: 10rpx;
		}
	}


	.hide-canvas {
		position: fixed !important;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
</style>
