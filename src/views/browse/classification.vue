<template>
  <div>
    <div class="title">分类浏览</div>
    <div class="container">
      <van-row class="row">
        <van-col span="8" class="item">小说</van-col>
        <van-col span="8" class="item">传记</van-col>
        <van-col span="8" class="item">艺术</van-col>
      </van-row>
      <van-row class="row">
        <van-col span="8" class="item">漫画</van-col>
        <van-col span="8" class="item">哲学</van-col>
        <van-col span="8" class="item">励志</van-col>
      </van-row>
      <van-row class="row">
        <van-col span="8" class="item">美食</van-col>
        <van-col span="8" class="item">保健</van-col>
        <van-col span="8" class="item">旅行</van-col>
      </van-row>
      <van-row class="row">
        <van-col span="8" class="item">经管</van-col>
        <van-col span="8" class="item">科技</van-col>
        <van-col span="8" class="item">计算机</van-col>
      </van-row>
      <van-row class="row">
        <van-col span="8" class="item">教育</van-col>
        <van-col span="8" class="item">工具</van-col>
        <van-col span="8" class="item">期刊</van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.title {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}
.container {
  padding: 20px;
  .row {
    border-bottom: 1px solid #ebedf0;
    .item {
      text-align: center;
      height: 80px;
      line-height: 80px;
      border-right: 1px solid #ebedf0;
      &:last-child {
        border-right: 0px;
      }
    }
    &:last-child {
      border-bottom: 0px;
    }
    // &:nth-child(2n) {
    //   background-color: #fafafa;
    // }
  }
}
</style>
