<template>
  <div>
    <div class="item" v-for="(item) in msgList" v-bind:key="item.otherSideId" @click="$router.push('/msg/chat?id='+item.otherSideId)">
      <div class="header">
        <img :src="item.avatar ? item.avatar : '/default_avatar.png'" alt="">
      </div>
      <div class="content">
        <div class="msg">
          <div class="nickname">{{item.nickname ? item.nickname : '----'}}</div>
          <!-- <div class="text">{{text(index)}}</div> -->
        </div>
        <van-tag class="tag" round type="danger">{{item.count}}</van-tag>
      </div>
    </div>
    <div class="bottomText">暂无更多消息</div>
  </div>
</template>
<script>
export default {
  computed: {
    msgList: function() {
      return this.$store.state.msg
    }
  },
  methods: {
    text: function(index) {
      if (this.msgList[index].msgLog.length == 0) {
        return ' '
      } else {
        for (let i=this.msgList[i].msgLog.length-1; i>=0; i--) {
          if (this.msgList[index].msgLog[i].type == 'text') {
            return this.msgList[index].msgLog[i].msg
          }
        }
        return ' '
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  .header {
    img {
      width: 60px;
      height: 60px;
    }
  }
  .content {
    box-sizing: border-box;
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 60px);
    .msg {
      width: calc(100% - 50px);
      .nickname {
        margin-bottom: 10px;
        color: #333;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 100%;
      }
      .text {
        color: #888;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 100%;
      }
    }
  }
}
.bottomText {
  font-size: 13px;
  color: #555;
  text-align: center;
  padding: 20px 0px 50px 0px;
}
</style>
