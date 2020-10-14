import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Logein'
import Register from '../views/Register'
import User from '../views/User'
import Edit from '../views/Edit'
import Attention from '../views/Attention'
import Comments from '../views/Comments'
import Enshrine from '../views/Enshrine'
import '../styles/base.less'
import '../styles/iconfont.css'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/user',
      component: User,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (to.path == '/user') {
          token ? next() : next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/edit',
      component: Edit,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (to.path == '/edit') {
          token ? next() : next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/attention',
      component: Attention,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (to.path == '/attention') {
          token ? next() : next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/comments',
      component: Comments,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (to.path == '/comments') {
          token ? next() : next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/enshrine',
      component: Enshrine,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (to.path == '/enshrine') {
          token ? next() : next('/login')
        } else {
          next()
        }
      }
    }




  ]
})
export default router