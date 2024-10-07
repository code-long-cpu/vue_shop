import { getInfo, setInfo } from '@/utils/storge'

export default {
  namespaced: true,
  state() {
    return {
      // 个人权证相关(token和id)
      userInfo: getInfo()
      // getInfo()就是获取的一下对象
      // {
      //   token: '',
      //   userId: ''
      // }
    }
  },
  mutations: {
    // 修改userInfo信息
    setUserInfo(state, obj) {
      state.userInfo = obj
      // console.log(userInfo);
      setInfo(obj);
    }
  },
  actions: {
    logout(context) {
      // user个人信息重置,等于一个空对象{}
      context.commit('setUserInfo', {})

      // cart购物车信息重置，跨模块调用mutation中的 cart/setCartList
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {},
}