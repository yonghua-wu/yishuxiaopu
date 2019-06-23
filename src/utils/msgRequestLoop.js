import store from '../store.js'
import net from './net.js'
import msgProcess from './msgProcessCenter.js'
import { Toast } from 'vant'

const TIMEOUT = 15000

export default {
  loop: function () {
    let tips = true
    // eslint-disable-next-line
    let lp = setTimeout(function msgLoop() {
      if (!store.state.isLogin) {
        lp = setTimeout(msgLoop, TIMEOUT)
        return
      }
      net.get('/msg').then( res => {
        if (res.data.code == 200) {
          tips = true
          msgProcess.storageMsg(res.data.data)
        } else {
          tips && Toast.fail('服务器异常')
          tips = false
        }
        lp = setTimeout(msgLoop, TIMEOUT)
      }).catch( () => {
        tips && Toast.fail('网络异常')
        tips = false
        lp = setTimeout(msgLoop, TIMEOUT)
      })
    }, TIMEOUT);
  }
}