<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="发布中">发布中</van-tab>
      <van-tab title="已交易">已交易</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
