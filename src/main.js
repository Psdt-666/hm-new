import Vue from 'vue'
import App from './App'
import router from './router/index'
import 'lib-flexible'
import moment from 'moment'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.headers.common['Authorization']=localStorage.getItem('token')
Vue.prototype.axios = axios


Vue.filter('date', (v, str = 'YYYY-MM-DD') => {
  return moment(v).format(str)
})

import HmHeader from './components/HmHeader'
Vue.component('hm-header', HmHeader)

import HmLoge from './components/HmLoge'
Vue.component('hm-loge', HmLoge)

import HmBtn from './components/HmBtn'
Vue.component('hm-btn', HmBtn)

import MyEnshrine from './components/MyEnshrine'
Vue.component('my-enshrine', MyEnshrine)

import HomeHeader from './components/HomeHeader'
Vue.component('home-header', HomeHeader)


import { Tabs, PullRefresh, Tab, List, Field, Toast, Cell, CellGroup, Dialog, Uploader, Radio, RadioGroup } from 'vant'
Vue.use(Field);
Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Uploader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use((res) => {
  const { statusCode, message } = res.data
  statusCode == 401 && message == '用户信息验证失败' &&
    Toast('token已经失效请重新登录') && router.push('./login')
  return res
})


new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')