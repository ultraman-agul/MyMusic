import axios from 'axios'
import qs from 'qs'
import {Toast} from 'vant'
import Vue from 'vue'
Vue.use(Toast)
axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错

axios.defaults.baseURL = 'http://ultramanagul.club:4000/'   /*这里的地址就是刚刚启起来的服务器地址  */

/*请求拦截*/
axios.interceptors.request.use(
  config => {
    if (config.meth === 'post' && !(config.data instanceof FormData)) {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' }) /*这里是，后端要求传数组的时候做的设置，以前出过错*/
    }
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    });
    return config
  }, error => {
    return Promise.reject(error)
  }
)
/* 响应拦截 */
axios.interceptors.response.use(
  res => {
    /*可在这里根据返回的状态码做一些拦截操作*/
    Toast.clear();
    return res.data
  }, err => {
    return Promise.resolve(err)
  }
)
export default axios  /*记得导出*/
