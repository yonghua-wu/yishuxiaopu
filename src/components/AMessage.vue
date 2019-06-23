<template>
  <div>
    <div class="msg" :class="['msg', sender=='myself' ? 'r-msg' : 'l-msg']">
      <img :src="avatar ? avatar : '/default_avatar.png'" alt="" class="avatar">
      <div class="content">
        <div>
          <div class="time">{{humanTime}}</div>
        </div>
        <div>
          <div class="text">{{msg}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import time from '../utils/time.js'
export default {
  props: {
    sender: String,
    time: String,
    msg: String,
    avatar: String,
  },
  computed: {
    humanTime: function () {
      return time(new Date(this.time))
    }
  }
}
</script>
<style lang="scss" scoped>
.msg {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}
.l-msg {
  .avatar {
    margin-right: 10px;
  }
  .content {
    .text {
      border-top-left-radius: 0px;
    }
  }
}
.r-msg {
  flex-direction: row-reverse;
  .avatar {
    margin-left: 10px;
  }
  .content {
    text-align: right;
    .text {
      border-top-right-radius: 0px;
    }
  }
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 6px;
}
.content {
  width: calc(100% - 100px);
  .time {
    display: inline-block;
    font-size: 12px;
    background-color: #aaa;
    color: #fff;
    padding: 2px 4px;
    border-radius: 12px;
  }
  .text {
    text-align: left;
    box-sizing: border-box;
    border-radius: 15px;
    max-width: 100%;
    display: inline-block;
    background-color: #fff;
    // box-shadow: 0px 0px 2px rgba(0,0,0,0.08);
    border: 1px solid #efefef;
    margin-top: 10px;
    padding: 13px;
    word-wrap:break-word;
  }
}
</style>
