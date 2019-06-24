import Vue from 'vue'
import Vuex from 'vuex'
import storage from './utils/storage.js'

Vue.use(Vuex)

function OtherSideIdIndex(arr, id) {
  for(let i=0; i<arr.length; i++) {
    if (arr[i].otherSideId == id) {
      return i
    }
  }
}

function setStorageMsg(msg) {
  storage.set('msg', JSON.stringify(msg))
}

export default new Vuex.Store({
  state: {
    isLogin: false,
    msg: [],
    homeIndex: 0
  },
  mutations: {
    setLogged: function(state) {
      state.isLogin = true
    },
    setLoginOut: function (state) {
      state.isLogin = false
    },
    // 载入消息记录
    loadMsg: function(state, payload) {
      state.msg = payload
    },
    // 插入消息记录
    setMsgRecord: function (state, payload) {
      if (state.msg == null) {
        state.msg = []
      }
      state.msg.splice(0, 0, payload)
      setStorageMsg(state.msg)
    },
    // 设置主动方书籍id
    setMsgIBookId: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].stage = payload.stage
      state.msg[index].IBookId = payload.IBookId
      setStorageMsg(state.msg)
    },
    // 设置对方选择的地址
    setMsgAddr: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].otherSideAddr = payload.addr
      setStorageMsg(state.msg)
    },
    // 设置stage
    setMsgStage: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].stage = payload.stage
      setStorageMsg(state.msg)
    },
    // 设置聊天记录
    setMsgChatRecord: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      delete payload.otherSideId
      state.msg[index].chatRecord.push(payload)
      setStorageMsg(state.msg)
    },
    setMsgNameAvatar: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      state.msg[index].nickname = payload.nickname
      state.msg[index].avatar = payload.avatar
      setStorageMsg(state.msg)
    },
    closeMsg: function (state, payload) {
      let index = OtherSideIdIndex(state.msg, payload.otherSideId)
      delete state.msg[index]
      setStorageMsg(state.msg)
    },
    setHomeIndex: function(state, payload) {
      state.homeIndex = payload.homeIndex
    }
  }
})
