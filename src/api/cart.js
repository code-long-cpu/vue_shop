import request from "@/utils/request"

// 加入购物车请求
// 传递参数：
// goodsId：表示商品id  iphone8
// goodSkuId：表示商品规格 红色的iphon8 和 粉色的iphone8 是不一样的
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/add',
    method: 'POST',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    },

  })
}

// 获取购物车列表请求，渲染购物车页面
export const getCartList = () => {
  return request({
    url: '/cart/list',
    method: 'GET',
  })
}

// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '//cart/update',
    method: 'POST',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}

