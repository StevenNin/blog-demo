"use strict"
// import {
// 	isType,
// 	hexadecimal
// } from './CustomFunction.js'

/**
 * uni.showLoading 二次封装
 * 
 * https://uniapp.dcloud.io/api/ui/prompt?id=showtoast
 */
const showLoading = (title = '加载中', mask = false, param = {
	success() {},
	fail() {},
	complete() {}
}) => {
	isType(mask) === Object ? (param = mask, mask = false) : (param = param, mask = false)
	uni.showLoading({
		title,
		mask,
		...param
	});
}

/**
 * 隐藏 showLoading
 */
const hideLoading = () => {
	uni.hideLoading();
}



/**
 * 修改顶部样式，包含字体
 * 
 * https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle
 */
const haderStyle = (title, NavigationBarColor) => {

	isType(title) === String && uni.setNavigationBarTitle({
		title
	})

	if (isType(NavigationBarColor) === Object) {

		const {
			color: frontColor,
			background: backgroundColor
		} = NavigationBarColor;
		const is = ['#FFFFFF', '#ffffff', '#000000']

		if (!is.includes(frontColor)) throw new Error('color 仅支持 #ffffff 和 #000000')
		if (!hexadecimal(backgroundColor)) throw new Error('backgroundColor 背景颜色值，有效值为十六进制颜色')

		uni.setNavigationBarColor({
			frontColor,
			backgroundColor
		})
	}

}

const Toast = title => {
	uni.showToast({
		icon: "none",
		position: "bottom",
		title
	});
}

//存储数据
const setStorage = (key,data)=>{
	uni.setStorage({
	    key,
	    data,
	    success() {
	        console.log('success');
	    }
	});
}

// 获取数据
const getStorage = key =>uni.getStorageSync(key);

// 删除
const removeStorage = key =>uni.removeStorageSync(key)

//防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。 
function debounce (fun, delay=500) {
	return function(args) {
		let that = this;
		let _args = args;
		clearTimeout(fun.id);
		fun.id = setTimeout(() => {
			fun.call(that, _args)
		}, delay)
	}
}

//节流：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
 function throttle(fn, delay = 500) {
	let timer = true;
	return function(args) {
		let that = this;
		let _args = arguments;
		if(!timer){
		   return false;
		}
		timer = false;
		setTimeout(() => {
			fn.apply(that, _args)
			timer = true;
		}, delay)
	}
}

export {
	showLoading,
	hideLoading,
	haderStyle,
	Toast,
	setStorage,
	getStorage,
	removeStorage,
	debounce,
	throttle
}
