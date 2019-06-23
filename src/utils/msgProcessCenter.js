import store from '../store.js'
import net from './net.js'

export default {
  /**
   * 保存消息
   * @param {Array} msg 消息数组
   */
  storageMsg: function (msg) {
    for (let i=0; i<msg.length; i++) {
      if (msg[i].type == 'create') {
        let storeMsg = {
          PBookId: JSON.parse(msg[i].msg).bookId, // 主动方看中的书籍id
          bookHost: true, // 当前用户是否为书主
          IBookId: null, // 主动方的书籍id
          otherSideId: msg[i].sendId, // 对方的用户id
          stage: 0, // 交易状态
          otherSideAddr: null, // 地址
          avatar: '', // 头像
          nickname: '', // 昵称
          chatRecord: [], // 聊天记录
          count: 1 // 未读消息数
        }
        store.commit('setMsgRecord', storeMsg)
      } else if (msg[i].type == 'transaction') {
        let stage = JSON.parse(msg[i].msg).stage
        let addr
        switch (stage) {
          case 1:
            store.commit('setMsgIBookId', {
              otherSideId: msg[i].sendId,
              stage: 1,
              IBookId: JSON.parse(msg[i].msg).bookId
            })
            break
          case 4:
            addr = JSON.parse(msg[i].msg).address
            store.commit('setMsgAddr', {
              otherSideId: msg[i].sendId,
              stage: 4,
              addr: addr
            })
            store.commit('setMsgChatRecord', {
              sender: 'otherSide',
              sendTime: msg[i].sendTime,
              msg: "收件人：${addr.receiver}\n联系方式：${addr.receiverTel}\n地址：${addr.address}"
            })
            break
          case 2:
              store.commit('setMsgStage', {
                otherSideId: msg[i].sendId,
                stage: 0
              })
              break
          case 3:
            store.commit('setMsgStage', {
              otherSideId: msg[i].sendId,
              stage: stage
            })
            break
        }
      } else if (msg[i].type == 'text') {
        let chatRecord = {
          sender: 'otherSide',
          sendTime: msg[i].sendTime,
          msg: msg[i].msg
        }
        store.commit('setMsgChatRecord', chatRecord)
      }
    }
  },

  /**
   * 发送消息
   */
  sendMsg: function (msg) {
    return new Promise( (resolve, reject) => {
      net.post('msg', {
        type: msg.type,
        receiveId: msg.receiveId,
        msg: JSON.stringify(msg.msg)
      }).then( res => {
        if (res.data.code == 200) {
          if (msg.type == 'create') {
            let storeMsg = {
              PBookId: msg.msg.bookId, // 主动方看中的书籍id
              bookHost: false, // 当前用户是否为书主
              IBookId: null, // 主动方的书籍id
              otherSideId: msg.receiveId, // 对方的用户id
              stage: 0, // 交易状态
              otherSideAddr: null, // 地址
              avatar: '', // 头像
              nickname: '', // 昵称
              chatRecord: [], // 聊天记录
              count: 0 // 未读消息数
            }
            store.commit('setMsgRecord', storeMsg)
            msg.msg = JSON.stringify(msg.msg)
          } else if (msg.type == 'transaction') {
            switch(msg.msg.stage) {
              case 1:
                  store.commit('setMsgIBookId', {
                    otherSideId: msg.receiveId,
                    stage: 1,
                    IBookId: msg.msg.bookId
                  })
                  break
              case 2:
                store.commit('setMsgIBookId', {
                  otherSideId: msg.receiveId,
                  stage: 0,
                  IBookId: msg.msg.bookId
                })
                break
              case 3:
                store.commit('setMsgStage', {
                  otherSideId: msg.receiveId,
                  stage: 3
                })
                break
              case 4:
            }
            msg.msg = JSON.stringify(msg.msg)
          } else if (msg.type == 'text') {
            let chatRecord = {
              sender: 'myself',
              sendTime: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
              msg: msg.msg
            }
            store.commit('setMsgChatRecord', chatRecord)
          }
          resolve()
        } else {
          reject()
        }
      }).catch( () => {
        reject()
      })
    })
  }
}