import { instance_api } from '@/network/axios.js'

export function login(data) {
  return instance_api({
    url: '/login',
    method: 'post',
    data
  })
}