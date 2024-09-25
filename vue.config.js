const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决跨域请求问题
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3030',  // 后端API服务器地址
  //       changeOrigin: true,  // 允许代理改变源（跨域时设置）
  //       pathRewrite: {
  //         '^/api': ''  // 如果后端没有 `/api` 路径前缀，可以去掉
  //       }
  //     }
  //   }
  // }
})
