import axios from 'axios'

// ①创建axios实例对象。Axios是类，有构造函数功能，所以能建多个不同的实例对象。以前是直接axios发请求，现在先创建实例（对象），再通过实例对象发请求。
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: "H5" },

  // headers: { 'X-Custom-Header': 'foobar' }
});

// ②自定义配置实例对象，xielong.name='龙' ；xielong.qingqiu 
// 配置请求拦截器， 响应拦截器

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// ③导出instance的Axios实例
export default instance