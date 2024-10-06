import request from '@/utils/request'

// 获取地址列表;
// 获取地址数据为空的用13811112222的手机登录就有了
export const getAddressList = () => {
  return request({
    url: '/address/list'
  })
}