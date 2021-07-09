<template>
	<view class="index" v-if="showIndex">
		<view v-for="(item, index) in homeData" :key="index">
			<view class="head_box" v-if="item.type == 'header'" :style="{ background: bgcolor1 }"
				:class="{ active: bgcolor1 }">
				<cu-custom :isBack="true" :bgColor="bgcolor1">
					<block slot="backText">
						<text class="nav-title shopro-selector-rect">{{ i18n.title}}</text>
					</block>
					<block slot="right">
						<image src="../../static/languageTog.png" @click="languagechange" class="toggleImg"></image>
						<!-- 语言切换 S -->
						<language v-show="islanguageShow" @languagechange='languagechange'></language>
						<!-- 语言切换 E -->
					</block>
				</cu-custom>
			</view>

			<view class="header header-search acea-row row-center-wrapper" v-if="item.type == 'search'"
				:style="{ background: bgcolor2 }">
				<view @click="goGoodSearch()" class="search acea-row row-middle">
					<text class="iconfont icon-xiazai5"></text>
					搜索商品
				</view>
				<!-- #ifndef H5 -->
				<!-- <view class="qr" @click="startQr()" v-if="$deviceType !== 'weixin'">
					<image :src="`${$VUE_APP_RESOURCES_URL}/images/qr.png`" />
				</view> -->
				<!-- #endif -->
			</view>
			<Banner v-if="item.type == 'banner'" :detail="bannerData" @getbgcolor="getbgcolor"></Banner>
			<uni-notice-bar v-if="item.type == 'noticeBar'" scrollable="true"
				 single="true" :backgroundColor="bgcolor2" :speed="10"
				showIcon="true" :text="rolls[0]?rolls[0].info:''"></uni-notice-bar>
			<view class="content_box home_content_box" v-if="item.type == 'menu' && item.componentContent.menus">
				<!-- 菜单 -->
				<Menu :list="menus"></Menu>
			</view>
			<!-- 滚动新闻 -->
			<!-- 广告 -->
			<!-- <Adv v-if="item.type == 'adv' && item.componentContent.detail" :detail="item.componentContent.detail" /> -->
			<!-- 广告图片 -->
			<view v-if="item.type == 'adv'" class="advertiseImg"></view>
			<!-- 热门榜单 -->
			<!-- <HotCommodity v-if="item.type == 'hotCommodity'" :detail="likeInfo"></HotCommodity> -->
			<HotSale v-if="item.type == 'hotCommodity'" :showTitle="true" :benefit="likeInfo"></HotSale>
			<!-- 超值拼团 -->
			<!-- <Groupon v-if="item.type == 'groupon'" :detail="combinationList" /> -->
			<!-- 首发新品->秒杀 -->

			<!-- <FirstNewProduct v-if="item.type == 'firstNewProduct'" :detail="firstList"></FirstNewProduct> -->
			<!-- 精品推荐 -->
			<!-- <ProductsRecommended v-if="item.type == 'productsRecommended'" :detail="bastList"></ProductsRecommended> -->
			<!-- 促销单品 -->
			<!-- <PromoteProduct v-if="item.type == 'promoteProduct'" :detail="benefit"></PromoteProduct> -->
			<!-- 直播 -->
			<!-- #ifdef MP-WEIXIN -->
			<Live v-if="item.type == 'live'" :detail="live"></Live>
			<!-- #endif -->
			<!-- 超值热卖 -->
			<PromotionGood v-if="item.type == 'promotionGood'" :benefit="bastList"></PromotionGood>
			<Coupon-window :coupon-list="couponList" v-if="showCoupon" @checked="couponClose" @close="couponClose">
			</Coupon-window>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import GoodList from '@/components/GoodList'
	import PromotionGood from '@/components/PromotionGood'
	import CouponWindow from '@/components/CouponWindow'
	import Menu from '@/components/Menu'
	import UniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar'
	import Adv from '@/components/sh-adv'
	import Groupon from '@/components/sh-groupon.vue'

	import Banner from './components/Banner'
	import HotCommodity from './components/HotCommodity'
	import HotSale from './components/HotSale'
	import FirstNewProduct from './components/FirstNewProduct'
	import ProductsRecommended from './components/ProductsRecommended'
	import Live from './components/Live'
	import language from '@/components/language'
	import {
		getHomeData,
		getShare,
		getCanvas
	} from '@/api/public'
	import cookie from '@/utils/store/cookie'
	import {
		isWeixin,
		handleUrlParam
	} from '@/utils/index'
	import {
	  login
	} from "@/api/user";
	import {
		openShareAll
	} from '@/libs/wechat'
	import {
		setStorage,
		getStorage
	} from '@/utils/uni.public.js'
	const HAS_COUPON_WINDOW = 'has_coupon_window'
	import dayjs from "dayjs";
	export default {
		name: 'Index',
		components: {
			// swiper,
			// swiperSlide,
			UniNoticeBar,
			GoodList,
			PromotionGood,
			CouponWindow,
			Menu,
			Adv,
			Groupon,
			Banner,
			HotCommodity,
			HotSale,
			FirstNewProduct,
			ProductsRecommended,
			Live,
			language
		},
		props: {},
		data: function() {
			return {
				showIndex: false,
				homeData: [],
				tabBarItems: ['homeindex','types','cart','my'],
				islanguageShow: false,
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				formatMenus: [],
				categoryCurrent: 0,
				menuNum: 4,
				bgcolor1: '#784dbb',
				bgcolor2: 'transparent',
				bgColor: '',
				swiperCurrent: 0, //轮播下标
				webviewId: 0,
				showCoupon: false,
				logoUrl: '',
				banner: [],
				menus: [],
				rolls: [],
				bannerData: [],
				combinationList: [],
				roll: [],
				activity: [],
				activityOne: {},
				bastList: [],
				firstList: [],
				info: {
					fastList: [],
					bastBanner: [],
					bastList: [],
				},
				likeInfo: [],
				live: [],
				lovely: [],
				benefit: [],
				couponList: [],
				swiperOption: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					autoplay: {
						disableOnInteraction: false,
						delay: 2000,
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true,
				},
				swiperRoll: {
					direction: 'vertical',
					autoplay: {
						disableOnInteraction: false,
						delay: 2000,
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true,
				},
				swiperScroll: {
					freeMode: true,
					freeModeMomentum: false,
					slidesPerView: 'auto',
					observer: true,
					observeParents: true,
				},
				swiperBoutique: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					autoplay: {
						disableOnInteraction: false,
						delay: 2000,
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true,
				},
				swiperProducts: {
					freeMode: true,
					freeModeMomentum: false,
					slidesPerView: 'auto',
					observer: true,
					observeParents: true,
				},
				bgImage: '',
			}
		},
		computed: {
			// 多语言
			i18n() {
				return this.$t('index')
			},
			singNew() {
				return this.roll.length > 0 ? this.roll[0] : '你还没添加通知哦！'
			},
			customStyle() {
				var bgImage = this.bgImage
				// var style = `height:${this.CustomBar}px;padding-top:${0}px;background: ${this.bgcolor}`;
				var style = `height:${this.CustomBar}px;padding-top:${this.StatusBar}px;background: ${this.bgcolor}`
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`
				}
				return style
			},
			setTabBarItem() {
				let tabBarOptions = {
					index: 0,  //要修改的下标
					// text: this.i18n.homeindex //文字
					text: '1111' //文字
					
					};
					//uniapp的api，传入上面写好的对象
				uni.setTabBarItem(tabBarOptions);				
			}
		},
		onLoad: function(data) {
			console.log(data,'书库。。。。。。。。。。。。。。')
			let token = getStorage('login_status')
			if(token){
				//
				this.showIndex = true
			}else{
				 const { password, username, languagetype } = data;
				 login({
				     username,
				     password,
				     // spread: cookie.get("spread")
				   })
				   .then(({
				     data
				   }) => {
				     this.$store.commit("login", data.token, dayjs(data.expires_time));
				     // handleGetUserInfo();
				     // let replace=this.$yroute.query.replace
				     // if(replace){
				 
				     // }
				     // this.$yrouter.replace({
				     // 	path: this.$yroute.query.replace || '/pages/home/index'
				     // });
				   })
				   
				   
				   
				  console.log('languagetype' in data);					
				  if ('languagetype' in data) {
					// 设置语言类型
					this._i18n.locale = languagetype;
			
					let languageindex = '';
					let languageType = ['cn', 'en', 'idn'];
					for (let i = 0; i < languageType.length; i++) {
					  if (languageType[i] === languagetype) {
						languageindex = i;
						break;
					  }
					}
					setStorage('language', {
					  data: languagetype,
					  index: languageindex,
					});
				  }
				  
				  this.showIndex = true
			}
			  
			
			this.getLocation()
			// uni.showLoading({
			//   title: "加载中",
			// });
			getCanvas()
				.then(res => {})
				.catch(error => {
					this.homeData = JSON.parse(error.data.json)
					console.log(this.homeData)
					console.log(222)
					// console.log(this, '多语言')
				})
			// 首页数据调用
			this.getHTTPHomeData();

		},
		methods: {
			// 首页数据函数
			getHTTPHomeData() {
				let that = this
				getHomeData().then(res => {
					that.logoUrl = res.data.logoUrl
					res.data.banner.map(item => (item.bgcolor = item.color || ''))
					that.$set(that, 'info', res.data.info)
					that.$set(that, 'firstList', res.data.firstList)
					that.$set(that, 'bastList', res.data.bastList)
					that.$set(that, 'likeInfo', res.data.likeInfo)
					that.$set(that, 'live', res.data.liveList)
					that.$set(that, 'lovely', res.data.lovely)
					that.$set(that, 'benefit', res.data.benefit)
					that.$set(that, 'couponList', res.data.couponList)
					that.$set(that, 'combinationList', res.data.combinationList)
					that.$set(that, 'menus', res.data.menus)
					that.$set(that, 'rolls', res.data.roll)
					that.$set(that, 'bannerData', res.data.banner)
					uni.hideLoading()
					that.setOpenShare()
					// that.doColorThief()
				})
			},
			...mapActions(['getLocation']),
			onShareTimeline: function() {
				return {
					title: this.miniHomeRemark,
					imageUrl: this.miniHomeImg,
					path: 'pages/home/index?spread=' + uni.getStorageSync('uid'),
				}
			},
			onShareAppMessage: function() {
				return {
					title: this.miniHomeRemark,
					imageUrl: this.miniHomeImg,
					path: 'pages/home/index?spread=' + uni.getStorageSync('uid'),
				}
			},
			goRoll(item) {
				if (item.uniapp_url) {
					this.$yrouter.push(item.uniapp_url)
				}
			},
			goGoodSearch() {
				// this.$yrouter.push('/pages/shop/GoodsEvaluate/index');
				this.$yrouter.push('/pages/shop/GoodSearch/index')
			},
			goWxappUrl(item) {
				this.$yrouter.push(item.uniapp_url)
			},
			goHotNewGoods(type) {
				this.$yrouter.push({
					path: '/pages/shop/HotNewGoods/index',
					query: {
						type,
					},
				})
			},
			goGoodsCon(item) {
				this.$yrouter.push({
					path: '/pages/shop/GoodsCon/index',
					query: {
						id: item.id,
					},
				})
			},
			goGoodsPromotion() {
				this.$yrouter.push('/pages/shop/GoodsPromotion/index')
			},
			setOpenShare: function() {
				if (this.$deviceType == 'weixin') {
					getShare().then(res => {
						var data = res.data.data
						var configAppMessage = {
							desc: data.synopsis,
							title: data.title,
							link: location.href,
							imgUrl: data.img,
						}
						openShareAll(configAppMessage)
					})
				}
			},
			startQr: function() {
				uni.scanCode({
					success: res => {
						let option = handleUrlParam(res.result)
						switch (option.pageType) {
							case 'good':
								// 跳转商品详情
								this.$yrouter.push({
									path: '/pages/shop/GoodsCon/index',
									query: {
										q: res.result,
									},
								})
								break
							case 'group':
								// 跳转团购
								this.$yrouter.push({
									path: '/pages/activity/GroupRule/index',
									query: {
										q: res.result,
									},
								})
								break
							case 'dargain':
								// 跳转砍价
								this.$yrouter.push({
									path: '/pages/activity/DargainDetails/index',
									query: {
										q: res.result,
									},
								})
								break
							default:
								// 跳转分销
								this.$yrouter.push({
									path: '/pages/Loading/index',
									query: {},
								})
								break
						}
					},
				})
			},
			getbgcolor(e) {
				this.bgcolor = e
			},

			// 新增功能

			// 语言切换栏隐藏
			languagechange() {
				this.getHTTPHomeData()
				this.islanguageShow = !this.islanguageShow
				this.tabBarItems.map((i,e)=>{
					uni.setTabBarItem({index:e, text:this.i18n[i]});
				})
			}
			// 切换tab 
			
		},
		created: async function() {
			// await this.doColorThief();
		},
	}
</script>
<style scoped lang="less">
	.content_box {
		background: transparent;
	}

	.index {
		background-color: #f3f2f2;
		background-image: url(../../static/index-bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-bottom: 100rpx;
	}

	.cu-bar {
		box-sizing: border-box;

		.index .header {
			height: 64rpx;
			// width: 100%;
			// padding: 0 30rpx;
			// box-sizing: border-box;
		}
	}

	.header-search {
		transition: all linear 0.3s;
	}

	.cu-bar .action {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		height: 100%;
		max-height: 100%;

		&:first-child {
			margin-left: 15px;
			font-size: 15px;
		}
	}

	.home_content_box {
		// margin-top: -20rpx;
	}

	.head_box {}

	.nav-title {
		line-height: 40px;
		color: #fff;
	}

	.toggleImg {
		position: fixed;
		right: 2%;
		top: 1.4%;
		width: 40rpx;
		height: 40rpx;
	}

	.advertiseImg {
		box-sizing: border-box;
		width: 690rpx;
		height: 234rpx;
		margin: 0 30rpx;
		text-align: center;
		background-image: url(../../static/index/advertise.png);
		background-repeat:no-repeat;
		background-size:100% 100%;
		-moz-background-size:100% 100%;
	}
	.uni-noticebar {
		width: auto;
	}
</style>
