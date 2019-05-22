<template>
  <div>
    <div class="item">
      <div class="header">
        <img src="/default_avatar.png" alt="">
      </div>
      <div class="content">
        <div class="msg">
          <div class="nickname">昵称</div>
          <div class="text">消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息</div>
        </div>
        <van-tag class="tag" round type="danger">3</van-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
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
    .tag {
      height: 18px;
    }
  }
}
</style>
