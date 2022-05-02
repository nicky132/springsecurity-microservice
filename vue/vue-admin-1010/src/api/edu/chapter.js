import request from '@/utils/request'

export default {
  getChapterById(courseId) { //返回章节小节
    return request({
      url: '/eduservice/edu-chapter/getChapterVideo/'+courseId,
      method: 'get',
    })
  },
  addChapter(eduChapter) { //添加章节
    return request({
      url: '/eduservice/edu-chapter/addChapter/',
      method: 'post',
      data:eduChapter,
    })
  },
  getChapterInfo(chapterId) { //根据id查询章节
    return request({
      url: '/eduservice/edu-chapter/getChapterInfo/'+chapterId,
      method: 'get',
    })
  },
  eduChapter(eduChapter) { //修改章节
    return request({
      url: '/eduservice/edu-chapter/updateChapter',
      method: 'post',
      data:eduChapter,
    })
  },
  deleteChapter(chapterId){//删除章节
    return request({
      url: '/eduservice/edu-chapter/deleteChapter/'+chapterId,
      method: 'delete',
    })
  },
  addVideo(eduVideo) { //添加章节
    return request({
      url: '/eduservice/edu-video/addVideo',
      method: 'post',
      data:eduVideo,
    })
  },
  deleteVideo(id){//删除章节
    return request({
      url: '/eduservice/edu-video/'+id,
      method: 'delete',
    })
  },
}
