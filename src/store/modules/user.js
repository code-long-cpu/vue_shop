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
  actions: {},
  getters: {},
}