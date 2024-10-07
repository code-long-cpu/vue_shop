// import cart from '@/store/modules/cart'
import request from '@/utils/request'

// 订单结算确认
// mode:cart =>obj {cardIds} 格式是string
// mode:buyNow =>obj {goodsId,goodNum,goodsSkuId}
export const checkOrder = (mode, obj) => {
  return request({
    url: '/checkout/order',
    method: 'GET',
    params: {
      mode, //参数mode分为cart购物车或buynow立即购买
      delivery: 10, //配送方式（10快递配送 20上门自提）
      couponId: 0,//优惠券ID
      isUsePoints: 0,//是否使用积分抵扣（1使用 0不使用）
      ...obj //如果mode是cart，obj是cardIds；如果是buyNow，则用展开此obj{goodsId,goodNum,goodsSkuId}
    }
  })
}

// 提交订单
// mode:cart =>obj {cardIds ,remark} 格式是string
// mode:buyNow =>obj {goodsId,goodNum,goodsSkuId,remark}
export const submitOrder = (mode, obj) => {
  return request({
    url: '/checkout/submit',
    method: 'POST',
    data: {
      mode,
      delivery: 10,   //物流方式， 默认： 10
      couponId: 0,    //优惠券id，默认：0
      isUsePoints: 0, //是否使用积分 1-使用, 0-不使用
      payType: 10,    //支付方式，10：余额支付
      ...obj
    }
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page    //用vant里面的list做分页
    }
  })
}