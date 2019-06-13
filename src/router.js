import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import index from './views/index/index.vue'
import home from './views/index/home.vue'
import my from './views/index/my.vue'
import message from './views/index/message.vue'

Vue.use(Router)

let router = new Router({
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

    // browse area
    {
      path: '/browse/classification',
      name: 'classification',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/browse/classification.vue')
    },
    {
      path: '/browse/list/:type/:value',
      name: 'list',
      component: () => import('./views/browse/list.vue')
    },
    {
      path: '/browse/details/:id',
      name: 'details',
      component: () => import('./views/browse/details.vue')
    },

    
    // account area
    {
      path: '/account/login',
      name: 'login',
      component: () => import('./views/account/login.vue')
    },
    {
      path: '/account/register',
      name: 'register',
      component: () => import('./views/account/register.vue')
    },
    {
      path: '/account/setting',
      name: 'setting',
      component: () => import('./views/account/setting.vue')
    },
    {
      path: '/account/userinfo',
      name: 'userinfo',
      component: () => import('./views/account/userinfo.vue')
    },
    {
      path: '/account/reset-password',
      name: 'reset-password',
      component: () => import('./views/account/resetPw.vue')
    },


    // transaction area
    {
      path: '/transaction/add-book',
      name: 'add-book',
      component: () => import('./views/transaction/addBook.vue')
    },
    {
      path: '/transaction/record',
      name: 'record',
      component: () => import('./views/transaction/record.vue')
    },

    // address area
    {
      path: '/address/list',
      name: 'address-list',
      component: () => import('./views/address/list.vue')
    },
    {
      path: '/address/edit',
      name: 'edit-address',
      component: () => import('./views/address/edit.vue')
    },

    // message area
    {
      path: '/msg/chat',
      name: 'chat',
      component: () => import('./views/message/chat.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (['index', 'home', 'msg', 'my', 'login', 'register'].indexOf(to.name) == -1 && !store.state.isLogin) {
    next('/account/login')
  } else {
    next()
  }
})

export default router