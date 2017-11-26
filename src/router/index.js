import Vue from 'vue'
import Router from 'vue-router'
import WeatherHome from '@/components/jsnvue/WeatherHome'
import Settings from '@/components/jsnvue/Settings'
import WeatherInfo from '@/components/jsnvue/WeatherInfo'
import WeatherSearch from '@/components/jsnvue/WeatherSearch'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WeatherHome
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/weather/:woeid',
      name: 'WeatherInfo',
      component: WeatherInfo,
      props: true
    },
    {
      path: '/search/:query',
      name: 'WeatherSearch',
      component: WeatherSearch,
      props: true
    },
  ]
})
