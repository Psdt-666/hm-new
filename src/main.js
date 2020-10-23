import Vue from './goldjs/mycommponts'
import App from './App'
import router from './goldjs/myrouter'
import './styles/base.less'
import './styles/iconfont.css'
import 'lib-flexible'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app') 