import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './utils/storage'
// 使用vantUI
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false

// 缓存中有token，则用户已登录
if (storage.get('token')) {
  store.commit('setLogged')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
