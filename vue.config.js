const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', //打包的vue文件上传到服务器本地也可以访问
  transpileDependencies: true,

})
