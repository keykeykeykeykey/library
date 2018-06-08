import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../view/index')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../view/user')
    },
    {
      path: '/userchange',
      name: 'userchange',
      component: () => import('../view/userchange')
    },
    {
      path: '/userchangepwd',
      name: 'userchangepwd',
      component: () => import('../view/userchangepwd')
    },
    {
      path: '/bookonline',
      name: 'bookonline',
      component: () => import('../view/bookonline')
    },
    {
      path: '/userborrow',
      name: 'userborrow',
      component: () => import('../view/userborrow')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../view/admin')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('../view/system')
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: () => import('../view/searchResult')
    }
  ]
})
