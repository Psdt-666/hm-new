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
import TableList from '../views/TableList'
import Search from '../views/Search'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', redirect: '/login',
    },
    {
      path: '/login', name: 'login', component: Login,
    },
    {
      path: '/register', component: Register,
    },
    {
      path: '/user',
      component: User,
    },
    {
      path: '/edit',
      component: Edit,
    },
    {
      path: '/attention',
      component: Attention,
    },
    {
      path: '/comments',
      component: Comments,
    },
    {
      path: '/enshrine',
      component: Enshrine,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/detail/:articleId',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/tableList',
      name: 'tableList',
      component: TableList,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
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