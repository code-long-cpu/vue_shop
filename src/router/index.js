import Vue from 'vue'
import VueRouter from 'vue-router'



// 二级路由（首页相关，全部加载）
import Layout from '@/views/layout/index.vue'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'

// 一级路由（按需加载）
const Login = () => import('@/views/login/index.vue')
const Search = () => import('@/views/search/index.vue')
const SearchList = () => import('@/views/search/list.vue')
const ProDetail = () => import('@/views/prodetail/index.vue')
const Pay = () => import('@/views/pay/index.vue')
const MyOrder = () => import('@/views/myorder/index.vue')

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
  // const token = store.state.user.userInfo.token
  // 简化代码：用getters获取
  const token = store.getters.token
  // const token = this.$store.getters.token
  // console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
