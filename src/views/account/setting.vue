<template>
  <div>
    <div class="title">账号设置</div>
    <van-cell title="修改密码" is-link to="/account/reset-password"/>
    <van-cell title="退出登陆" is-link @click="signOut" />
  </div>
</template>
<script>
export default {
  methods: {
    signOut: function() {
      this.$dialog.confirm({
        title: '退出登陆',
        message: '你真的想退出登陆吗？'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  padding: 15px 20px;
}
</style>
