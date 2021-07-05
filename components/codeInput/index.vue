<template>
	<view class="page">
		<view class="alert">
			<view class="main" :class="{'show': show}">
				<!-- <image class="pwdlog" src="../../static/Image/MasukkanKataSandi.png" mode=""></image> -->

				<uni-icons class="close" type="close" size="20" @click="getBack"></uni-icons>
				<view class="paytitle">请输入支付密码</view>
				<!-- <view class="icon"> @confirm='onSubmit' </view> -->
				<view class="text">{{$t("module").codePwdMsg}} </view>
				<!-- 	<view class="code">
					<input type="text" maxlength="1" v-for="(o, i) in list" v-model="o.val" :key="i" :focus="o.fs"
						:class="{'focus': o.fs}" @focus="onFocus(i,$event)" @blur="onBlur(i)"
						@input="onInput($event, i)" />
				</view> -->
				<view class="flex-box">
					<input :value="inputValue" type="text" :focus="autoFocus" :maxlength="maxlength" class="hide-input" @input="getVal" />
					<block v-for="(item, index) in ranges" :key="index">
						<view
							:class="['item', { active: codeIndex === item, middle: type === 'middle', bottom: type === 'bottom', box: type === 'box' }]">
							<view class="line" v-if="type !== 'middle'"></view>
							<view v-if="type === 'middle' && codeIndex <= item" class="bottom-line"></view>
							<block v-if="isPwd && codeArr.length >= item">
								<text class="dot">.</text>
							</block>
							<block v-else> {{ codeArr[index] ? codeArr[index] : ''}}</block>
						</view>
					</block>
				</view>

				<view class="btns" :class="{forbid:isDis}" @click="onSubmit" hover-class="none">{{$t('module').affirm}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 支持外部提供，支持使用v-model
			// 支持通过value来做清空
			value: {
				type: String,
				default: ''
			},
			// 4/6
			maxlength: {
				type: Number,
				default: 6
			},
			autoFocus: {
				type: Boolean,
				default: true
			},
			isPwd: {
				type: Boolean,
				default: false
			},
			// middle-middle line, bottom-bottom line, box-square box
			type: {
				type: String,
				default: "bottom"
			}
		},

		data() {
			return {

				inputValue: '',
				codeIndex: 1,
				pwdList:[],
				codeArr: [],
				ranges: [1, 2, 3, 4],
				pwd: '',
				show: false,
				isDis: true
			}
		},

		onReady() {
			// 显示弹出动画开关
			this.show = true;
		},
		watch: {
			maxlength: {
				immediate: true,
				handler: function(newV) {
					if (newV === 6) {
						this.ranges = [1, 2, 3, 4, 5, 6]
					} else {
						this.ranges = [1, 2, 3, 4]
					}
				}
			},
			inputValue:{
				immediate:true,
				handler:function(vla,newVla){
					console.log(vla);
					vla.length <6 && (this.isDis = true)
				}
			},
			value: {
				immediate: true,
				handler: function(newV) {
					if (newV !== this.inputValue) {
						console.log(newV);
						this.inputValue = newV
						this.toMakeAndCheck(newV)
					}
				}
			}
		},
		methods: {
			getVal(e) {
				const val = e.detail.value
				this.inputValue = val
				this.$emit('input', val)
				this.toMakeAndCheck(val)
			},
			// 输入完成
			toMakeAndCheck(val) {
				const arr = val.split('')
				
				this.codeIndex = arr.length + 1;
				
				// console.log( ''.padStart( arr.length, '●' ) );
				// this.codeArr = arr;
				this.codeArr =''.padStart( arr.length, '●' );
				this.pwdList = arr;
				if (this.codeIndex > Number(this.maxlength)) {
					this.pwd = this.pwdList.join('');
					this.pwd.length === 6 && (this.isDis = false)
					// this.$emit('keyTyped', this.codeArr.join(''));
				}
			},
			// refs 时不再提供 v-model 支持
			// 支持使用refs来设置value
			// 没有提供数据保护与检测，自己在外面对数据进行检测保护
			set(val) {
				this.inputValue = val
				this.toMakeAndCheck(val)
			},
			// 支持使用refs来清空
			clear() {
				this.inputValue = ''
				this.codeArr = []
				this.pwdList = []
				this.codeIndex = 1
			},

			getBack() {
				this.$emit('getBack')
			},

			// 提示验证码方法
			onSubmit() {
				let code = '';
				if (this.pwd && this.pwd.length === 6) {
					this.$emit('keyTyped', this.pwd);
				} else {
					uni.showToast({
						title: this.$t('toastMsg').PwdLengthDeficiency,
						duration: 3000
					});
				};
			}
		}
	}
</script>

<style>
	.page {
		z-index: 9;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.66);

		display: flex;
		/* 	background: url(../../static/img/index.jpg) no-repeat center;
		background-size: cover; */
	}

	.page .alert {

		width: 100%;
		background: #fff;
		/* margin: auto; */
		position: absolute;
		bottom: 0;
		padding: 20rpx;
		/* border-radius: 16rpx; */
		display: flex;
		justify-content: center; //子元素水平居中
		align-items: center; //子元素垂直居中
		display: -webkit-flex;
		/* 	position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.4); */
	}

	.page .alert .main {
		position: relative;
		width: 100%;
		/* 	position: relative;
		display: none; */
		/* flex-direction: column; */
		/* align-items: center; */
		/* padding: 50upx;
		border-radius: 12upx;
		width: 480upx;
		height: 360upx;
		background: rgba(255, 255, 255, 0); */
	}

	.page .alert .main .icon {
		position: relative;
		top: -48upx;
		width: 98upx;
		height: 98upx;
		background: url(../../static/Image/MasukkanKataSandi.png) no-repeat;
		background-size: contain;
	}
	.page .alert .main .paytitle {
		height: 72rpx;
		text-align: center;
		border-bottom: 0.5px solid #CCCCCC
	}
	.page .alert .main .text {
		padding: 65upx 0upx 20upx;
	
		text-align: center;
		color: #4c4e60;
		font-size: 32upx;
	}

	.page .alert .main .code {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0upx 0 50upx;
		width: 360upx;
		margin: auto;
	}

	.page .alert .main .code input {
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		border: none;
		border-bottom: 2upx solid #b2bfbd;
		text-align: center;
		color: #4c4e60;
		font-size: 46upx;
	}

	.page .alert .main .code input.focus {
		border-color: #4c79fa;
	}

	.forbid {
		background: #ccc !important;
		pointer-events: none;
		
	}

	.page .alert .main .btns {
		width: 360upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 40upx;
		text-align: center;
		color: white;
		font-size: 32upx;
		font-weight: bold;
		background: linear-gradient(to right, #A101ED, #4F05DB);
		color: #FFF;
		margin: auto;
		margin-bottom: 20rpx;
	}

	@keyframes show {
		0% {
			transform: scale(0);
			background: rgba(255, 255, 255, 0.3);
		}

		50% {
			transform: scale(1.1);
			background: rgba(255, 255, 255, 0.6);
		}

		100% {
			transform: scale(1);
			background: rgba(255, 255, 255, 1);
		}
	}

	.page .alert .show {
		display: flex !important;
		animation: show .6s ease-in-out forwards;
	}

	.pwdlog {
		width: 60px;
		height: 60px;
		position: absolute;
		top: -80rpx;
		left: 40%;
	}

	.close {
		/* 	width: 40px;
		height: 40px;
		position: absolute;
		top: -60rpx;
		left: 40%; */
		/* position: absolute;
		right: -40rpx; */
		position: absolute;
		left: 2%;
	}


	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.2;
		}
	}

	.code-box {
		text-align: center;
	}

	.flex-box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
		margin-bottom: 60rpx;
	}

	.flex-box .hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 1;
	}

	.flex-box .item {
		position: relative;
		width: 86upx;
		height: 86upx;
		margin-right: 18upx;
		font-size: 40upx;
		background-color: #EAEAEA;
		/* font-weight: bold; */
		color: #333333;
		/* line-height: 100upx; */
	}

	.flex-box .item:last-child {
		margin-right: 0;
	}

	.flex-box .middle {
		border: none;
	}

	.flex-box .box {
		box-sizing: border-box;
		border: 2upx solid #cccccc;
		border-radius: 6rpx;
	}

	.flex-box .bottom {
		box-sizing: border-box;
		border: 1rpx solid #cccccc;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex-box .active {
		/* border-color: #00C777; */
		border-color: #4F05DB;
	}

	.flex-box .active .line {
		display: block;
	}

	.flex-box .line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2upx;
		height: 40upx;
		background: #333333;
		animation: twinkling 1s infinite ease;
	}

	.flex-box .dot {
		font-size: 80upx;
		line-height: 20upx;
	}

	.flex-box .bottom-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
