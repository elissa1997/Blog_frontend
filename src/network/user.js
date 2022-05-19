import { instance_api } from '@/network/axios.js'

export function login(data) {
  return instance_api({
    url: process.env.VUE_APP_API+'/login',
    method: 'post',
    data
  })
}