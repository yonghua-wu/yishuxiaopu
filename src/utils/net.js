import axios from 'axios'
import config from './config.js'
import storage from './storage'

let http = axios.create({
  baseURL: config.HOST,
  timeout: 10000
})

// 请求拦截器
http.interceptors.request.use(function (req) {
  // 如果请求是登陆或注册，直接发请求
  if ( (req.url == '/auth') || (req.url == + '/users' && req.method == 'post') ) {
    return req
  }
  // 其他请求，在header中携带token再发
  req.headers.token = storage.get('token') || ''
  return req
}, function (err) {
  return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(function (res) {
  if (res.data.auth != '' && res.data.auth != null && res.data.auth != 'null') {
    storage.set('token', res.data.auth)
  }
  return res
}, function (err) {
  return Promise.reject(err)
})

export default http