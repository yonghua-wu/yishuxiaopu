<template>
  <div class="home">
    <router-view/>
    <van-tabbar v-model="active" @change="tabbar()">
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
  mounted: function(){
    if (this.$route.path == '/') {
      this.$router.push('/home')
    }
  },
  methods: {
    tabbar: function() {
      switch(this.active) {
        case 0:
          this.$router.replace('/home')
          break
        case 1:
          this.$router.replace('/msg')
          break
        case 2:
          this.$router.replace('/my')
          break
      }
    }
  },
  computed: {
  },
  watch: {
    '$route.path': function () {
      if(this.$route.path == '/') {
        this.$router.push('home')
        this.active = 0
      } else if(this.$route.path == '/home') {
        this.active = 0
      } else if(this.$route.path == '/msg') {
        this.active = 1
      } else if(this.$route.path == '/my') {
        this.active = 2
      }
    }
  }
}
</script>
