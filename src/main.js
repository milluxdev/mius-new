import Vue from 'vue'
import App from './app/App.vue'
import './app/quasar/quasar'
import router from './app/router'
import i18n from './app/i18n'
// import sqlite3 from 'sqlite3'
import ygo from './app/ygopro'
import axios from 'axios'
import store from './app/store'

Vue.config.productionTip = false

localStorage.setItem("router", "Serve7210");

// Vue.prototype.$sqlite = sqlite3
Vue.prototype.$ygo = ygo
Vue.prototype.$http = axios

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
