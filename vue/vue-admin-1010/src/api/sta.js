import request from '@/utils/request'

export default {
  createStaData(day) {
    return request({
      url: '/staservice/statistics-daily/registerCount/'+day,
      method:'post',
    })
  },
  showChart(searchObj) {
    return request({
      url: `/staservice/statistics-daily/show/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method:'get',
    })
  }
}
