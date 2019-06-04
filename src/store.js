import Vue from 'vue'
import Vuex from 'vuex'
import net from './utils/net.js'
Vue.use(Vuex)

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
    setNewMsg: function(state, payload) { // 插入新的消息，在没有消息记录时
      state.msg.splice(0, 0, payload)
    },
    setNewMsgNameAvatar: function (state, payload) { // 插入获取到的头像、昵称信息
      for(let i=0; i<state.msg.length; i++) {
        if (state.msg[i].otherSideId == payload.otherSideId) {
          state.msg[i].avatar = payload.avatar
          state.msg[i].nickname = payload.nickname
        }
      }
    },
    setMsg: function (state, payload) { // 插入消息，在已有消息记录的情况下
      let index = payload.index
      delete payload.index
      state.msg[index].count++
      state.msg[index].msgLog.push(payload)
    }
  },
  actions: {
    addMsg: function (context, payload) {
      let i=0
      for (; i<context.state.msg.length; i++) {
        if (context.state.msg[i].otherSideId == payload.otherSideId) {
          break;
        }
      }
      if (i >= context.state.msg.length) { //当缓存中没有对方的id时
        let aMsg = {  //创建一条新的记录
          otherSideId: payload.otherSideId,  //对方的id
          avatar: '',  // 头像
          nickname: '',  // 昵称
          count: 1,  // 未读消息数
          stage: 0,  // 交易状态（0：未发起交易，1发起交易还未确认，2确认交易）
          msgLog: [  // 聊天记录
            {
              sendTime: payload.sendTime,  //消息发送的时间
              type: payload.type,  // 消息类型
              msg: payload.msg,  // 消息体
              sender: payload.sender  // 发送者 otherSide myself
            }
          ]
        }
        context.commit('setNewMsg', aMsg) // 先提交基本信息，再请求头像、昵称信息。保证相同的id不插入多条消息
        net.get('/users/id?id=' + payload.otherSideId).then( res => {
          if (res.data.code == 200) {
            aMsg.avatar = res.data.data.headPortrait
            aMsg.nickname = res.data.data.userName
            let payload = {
              otherSideId: aMsg.otherSideId,
              avatar: res.data.data.headPortrait,
              nickname: res.data.data.userName
            }
            context.commit('setNewMsgNameAvatar', payload)
          }
        })
      } else {  // 当缓存中有记录时
        payload.index = i
        context.commit('setMsg', payload)
      }
    }
  }
})
