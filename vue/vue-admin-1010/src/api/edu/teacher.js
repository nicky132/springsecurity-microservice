import request from '@/utils/request'

export default{
  // 1 讲师列表(条件分页查询)
  getTeacherList: function(current, limit, teacherQuery) { //当前页 每页记录数 条件对象
    return request({
      url: `/eduservice/teacher/pageQuery/${current}/${limit}`,
      method: 'post',
      data: teacherQuery //data表示把对象变成JSON进行传递到接口 条件对象 后端用RequestBody获取数据
    })
  },
  removeById: function(id) { //当前页 每页记录数 条件对象
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete',
     // data: teacherQuery //data表示把对象变成JSON进行传递到接口 条件对象 后端用RequestBody获取数据
    })
  },
  addTeacher: function(EduTeacher) { //当前页 每页记录数 条件对象
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
       data: EduTeacher //data表示把对象变成JSON进行传递到接口 条件对象 后端用RequestBody获取数据
    })
  },
  getTeacher(id){ //根据id查询
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get',
    })
  },
  updateTeacher(eduTeacher){ //修改讲师
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data:eduTeacher
    })
  }

}
