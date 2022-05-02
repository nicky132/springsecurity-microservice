import request from '@/utils/request'

export default {
  addVideo(eduVideo) { //添加小节
    return request({
      url: '/eduservice/edu-video/addVideo',
      method: 'post',
      data:eduVideo,
    })
  },
  deleteVideo(id){//删除小节
    return request({
      url: '/eduservice/edu-video/'+id,
      method: 'delete',
    })
  },
  getVideoById(id){//根据id获取小节信息
    return request({
      url: '/eduservice/edu-video/getVideoById/'+id,
      method: 'get',
    })
  },
  updateVideo(eduVideo){//更新小节信息
    return request({
      url: '/eduservice/edu-video/updateVideo',
      method: 'post',
      data:eduVideo
    })
  },
  deleteAliyunvod(id){//删除小节视频
    return request({
      url: '/eduvod/video/removeAlyVideo/'+id,
      method: 'delete',
    })
  },
}
