import { instance_api } from '@/network/axios.js'

export function list(params) {
  return instance_api({
    url: process.env.VUE_APP_API+'/article/list',
    method: 'get',
    params
  })
}

export function detail(params) {
  return instance_api({
    url: process.env.VUE_APP_API+'/article/detail',
    method: 'get',
    params
  })
}