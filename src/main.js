import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
let Bootstrap = require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'

global.jQuery = jQuery
Vue.config.productionTip = false

new Vue({
  Bootstrap,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
