import request from '@/utils/request'

export default  {
  addCourseInfo(courseInfo){ //添加课程信息
    return request({
      url: '/eduservice/edu-course/addCourseInfo',
      method: 'post',
      data:courseInfo,
    })
  },
  findAllTeacher(){ //查询所有讲师
    return request({
      url: '/eduservice/teacher/findAll',
      method: 'get',
    })
  },
  getCourseInfo(id){ //根据课程id查询课程基本信息
    return request({
      url: '/eduservice/edu-course/getCourseInfo/'+id,
      method: 'get',
    })
  },
  updateCourseInfo(updateCourseInfo){ //修改课程信息
    return request({
      url: '/eduservice/edu-course/updateCourseInfo',
      method: 'post',
      data:updateCourseInfo,
    })
  },
  getPublishCourseInfo(id){ //获取课程确认信息
    return request({
      url: '/eduservice/edu-course/getPublishCourseInfo/'+id,
      method: 'get',
    })
  },
  updateStatus(coursePublishVo){
    return request({
      url: '/eduservice/edu-course/updateStatus',
      method: 'post',
      data:coursePublishVo
    })
  },
  deleteById(id){ //根据课程id删除课程 章节 小节
    return request({
      url: '/eduservice/edu-course/deleteById/'+id,
      method: 'delete',
    })
  },
  getCourseList(page,limit,courseQuery){ //分页+模糊查询
    return request({
      url: '/eduservice/edu-course/getCourseQuery/'+page+'/'+limit,
      method: 'post',
      data:courseQuery
    })
  },
}
