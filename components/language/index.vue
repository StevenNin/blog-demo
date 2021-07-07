<template>

	<view class="boxconet" @click="languageFunc">
		<!-- 语言切换 S -->
		<view class="language">
			<view class="triangle-up"></view>
			<view class='type' v-for="item,index in language" :key='index' @click="languageFunc(item,index)"
				:style="{borderBottom: (index === 2 && 'none')}" :class="{picth:index == picthIndex}">
				{{item}}
			</view>
		</view>
		<!-- 语言切换 E -->
	</view>
</template>

<script>
	import {
		setStorage,
		getStorage
	} from '@/utils/uni.public.js'
	export default {
		data() {
			return {
				language: [],
				picthIndex: '',
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
		},
		created() {
			const {
				index
			} = getStorage('language')
			this.picthIndex = index
			const system_info = getStorage('system_info')
			this.$data.system_lenguage = system_info.language;
			this.language = this.i18n.language;

		},
		methods: {
			// 语言切换
			languageFunc(data, index) {
				if (index >= 0) {
					const system_info = getStorage('system_info');
					this.$data.system_lenguage = system_info.language;
					const language = ['简体中文', '英语', '印尼', 'Simplified Chinese', 'English', 'Indonesian', 'bahasa Cina',
						'Inggris', 'bahasa Indonesia'
					]

					if (language.includes(data) && index >= 0) {
						this.picthIndex = index;
						switch (index) {
							case 0:
								system_info.language = this._i18n.locale = 'cn'
								break;
							case 1:
								system_info.language = this._i18n.locale = 'en'
								break;
							case 2:
								system_info.language = this._i18n.locale = 'idn'
								break;
						}
						const {
							language,
							typeLabel,
							placeholder: {
								home
							}
						} = this.i18n

						this.language = language
						this.typeLabel = typeLabel
						setStorage('language', {
							data: system_info.language,
							index
						});
				
					}

					this.$emit('languagechange')
				}

			},
		}
	}
</script>

<style scoped lang="less">
	.boxconet {
		position: fixed;
		top: 0rpx;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 2;
	}

	.picth {
		color: rgb(101, 38, 220);
	}

	.language {

		position: fixed;
		// #ifdef H5
		top: 8%;
		// #endif
		// #ifndef H5
		top: 10%;
		// #endif
		right: 30rpx;
		width: 330rpx;
		height: auto;
		background-color: #fff;
		border-radius: 20rpx;
		color: rgb(67, 67, 67);

		view {

			text-align: start;
			line-height: 80rpx;
			border-bottom: 4rpx solid #C0C0C0;
			border-bottom: 4rpx solid rgba(216, 215, 215, 0.5);

		}

		.type {
			padding-left: 20rpx;
		}

		.triangle-up {
			width: 0;
			height: 0;
			border-right: 20rpx solid transparent;
			border-left: 20rpx solid transparent;
			border-bottom: 20rpx solid #FFF;

			//    width: 0;
			//     height: 0;
			//     border-left: 50px solid transparent;
			//     border-right: 50px solid transparent;
			//     border-bottom: 100px solid red;
			margin-top: -12rpx;

			margin-left: 82%;
		}
	}
</style>
