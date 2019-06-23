<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
// import net from './utils/net.js'
import msgLoop from './utils/msgRequestLoop.js'
import storage from './utils/storage.js'
export default {
  mounted: function() {
    msgLoop.loop()
    // 从缓存中恢复消息记录
    this.$store.commit('loadMsg', JSON.parse(storage.get('msg')))
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
