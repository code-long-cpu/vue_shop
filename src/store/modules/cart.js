
import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state() {
    return {
      cartList: [] //用数组对象，保存购物车数据结构，一个数组就是一条记录
    }
  },
  mutations: {
    // 提供一个设置cartList的mutation
    setCartList(state, newList) {
      state.cartList = newList
    }
  },
  actions: {
    async getCartAction(context) {
      // const res = await getCartList()
      const { data } = await getCartList()
      // console.log(data)
      // 给每个商品都复选框添加勾选状态
      data.list.forEach(item => {
        // 可以给实例对象单独赋予新的属性值isChecked和love
        item.isChecked = true;
        item.love = "爱你"
      })

      // console.log(res)
      console.log(data.list)
      context.commit('setCartList', data.list)
    }
  },
  getters: {},
}