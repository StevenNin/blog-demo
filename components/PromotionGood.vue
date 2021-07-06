<template>
	<view>
		<view class="title-box x-bc" @tap="$yrouter.push({ path: '/pages/shop/HotNewGoods/index',query:{type:1} })">
		    <!-- <text class="title">超值热卖</text> -->
			<image class="hotSaleImg" src="../static/index/valueSale.png" mode="widthFix"></image>
		    <view class="group-people x-f">
		        <text class="tip">进去逛逛></text>
		        <text class="cuIcon-right"></text>
		    </view>
		</view>
		<view class="hot-goods mx20 mb10" v-if="benefit.length">
			<GoodList :good-list="benefit" :is-sort="false" ></GoodList>
		</view>
	</view>

</template>
<script>
	import GoodList from '@/components/GoodList'
	export default {
		name: 'PromotionGood',
		components: {GoodList},
		props: ['benefit'],
		data: function () {
			return {};
		},
		methods: {
			routerGo(item) {
				this.$yrouter.push({
					path: '/pages/shop/GoodsCon/index',
					query: {
						id: item.id
					}
				});
			}
		},
		mounted() {
    }
	};
</script>

<style lang="scss" scoped>
	.sh-title-card {
		width: 750rpx;
	}

	.title-box {
		width: 710rpx;
		height: 88rpx;
		margin: 0 auto;
		position: relative;
		border-radius: 30rpx;

		.title-bg {
			width: 100%;
			height: 100%;
		}

		.title-text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-weight: bold;
		}
		
		.tip {
		    font-size: 28rpx;
		    padding-left: 30rpx;
		    color: #666;
		}
	}

	.hot-goods {
		.item{
			padding-left: 0;
		}
	}
	.hotSaleImg{
		width: 170rpx;
	}
	.forward-Icon{
		width: 40rpx;
	}
</style>
