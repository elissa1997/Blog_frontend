import { instance_api } from '@/network/axios.js'

// 根据文章ID获取评论列表
export function listByArticle(params) {
  return instance_api({
    url: process.env.VUE_APP_API+'/comment/listbyarticle',
    method: 'get',
    params
  })
}

// 增加评论
export function add(data) {
  return instance_api({
    url: process.env.VUE_APP_API+'/comment/add',
    method: 'post',
    data
  })
}