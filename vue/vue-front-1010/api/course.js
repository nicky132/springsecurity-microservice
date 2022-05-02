import request from "@/utils/request"
export default {
  getCourseList(page,limit,courseFrontVo){ //分页+条件查询课程
    return request({
      url:'/eduservice/CourseFront/getFrontCourse/'+page+'/'+limit,
      method:'post',
      data:courseFrontVo,
    })
  },
  getAllSubject(){//查询所有分类
    return request({
      url:'/eduservice/edu-subject/getAllSubject',
      method:'get',
    })
  },
  getCourseInfo(id){//查询课程详情
    return request({
      url:'/eduservice/CourseFront/getFrontCourseInfo/'+id,
      method:'get',
    })
  },
  getMemberInfo(){//根据token获取用户信息
    return request({
      url:'/deucenter/ucenter-member/getMemberInfo',
      method:'get',
    })
  },
  getCommentList(page,limit,courseId){ //分页+条件查询评论
    return request({
      url:'/eduservice/edu-comment/getCommentList/'+page+'/'+limit+'/'+courseId,
      method:'get',
    })
  },
  addComment(comment){
    return request({
      url:'/eduservice/edu-comment/addComment',
      method:'post',
      data:comment
    })
  },
}
