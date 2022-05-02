import request from "@/utils/request"
export default {
  sendCode(phone){ //根据手机号发送验证码
    return request({
      url:'/edumsm/msm/send/'+phone,
      method:'get'
    })
  },
  registerUser(registerVo){ //注册
    return request({
      url:'/deucenter/ucenter-member/register',
      method:'post',
      data:registerVo,
    })
  }
}
