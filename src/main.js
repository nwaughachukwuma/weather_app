// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueLocalStorage from 'vue-localstorage'

Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueLocalStorage, {
  name: 'ls',
  createComputed: true //created computed members from your variable declarations
})


// Vue.use('/', router)


/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



