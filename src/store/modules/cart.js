
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
    },
    // 让对应的id的商品项，勾选取反
    toggleCheck(state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 让所有的小选框，同步全选设置
    toggleAllCheck(state, flag) {
      state.cartList.forEach(item => item.isChecked = flag)
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
  getters: {
    // 求购物车中所有商品的数量
    cartTotal(state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 过滤出勾选的商品项
    selCartList(state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 求勾选的商品数量
    selCount(state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 勾选中的商品总价
    selPrice(state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2); //toFixed(2)保留两位小数
    },
    // 是否全选
    isAllChecked(state) {
      return state.cartList.every(item => item.isChecked)
    }

  },
}