<template>
  <div>
    <div class="log-area">
      <a-message />
    </div>
    <div class="control-area">123</div>
  </div>
</template>
<script>
import AMessage from '../../components/AMessage'
export default {
  components: {
    'a-message': AMessage
  }
}
</script>
<style lang="scss" scoped>
.log-area {
  margin-bottom: 60px;
}
.control-area {
  position: fixed;
  bottom: 0px;
  height: 80px;
  width: 100%;
  background-color: #fff;
}
</style>
