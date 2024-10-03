
// 用于存放所有登录相关的接口请求
import request from '@/utils/request'
import DengLu from '@/utils/json_server'

// ①api获取图片验证码图片，模式：按需导出
export const getPicCodeApi = () => {
  return request({
    url: "/captcha/image",
    method: "get",
    // 补充，需要请求头
    headers: { platform: "H5" },
  });
}

// ②api获取短信验证码
export const gerMsgCodeApi = (obj) => {
  const { captchaCode, captchaKey, mobile } = obj
  return request({
    url: "/captcha/sendSmsCaptcha",
    method: "post",
    form: {
      captchaCode, //图形验证码
      captchaKey, //图形验证码key
      mobile, //接收验证码手机
    }
  })
}

// ③原文的api登录请求 ❌不能用
// export const codeLogin = ({ obj }) => {
//   const { isParty, mobile, partyData, smsCode } = obj;
//   return request({
//     url: "/passport/login",
//     method: "post",
//     // 补充，需要请求头
//     headers: { platform: "H5" },
//     form: {
//       isParty: false,
//       mobile,
//       partyData: {},
//       smsCode,
//     }
//   })
// }

// ③自己写的api登录请求 ✅能用
export const Denglu = () => {
  return DengLu({
    url: "/data",
    method: "get",
  })
}