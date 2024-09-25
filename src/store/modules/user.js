import { getInfo, setInfo } from '@/utils/storge'

export default {
  namespaced: true,
  state() {
    return {
      // 个人权证相关(token和id)
      userInfo: getInfo()

      // {
      //   token: '',
      //   userId: ''
      // }
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      state.userInfo = obj
      // console.log(userInfo);
      setInfo(obj);
    }
  },
  actions: {},
  getters: {},
}