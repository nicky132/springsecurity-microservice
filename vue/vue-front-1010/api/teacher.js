import request from "@/utils/request"
export default {
  getTeacherList(page,limit){ //分页 讲师查询
    return request({
      url:'/eduservice/teacherFront/getTeacherFrontList/'+page+'/'+limit,
      method:'post',
    })
  },
  getTeacherInfo(id){//讲师详情的方法
    return request({
      url:'/eduservice/teacherFront/getTeacherInfo/'+id,
      method:'get',
    })
  },
}
