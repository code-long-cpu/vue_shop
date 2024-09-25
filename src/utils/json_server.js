import axios from 'axios'

// ①创建axios实例对象。Axios是类，有构造函数功能，所以能建多个不同的实例对象。以前是直接axios发请求，现在先创建实例（对象），再通过实例对象发请求。
const DengLu = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

// ②自定义配置实例对象，xielong.name='龙' ；xielong.qingqiu 
// 配置请求拦截器， 响应拦截器

// 添加请求拦截器
DengLu.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
DengLu.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data;

  // // 检查请求异常
  // // console.log(res);
  // if (res.status !== 200) {
  //   // 给提示
  //   Toast(res.message)
  //   // 抛出异常，中断程序
  //   return Promise.reject(res.message);
  // }

  // 返回响应数据
  return res;


}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// ③导出DengLu的Axios实例
export default DengLu