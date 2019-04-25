import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index/index.vue'
import home from './views/index/home.vue'
import my from './views/index/my.vue'
import message from './views/index/message.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'msg',
          name: 'msg',
          component: message
        },
        {
          path: 'my',
          name: 'my',
          component: my
        }
      ]
    },
    {
      path: '/browse/classification',
      name: 'classification',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/browse/classification.vue')
    }
  ]
})
