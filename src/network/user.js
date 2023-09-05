import { instance_api } from '@/network/axios.js'
import Cookies from 'js-cookie';

export function login(data) {
  return instance_api({
    url: process.env.VUE_APP_API+'/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo(data) {
  return instance_api({
    url: process.env.VUE_APP_API+'/user/info',
    method: 'post',
    data,
    headers: {'token': Cookies.get('token')}
  })
}