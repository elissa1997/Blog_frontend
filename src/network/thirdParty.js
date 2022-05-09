// 第三方接口
import { instance_api } from '@/network/axios.js'

// 必应每日一图接口
export function bingPic(params) {
  return instance_api({
    url: 'http://127.0.0.1:9010/bingProxy/HPImageArchive.aspx',
    method: 'get',
    params
  })
}

// 一言接口
export function hitokoto(params) {
  return instance_api({
    url: 'https://v1.hitokoto.cn/',
    method: 'get',
    params
  })
}
