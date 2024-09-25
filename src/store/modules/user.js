export default {
  namespaced: true,
  state() {
    return {
      // 个人权证相关(token和id)
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      state.userInfo = obj
      // console.log(userInfo);
    }
  },
  actions: {},
  getters: {},
}