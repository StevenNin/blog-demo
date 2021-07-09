<template>
	<view class="goodList">
		<view @click="routerGo(item)" class="item acea-row row-between-wrapper" v-for="(item, goodlistIndex) in goodList" :key="goodlistIndex">
			<view class="pictrue">
				<image :src="item.image" class="image" />
				<!-- <image :src="`${$VUE_APP_RESOURCES_URL}/images/one.png`" class="numPic" v-if="isSort === true && index === 0" />
				<image :src="`${$VUE_APP_RESOURCES_URL}/images/two.png`" class="numPic" v-if="isSort === true && index === 1" />
				<image :src="`${$VUE_APP_RESOURCES_URL}/images/three.png`" class="numPic" v-if="isSort === true && index === 2" /> -->
			</view>
			<view class="underline">
				<view class="line1">{{ item.storeName }}</view>
				<view class="text x-bc">	
					<view class="money font-color-money32">
						<text class="num">{{ item.price }}</text>
					</view>
					<view class="vip-money acea-row row-middle">
						<!-- <view class="vip">{{ item.otPrice || 0 }}</view> -->
						<text class="num">{{ i18n.rest }}{{ item.stock }}{{ item.unitName }}</text>
					</view>
				</view>
			</view> 
			<!-- <view class="iconfont icon-gouwuche cart-color acea-row row-center-wrapper"></view> -->
		</view>
	</view>
</template>
<script>
export default {
  name: "GoodList",
  props: {
    goodList: {
      type: Array,
      default: () => []
    },
    isSort: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {};
  },
  computed: {
      // 多语言
      i18n() {
        return this.$t('compGoodsList')
      }
  },
  methods:{
	  routerGo(item) {
	  	this.$yrouter.push({ path: '/pages/shop/GoodsCon/index', query: { id: item.id } });
	  }
  }
  
};
</script>
<style lang="scss">
	.item{
		margin-bottom: 40rpx;
		padding-left: 0;
	}
	.money{
		&:after {
			content: 'UVX';
			font-size: 15rpx;
			color: #999999;
		}
	}
	.underline1{
		// padding: 0 0.3 * 100rpx 0 0;
	}
	.image{
		background-color: #999999;
	}
</style>
