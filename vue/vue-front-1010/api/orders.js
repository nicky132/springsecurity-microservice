import request from "@/utils/request"
export default {
  createOrders(courseId){//生成订单
    return request({
      url:'/eduorder/t-order/createOrder/'+courseId,
      method:'post'
    })
  },
  getOrdersInfo(id){//根据订单号 查询订单信息
    return request({
      url:'/eduorder/t-order/getOrderInfo/'+id,
      method:'get'
    })
  },
  createNatvie(orderNo){//生成二维码的方法
    return request({
      url:'/eduorder/t-pay-log/createNative/'+orderNo,
      method:'get'
    })
  },
  queryPayStatus(orderNo){//查询订单支付状态
    return request({
      url:'/eduorder/t-pay-log/queryPayStatus/'+orderNo,
      method:'get'
    })
  }
}
