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