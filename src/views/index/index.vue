<template>
  <div class="home">
    <router-view/>
    <van-tabbar v-model="active" :change="tabbar()">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">消息</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: 0
    }
  },
  methods: {
    tabbar: function() {
      switch(this.active) {
        case 0:
          this.$router.push('home')
          break
        case 1:
          this.$router.push('msg')
          break
        case 2:
          this.$router.push('my')
          break
      }
    }
  }
}
</script>
