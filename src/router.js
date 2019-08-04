import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
// const path = process.env.NODE_ENV === 'production' ? 'vue-cli/' : '/'

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: process.env.VUE_APP_ROUTE_PATH,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
