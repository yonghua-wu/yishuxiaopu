<template>
  <div>
    <div class="seller-bar">
      <img src="../../assets/img.jpg" alt="">
      <div class="userinfo">
        <div class="nickname">昵称</div>
        <div class="other">
          <div class="identity">学生党</div>
          <div class="city">郴州</div>
        </div>
      </div>
      <div class="right">
        <van-button type="danger" size="small">我想要</van-button>
      </div>
    </div>
    <div class="book-info">
      <div class="title">书的名字</div>
      <div class="discription">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</div>
      <div class="imgs">
        <img src="../../assets/img.jpg" alt="">
        <img src="../../assets/img.jpg" alt="">
        <img src="../../assets/img.jpg" alt="">
      </div>
      <div class="time">发布于：5小时前</div>
    </div>
  </div>
</template>
<script>
export default {
  mounted: function() {
    // eslint-disable-next-line
    console.log(this.$route.params.id)
  }
}
</script>
<style lang="scss" scoped>
.seller-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.1);
  img {
    margin: 0px 10px 0px 20px;
    border-radius: 3px;
    width: 45px;
    height: 45px;
  }
  .userinfo {
    flex: 1;
    .nickname {
      font-size: 15px;
      font-weight: bold;
    }
    .other{
      display: flex;
      flex-direction: row;
      & > * {
        padding-right: 10px;
        color: #888;
      }
    }
  }
  .right {
    padding-right: 20px;
  }
}
.book-info {
  padding: 15px 15px 70px 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebedf0;
  }
  .discription {
    padding: 10px 0px;
    font-size: 15px;
    line-height: 24px;
  }
  .imgs {
    img {
      width: 100%;
    }
  }
  .time {
    padding-top: 10px;
    font-size: 12px;
    color: #888;
  }
}
</style>
