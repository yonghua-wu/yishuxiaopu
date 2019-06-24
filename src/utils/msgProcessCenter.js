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
            store.commit('setMsgChatRecord', {
              otherSideId: msg[i].sendId,
              sender: 'system',
              sendTime: msg[i].sendTime,
              msg: '对方选择了与你交易的图书，请尽快处理'
            })
            break
          case 4:
            addr = JSON.parse(msg[i].msg).address
            store.commit('setMsgAddr', {
              otherSideId: msg[i].sendId,
              addr: addr
            })
            store.commit('setMsgChatRecord', {
              otherSideId: msg[i].sendId,
              sender: 'otherSide',
              sendTime: msg[i].sendTime,
              msg: '收件人：' + addr.receiver + '。联系方式：' + addr.receiverTel + '。地址：' + addr.address + '。'
            })
            break
          case 2:
              store.commit('setMsgStage', {
                otherSideId: msg[i].sendId,
                stage: 0
              })
              store.commit('setMsgChatRecord', {
                otherSideId: msg[i].sendId,
                sender: 'system',
                sendTime: msg[i].sendTime,
                msg: '对方拒绝了你的图书，请重新选择'
              })
              break
          case 3:
            store.commit('setMsgStage', {
              otherSideId: msg[i].sendId,
              stage: stage
            })
            store.commit('setMsgChatRecord', {
              otherSideId: msg[i].sendId,
              sender: 'system',
              sendTime: msg[i].sendTime,
              msg: '对方同意交易，请选择你的地址'
            })
            for (let i = 0; i<store.state.msg.length; i++) {
              if (store.state.msg[i].otherSideId == msg[i].sendId) {
                // 请求交易接口
                net.post('/trading?bookId='+ store.state.msg[i].IBookId +'&buyId='+ store.state.msg[i].otherSideId)
                break
              }
            }
            break
        }
      } else if (msg[i].type == 'text') {
        let chatRecord = {
          otherSideId: msg[i].sendId,
          sender: 'otherSide',
          sendTime: msg[i].sendTime,
          msg: JSON.parse(msg[i].msg)
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
            net.get('/users/id?id=' + msg.receiveId).then( res => {
              if (res.data.code == 200) {
                store.commit('setMsgNameAvatar', {
                  otherSideId: msg.receiveId,
                  nickname: res.data.data.userName,
                  avatar: res.data.data.headPortrait
                })
              }
            })
          } else if (msg.type == 'transaction') {
            switch(msg.msg.stage) {
              case 1:
                  store.commit('setMsgIBookId', {
                    otherSideId: msg.receiveId,
                    stage: 1,
                    IBookId: msg.msg.bookId
                  })
                  store.commit('setMsgChatRecord', {
                    otherSideId: msg.receiveId,
                    sender: 'system',
                    sendTime: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
                    msg: '等待对方同意'
                  })
                  break
              case 2:
                store.commit('setMsgIBookId', {
                  otherSideId: msg.receiveId,
                  stage: 0,
                  IBookId: msg.msg.bookId
                })
                store.commit('setMsgChatRecord', {
                  otherSideId: msg.receiveId,
                  sender: 'system',
                  sendTime: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
                  msg: '你拒绝了对方的图书，等待对方重新选择'
                })
                break
              case 3:
                store.commit('setMsgStage', {
                  otherSideId: msg.receiveId,
                  stage: 3
                })
                store.commit('setMsgChatRecord', {
                  otherSideId: msg.receiveId,
                  sender: 'system',
                  sendTime: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
                  msg: '同意交易，请选择你的地址'
                })
                break
              case 4:
                store.commit('setMsgStage', {
                  otherSideId: msg.receiveId,
                  stage: 4
                })
                store.commit('setMsgChatRecord', {
                  otherSideId: msg.receiveId,
                  sender: 'myself',
                  sendTime: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
                  msg: '收件人：' + msg.msg.address.receiver + '。联系方式：' + msg.msg.address.receiverTel + '。地址：' + msg.msg.address.address + '。'
                })
                store.commit('setMsgChatRecord', {
                  otherSideId: msg.receiveId,
                  sender: 'system',
                  sendTime: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
                  msg: '交易完成'
                })
                break
            }
          } else if (msg.type == 'text') {
            let chatRecord = {
              otherSideId: msg.receiveId,
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