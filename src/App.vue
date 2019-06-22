<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import net from './utils/net.js'
export default {
  mounted: function() {
    // this.$store.dispatch('createMsg', {
    //   otherSideId: 10,
    //   sendTime: "2019-05-25 13:30:19",
    //   type: "text",
    //   msg: "123",
    //   sender: "otherSide",
    //   booksHost: true,
    //   bookId: 233
    // })
    let that = this
    let tipsErr = true
    // eslint-disable-next-line
    // let loop = setTimeout(function msgLoop() {
    //   if ( ! that.$store.state.isLogin) {
    //     loop = setTimeout(msgLoop, 8000)
    //     return
    //   }
    //   net.get('/msg').then( res => {
    //     if (res.data.code == 200) {
    //       tipsErr = true
    //       for (let i=0, payload; i<res.data.data.length; i++) {
    //         payload = {
    //           otherSideId: res.data.data[i].sendId
    //         }
    //         if (res.data.data[i].type == 'create') { // 创建消息
    //           payload.bookId = (JSON.parse(res.data.data[i].msg)).bookId
    //           payload.booksHost = true
    //           that.$store.dispatch('createMsg', payload)
    //         } else { // 添加消息记录
    //           payload.msg = res.data.data[i].msg
    //           payload.sendTime = res.data.data[i].sendTime
    //           payload.type = res.data.data[i].type
    //           payload.sender = 'otherSide'
    //           that.$store.dispatch('addMsg', payload)
    //         }
    //       }
    //     } else {
    //       if (tipsErr) {
    //         tipsErr = false
    //         that.$toast('网络异常')
    //       }
    //     }
    //     loop = setTimeout(msgLoop, 15000)
    //   }).catch( () => {
    //     if (tipsErr) {
    //       tipsErr = false
    //       that.$toast('网络异常')
    //     }
    //     loop = setTimeout(msgLoop, 15000)
    //   })
    // }, 15000)
  }
}
</script>

<style>
body {
  color: #323233;
  font-size: 14px;
  background-color: #f8f8f8;
}
p {
  padding: 0px;
  margin: 0px;
}
</style>
