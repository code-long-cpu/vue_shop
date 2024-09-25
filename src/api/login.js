
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
export const gerMsgCodeApi = (captchaCode, captchaKey, mobile) => {
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

// ③api登录请求
// export const codeLogin = (mobile, smsCode) => {
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

// ③api登录请求
export const Denglu = () => {
  return DengLu({
    url: "/data",
    method: "get",
  })
}