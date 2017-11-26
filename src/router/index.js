import Vue from 'vue'
import Router from 'vue-router'
import WeatherHome from '@/components/jsnvue/WeatherHome'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WeatherHome
    },
  ]
})
