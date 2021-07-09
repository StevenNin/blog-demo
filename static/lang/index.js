import en  from './en_US.js'
import cn from './zh_CN.js'
import idn from './id_ID.js'
import Vue from 'vue'
import {setStorage,getStorage} from '../../utils/uni.public.js'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const system_info = getStorage('system_info')
if (!system_info) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function(res) {
			setStorage('system_info', res);
		}
	})
}

let cur_lang = 'cn';
switch (system_info.language) {
	case 'en':
		cur_lang = 'en'
		break;
	case 'cn':
		cur_lang = 'cn'
		break;
	case 'idn':
		cur_lang = 'idn'
		break;

}

const i18n = new VueI18n({
	locale: cur_lang || 'cn', // 默认选择的语言
	messages: {
		'en': en,
		'cn': cn,
		'idn': idn
	}
})


const id = i18n.locale === 'cn' ? 0 :i18n.locale === 'en' ? 1 : 2;
setStorage('language',{data:i18n.locale,index:id})

export default i18n