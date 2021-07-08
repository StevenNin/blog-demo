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
console.log(system_info,'语言类型')
switch (system_info.language) {
	case 'en':
		cur_lang = 'LangEn'
		break;
	case 'zh_CN':
		cur_lang = 'zh_CN'
		break;
	case 'idn':
		cur_lang = 'id_ID'
		break;

}

const i18n = new VueI18n({
	locale: cur_lang || 'zh_CN', // 默认选择的语言
	messages: {
		'en': LangEn,
		'zh_CN': zh_CN,
		'idn': id_ID
	}
})

// console.log(i18n.locale,'语言类型')
const id = i18n.locale === 'zh_CN' ? 0 :i18n.locale === 'LangEn' ? 1 : 2;
setStorage('language',{data:i18n.locale,index:id})

export default i18n
