<template>
	<view class="boxconet" @click="languageFunc">
		<!-- 语言切换 S -->
		<view class="language">
			<!-- <view class="triangle-up"></view> -->
			<view v-for="item,index in language" :key='index'  @click="languageFunc(item,index)" :class="{picth:index == picthIndex}">
				{{item}}
			</view>
		</view>
		<!-- 语言切换 E -->
	</view>
</template>
 
<script>
	import {setStorage,getStorage } from '@/utils/uni.public.js'
	export default {
		name: "language",
		data() {
			return {
				language: [],
				picthIndex:'',
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
		},
		created() {
			const {index} = getStorage('language')
			this.picthIndex = index
			const system_info = getStorage('system_info')
			// console.log('当前系统语言', system_info)
			
			this.$data.system_lenguage = system_info.language;
			this.language = this.i18n.language;
			// console.log(this.language);
			
			
		},
		methods: {
			// 语言切换
			languageFunc(data, index) {
				
				const system_info = getStorage('system_info');

				this.$data.system_lenguage = system_info.language;
				const language =  ['简写中文', '英语', '印尼','Chinese', 'English', 'Indonesia','Cina', 'Inggris', 'Indonesia']
				if (language.includes(data) && index >=0 ) {
					
					this.picthIndex = index
					
					switch (index) {
						case 0:
							system_info.language = this._i18n.locale = 'zh_CN'
							break;
						case 1:
							system_info.language = this._i18n.locale = 'en'
							break;
						case 2:
							system_info.language = this._i18n.locale = 'id_ID'
							break;
						case 3:
							system_info.language = this._i18n.locale = 'zh_CN'
							break;
						case 4:
							system_info.language = this._i18n.locale = 'en'
							break;
						case 5:
							system_info.language = this._i18n.locale = 'id_ID'
							break;
						case 6:
							system_info.language = this._i18n.locale = 'zh_CN'
							break;
						case 7:
							system_info.language = this._i18n.locale = 'en'
							break;
						case 8:
							system_info.language = this._i18n.locale = 'id_ID'
							break;
					}
					const {
						language,
					// 	typeLabel,
					// 	placeholder: {
					// 		// home
					// 	}
					} = this.i18n
					console.log(this.i18n)
					this.language = language
					// this.typeLabel = typeLabel
				setStorage('language',{data,index})
				}
				
				this.$emit('languagechange')
			},
		}
	}
</script>

<style scoped lang="less">
	// .boxconet {
	// 	position: fixed;
	// 	top: 0rpx;
	// 	width: 100vw;
	// 	height: 100vh;
	// 	background-color: rgba(0, 0, 0, 0.6);
	// 	z-index: 2;
	// }
	.picth{
		color: rgb(101, 38, 220);
	}
	.language {
	
		position: fixed;
		 // #ifdef H5
		top: 5%;
		 // #endif
		 // #ifndef H5
		 top: 10%;
		 // #endif
		right: 30rpx;
		width: 200rpx;
		height: auto;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 20rpx;
		color: #FFFFFF;
		padding: 20rpx;

		view {
			text-align: center;
			line-height: 60rpx;
			font-size: 20rpx;
			&:not(:last-child) {
			border-bottom: 2rpx solid #cccccc54;
			border-bottom: 2rpx solid rgb(216 215 215 / 80%);
			}
		}

		.triangle-up {
			width: 0;
			height: 0;
			border-right: 20rpx solid transparent;
			border-left: 20rpx solid transparent;
			border-bottom: 20rpx solid #FFF;
			margin-top: -12rpx;
			margin-left: 156rpx;
		}
	}
</style>
