import request from '@/utils/request'

// 获取首页数据
export const getHomeData = () => {
  return request({
    url: '/page/detail',
    params: {
      pageId: 0
    },
    headers: { platform: "H5" },
  })
}