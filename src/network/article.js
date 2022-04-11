import { instance_api } from '@/network/axios.js'

export function list(params) {
  return instance_api({
    url: '/article/list',
    method: 'get',
    params
  })
}