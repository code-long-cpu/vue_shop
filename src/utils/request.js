import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// ①创建axios实例对象。Axios是类，有构造函数功能，所以能建多个不同的实例对象。以前是直接axios发请求，现在先创建实例（对象），再通过实例对象发请求。
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: "H5" },
});

// ②自定义配置实例对象，xielong.name='龙' ；xielong.qingqiu 
// 配置请求拦截器， 响应拦截器

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 开启loading，禁止背景点击
  Toast.loading({
    message: '加载中...',
    forbidClick: true, //禁止背景点击
    loadingType: 'spinner', //配置loading图标
    duration: 0, //不会自动消失（响应拦截器响应时就关闭）
  });

  //自动配置请求头header
  //只要有token，就在请求头携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    // 特殊字符小横杠，得用中括号
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data;

  // 检查异常请求的数据是错误的，状态码非200，状态码500就是错误请求
  // console.log(res);
  if (res.status !== 200) {
    // 弹出给提示toast，message就是后台给的信息”很抱歉，图形验证码不正确“
    Toast(res.message)
    //在控制台抛出红色异常（这个不是报错）。中断程序执行，下面的短信验证码倒计时不执行
    return Promise.reject(res.message);
  } else {
    // 清除toast提示，他是单例模式，同一时间只能存在一个toast，后面的会覆盖前面的。
    Toast.clear()
  }
  // 返回响应数据
  return res;

}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// ③导出request的Axios实例
export default request