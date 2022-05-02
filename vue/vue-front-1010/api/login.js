import request from "@/utils/request"
export default {
  loginUser(member){ //用户登录 返回token
    return request({
      url:'/deucenter/ucenter-member/login/',
      method:'post',
      data:member
    })
  },
  getMemberInfo(){ //根据token获取用户信息
    return request({
      url:'/deucenter/ucenter-member/getMemberInfo',
      method:'get',
    })
  },
}
