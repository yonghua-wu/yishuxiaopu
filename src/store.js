import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexActive: 0
  },
  mutations: {
    setIndexActive: function(state, payload) {
      state.indexActive = payload
    }
  },
  actions: {

  }
})
