import request from "@/utils/request"
export default {
  getListBanner(){ //查询前两条banner
    return request({
      url:'/educms/bannerFront/getAllBanner',
      method:'get'
    })
  }
}
