import request from '@/utils/request'

// 获取商品搜索的数据
export const getProList = (categoryId, goodsName, page) => {
  return request({
    url: "/goods/list",
    method: "get",
    params: {
      categoryId,
      goodsName,
      page,
    }
  })
}