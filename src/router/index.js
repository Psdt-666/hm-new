import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Logein'
import Register from '../views/Register'
import User from '../views/User'
import Edit from '../views/Edit'
import Attention from '../views/Attention'
import Comments from '../views/Comments'
import Enshrine from '../views/Enshrine'
import Home from '../views/Home'
import Detail from '../views/Detail'
import '../styles/base.less'
import '../styles/iconfont.css'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login', name: 'login', component: Login
    },
    {
      path: '/register', component: Register,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/register') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/user',
      component: User,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/user') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/edit',
      component: Edit,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/edit') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/attention',
      component: Attention,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/attention') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/comments',
      component: Comments,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/comments') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/enshrine',
      component: Enshrine,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/enshrine') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/home',
      component: Home,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/home') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/detail/:articleId',
      name: 'detail',
      component: Detail,
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token')
      //   if (to.path == '/home') {
      //     token ? next() : next('/login')
      //   } else {
      //     next()
      //   }
      // }
    }








  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  to.path == '/login' || to.path == '/register' ? next() : token ? next() : next(
    {
      name: 'login',
      params: {
        back: true
      }
    }
  )

})

export default router