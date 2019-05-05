import axios from 'axios'
import config from './config.js'
let http = axios.create({
  baseURL: config.URL,
  timeout: 100
})
export default http