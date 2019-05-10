import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    setLogged: function(state) {
      state.isLogin = true
    },
    setLoginOut: function (state) {
      state.isLogin = false
    }
  },
  actions: {

  }
})
