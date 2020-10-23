import Vue from 'vue'

import axios from './myaxios'
Vue.prototype.axios = axios

import tools from './tools'
Vue.prototype.tools = tools

import moment from 'moment'
Vue.filter('date', (v, str = 'YYYY-MM-DD') => {
    return moment(v).format(str)
})

import HmHeader from '../components/HmHeader'
Vue.component('hm-header', HmHeader)

import HmLoge from '../components/HmLoge'
Vue.component('hm-loge', HmLoge)

import HmBtn from '../components/HmBtn'
Vue.component('hm-btn', HmBtn)

import MyEnshrine from '../components/MyEnshrine'
Vue.component('my-enshrine', MyEnshrine)

import HomeHeader from '../components/HomeHeader'
Vue.component('home-header', HomeHeader)

import Comment from '../components/Comment'
Vue.component('comment', Comment)

import Reply from '../components/Reply'
Vue.component('reply', Reply)

import { Icon, Tabs, PullRefresh, Tab, List, Field, Toast, Cell, CellGroup, Dialog, Uploader, Radio, RadioGroup } from 'vant'
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
Vue.use(Icon);

const bus = new Vue()
Vue.prototype.$bus = bus
export default Vue