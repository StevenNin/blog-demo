import LangEn from './en_US.js'
import zh_CN from './zh_CN.js'
import id_ID from './id_ID.js'
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

let cur_lang = 'zh_CN';
switch (system_info.language) {
	case 'en':
		cur_lang = 'en'
		break;
	case 'zh_CN':
		cur_lang = 'zh_CN'
		break;
	case 'id_ID':
		cur_lang = 'id_ID'
		break;

}

const i18n = new VueI18n({
	locale: cur_lang || 'zh_CN', // 默认选择的语言
	messages: {
		'en': LangEn,
		'zh_CN': zh_CN,
		'id_ID': id_ID
	}
})
export default i18n
