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
    addMsg: function (state, paload) {
      /**
       * paload 的数据结构
       * {
       *   otherSideId: x, 对方的id
       *   sendTime: "2019-05-25 13:30:19", 发送时间
       *   type: "", 类型
       *   msg: "", 消息体
       *   sender: "otherSide" | "myself" 发送者
       * }
       */
      let i=0
      for (; i<state.msg.length; i++) {
        if (state.msg[i].otherSideId == paload.otherSideId) {
          break;
        }
      }
      if (i >= state.msg.length) { //当缓存中没有对方的id时
        let aMsg = {  //创建一条新的记录
          otherSideId: paload.otherSideId,  //对方的id
          avatar: '',  // 头像
          nickname: '',  // 昵称
          count: 1,  // 未读消息数
          stage: 0,  // 交易状态（0：未发起交易，1发起交易还未确认，2确认交易）
          msgLog: [  // 聊天记录
            {
              sendTime: paload.sendTime,  //消息发送的时间
              type: paload.type,  // 消息类型
              msg: paload.msg,  // 消息体
              sender: paload.sender  // 发送者
            }
          ]
        }
        state.msg.splice(0, 0, aMsg) // 添加到数组的开头
      } else {  // 当缓存中有记录时
        state.msg[i].count++  // 未读消息数加一
        state.msg[i].msgLog.push(paload)  // 添加聊天记录
      }
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
              sender: payload.sender  // 发送者
            }
          ]
        }
        net.get('/users/id?id=' + payload.otherSideId).then( res => {
          if (res.data.code == 200) {
            aMsg.avatar = res.data.data.headPortrait
            aMsg.nickname = res.data.data.userName
          }
          context.state.msg.splice(0, 0, aMsg) // 添加到数组的开头
        }).catch( () => {
          context.state.msg.splice(0, 0, aMsg) // 添加到数组的开头
        })
      } else {  // 当缓存中有记录时
        context.state.msg[i].count++  // 未读消息数加一
        context.state.msg[i].msgLog.push(payload)  // 添加聊天记录
      }
    }
  }
})
