/*
 * @Author: 肖俊男、邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-10-10 22:19:09
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \exams\src\main.js
 * 鲸落
 */


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引用vant
import 'vant/lib/index.css';
import { Icon,RadioGroup, Radio,Checkbox, CheckboxGroup,Field,CountDown, Toast,Dialog,Lazyload,AddressEdit} from 'vant';
Vue.use(Icon).use(RadioGroup).use(Radio).use(Checkbox).use(CheckboxGroup).use(Field).use(CountDown).use(Toast).use(Dialog).use(Lazyload).use(AddressEdit);
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
};


//全局css
import './assets/css/global.css'

//引用element
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';


//配置axios
import axios from 'axios'
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = 'http://vip.jzab.xyz:8000';
axios.defaults.baseURL = '/api';
// Vue.prototype.$request_url = 'http://vip.jzab.xyz:8000'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
