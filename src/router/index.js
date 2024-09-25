import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import ProDetail from '@/views/prodetail/index.vue'
import Pay from '@/views/pay/index.vue'
import MyOrder from '@/views/myorder/index.vue'

// 二级路由
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确定查询的哪个商品，需要商品id确认。
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder },

  ]
})
// 定义存放需要权限访问的页面
const autUruls = ['/pay', '/myorder']

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // next()
  // to是一个参数，有path属性就是某个网页组件，判断to.path是否在autUruls中出现过
  if (!autUruls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 权限页面，需要判断token
  const token = store.state.user.userInfo.token
  // console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
