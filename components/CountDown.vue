<template>
	<view class="time">
		{{ tipText }}
		<text class="styleAll" v-if="isDay === true">{{ day }}</text>
		<text class="timeTxt">{{ dayText }}</text>
		<text class="styleAll">{{ hour }}</text>
		<text class="timeTxt">{{ hourText }}</text>
		<text class="styleAll">{{ minute }}</text>
		<text class="timeTxt">{{ minuteText }}</text>
		<text class="styleAll">{{ second }}</text>
		<text class="timeTxt">{{ secondText }}</text>
	</view>
</template>
<script>
	export default {
		name: 'CountDown',
		props: {
			//距离开始提示文字
			tipText: {
				type: String,
				default: '倒计时',
			},
			dayText: {
				type: String,
				default: '天',
			},
			hourText: {
				type: String,
				default: '时',
			},
			minuteText: {
				type: String,
				default: '分',
			},
			secondText: {
				type: String,
				default: '秒',
			},
			datatime:Number,
			isDay: {
				type: Boolean,
				default: true,
			},
		},
		data: function() {
			return {
				time: null,
				day: '00',
				hour: '00',
				minute: '00',
				second: '00',
			}
		},
		created: function() {
			this.show_time()
		},
		watch: {
			// datatime:val=>{
			// 	clearInterval(this.timeInterval)
			// 	this.time = val
			// 	this.show_time()
			// },
			// datatime: {
			// 	immediate: true,
			// 	handler (val) {
			// 		clearInterval(this.timeInterval)
			// 		this.time = val
			// 		this.show_time()
			// 	},
			// 	deep: true
			// }
		},
		mounted() {
			console.log(1111111,'开始计时')
			clearInterval(this.timeInterval)
			this.time = this.datatime
			console.log(this.time)
			this.show_time()
		},
		destroyed() {
			clearInterval(this.timeInterval)
		},
		methods: {
			show_time: function() {
				let that = this
				if (parseInt(that.time).length == 13) {
					// 毫秒级
					console.log('毫秒')
					that.time = that.time / 1000
				} else if (parseInt(that.time).length == 10) {
					console.log('秒')
					// 秒级
				} else {
					// 时间
					console.log('时间')
					console.log(that.time)
					// that.time = Date.parse(that.time) / 1000
				}
				
				function runTime() {
					//时间函数
					let intDiff = that.time - (Date.parse(new Date()) / 1000 )//获取数据中的时间戳的时间差；
					console.log(that.time,'时间2222')
					let day = 0,
						hour = 0,
						minute = 0,
						second = 0
					if (intDiff > 0) {
						//转换时间
						if (that.isDay === true) {
							day = Math.floor(intDiff / (60 * 60 * 24))
						} else {
							day = 0
						}
						hour = Math.floor(intDiff / (60 * 60)) - day * 24
						minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60
						second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
						if (hour <= 9) hour = '0' + hour
						if (minute <= 9) minute = '0' + minute
						if (second <= 9) second = '0' + second
						that.day = day
						that.hour = hour
						that.minute = minute
						that.second = second
					} else {
						that.day = '00'
						that.hour = '00'
						that.minute = '00'
						that.second = '00'
					}
				}
				runTime()
				this.timeInterval = setInterval(runTime, 1000)
			},
		},
	}
</script>
<style scoped lang="less">
	.time .styleAll {
		color: #FFFFFF;
		background-color: #333333;
		// text-align: center;
		border-radius: 5rpx;
		box-sizing: border-box;
		padding: 8rpx;
		height: 40rpx;
		width: 40rpx;
	}
</style>
