import request from '@/utils/request'

// 获取商品搜索列表的数据
export const getProList = (obj) => {
  const { sortType,
    sortPrice, categoryId,
    goodsName,
    page, } = obj;
  return request({
    url: "/goods/list",
    method: "get",
    params: {
      sortType,
      sortPrice,
      categoryId,
      goodsName,
      page,
    }
  })
}


// 获取商品详情的数据
export const getProDetail = (goodsId) => {
  return request({
    url: '/goods/detail',
    method: 'get',
    params: {
      goodsId
    }
  })
}

//获取商品评价
export const getProComments = (goodsId, limit) => {
  return request({
    url: '/comment/listRows',
    method: 'get',
    params: {
      goodsId,
      limit
    }
  })
}
