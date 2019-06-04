<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import net from './utils/net.js'
export default {
  mounted: function() {
    this.$store.dispatch('addMsg', {
      otherSideId: 10,
      sendTime: "2019-05-25 13:30:19",
      type: "text",
      msg: "123",
      sender: "otherSide"
    })
    this.$store.dispatch('addMsg', {
      otherSideId: 10,
      sendTime: "2019-05-25 13:30:19",
      type: "text",
      msg: "456",
      sender: "myself"
    })
    let that = this
    let tipsErr = true
    // eslint-disable-next-line
    let loop = setTimeout(function msgLoop() {
      if ( ! that.$store.state.isLogin) {
        loop = setTimeout(msgLoop, 8000)
        return
      }
      net.get('/msg').then( res => {
        if (res.data.code == 200) {
          tipsErr = true
          for (let i=0, payload; i<res.data.data.length; i++) {
            payload = res.data.data[i]
            payload.sender = 'otherSide'
            that.$store.dispatch('addMsg', payload)
          }
        } else {
          if (tipsErr) {
            tipsErr = false
            that.$toast('网络异常')
          }
        }
        loop = setTimeout(msgLoop, 8000)
      }).catch( () => {
        if (tipsErr) {
          tipsErr = false
          that.$toast('网络异常')
        }
        loop = setTimeout(msgLoop, 8000)
      })
    }, 8000)
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
