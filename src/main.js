import Vue from 'vue'
import './common/common.scss'
import './plugins/axios'
import 'amfe-flexible'  // 划分为1/10的宽度
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Toast } from 'vant'
import store from './store'
Vue.use(Toast)
Vue.use(Vant)

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.filter('formatDate', function (value) {
  let date = new Date(value)
  let hour = date.getHours()
  hour = hour < 10 ? '0' + hour : hour
  let minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + hour + ":" + minute
})

Vue.filter('formatDateYM', function (value) {
  let date = new Date(value)
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
