import { instance_api } from '@/network/axios.js'
import Cookies from 'js-cookie';

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

export function add(data) {
  return instance_api({
    url: process.env.VUE_APP_API+'/article/add',
    method: 'post',
    data,
    headers: {'token': Cookies.get('token')}
  })
}