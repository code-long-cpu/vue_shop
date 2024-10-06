
import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'

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
    },
    // 修改增减窗口商品数量
    changelocalCount(state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }

  },
  actions: {
    // 获取购物车列表请求
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
      // console.log(data.list)
      context.commit('setCartList', data.list)
    },
    // 数字框修改数量
    async changeCountAction(context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // ①先本地修改-购物车列表商品数量的加减-mutation
      context.commit('changelocalCount', { goodsId, goodsNum })
      // ②再同步到后台-购物车列表商品数量的加减
      await changeCount(goodsId, goodsNum, goodsSkuId)
      // console.log(res)
    },

    async vuexDelSelect(context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      // console.log(cartIds)
      await delSelect(cartIds)
      Toast('删除成功')
      // this.$toast("删除成功");

      // 重新拉取最新的购物车数据
      context.dispatch('getCartAction')
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