import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function OtherSideIdIndex(arr, id) {
  for(let i=0; i<arr.length; i++) {
    if (arr[i].otherSideId == id) {
      return i
    }
  }
}

export default new Vuex.Store({
  state: {
    isLogin: false,
    msg: []
  },
  mutations: {
    setLogged: function(state) {
      state.isLogin = true
    },
    setLoginOut: function (state) {
      state.isLogin = false
    },
    // 插入消息记录
    setMsgRecord: function (state, payload) {
      state.msg.splice(0, 0, payload)
    },
    // 设置主动方书籍id
    setMsgIBookId: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].stage = payload.stage
      state.msg[index].IBookId = payload.IBookId
    },
    // 设置对方选择的地址
    setMsgAddr: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].stage = payload.stage
      state.msg[index].otherSideAddr = payload.addr
    },
    // 设置stage
    setMsgStage: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].stage = payload.stage
    },
    // 设置聊天记录
    setMsgChatRecord: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].chatRecord.push(payload)
    },
  }
})
