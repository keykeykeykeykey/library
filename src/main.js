// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'es6-promise/auto'
import promise from 'es6-promise'
import Api from './api/index.js'
import Utils from './utils/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.prototype.$utils = Utils;
Vue.prototype.$api = Api;
Vue.use(ElementUI);

Vue.config.productionTip = false
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8043'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
