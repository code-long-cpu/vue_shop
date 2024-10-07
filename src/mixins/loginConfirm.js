export default {
  methods: {
    loginConfirm() {
      // 判断是否有token，没token，说明未登录，去登录完，return true
      if (!this.$store.getters.token) {
        // console.log("弹出确认框");
        // 也可以直接调用:
        // this.$dialog.confirm()
        // 常规写法（全局写法）
        this.$dialog
          .confirm({
            title: "温馨提示",
            message: "需要先登录才能继续操作",
            confirmButtonText: "去登录丫的",
            cancelButtonText: "滚你丫的",
          })
          // 确认按钮
          .then(() => {
            // 如果希望跳转到登录，再跳转回来当前页面，需要跳转过去携带参数（参数即当前的路径地址）this.$route.fullPath(包含查询参数) path不带参数
            this.$router.replace({
              path: "/login",
              query: {
                backUrl: this.$route.fullPath,
              },
            });
          })
          // 取消按钮，关闭当前弹窗
          .catch(() => {
            // on cancel
          });
        return true;
      }
      // 有token，是登录状态，直接return false
      return false;
    }
  }
}