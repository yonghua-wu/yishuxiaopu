<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
// import net from './utils/net.js'
import msgLoop from './utils/msgRequestLoop.js'
export default {
  mounted: function() {
    msgLoop.loop()
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
