<template>
  <div>
    <div class="title">分类浏览</div>
    <div class="container">
      <van-row class="row">
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
      </van-row>
      <van-row class="row">
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
      </van-row>
      <van-row class="row">
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
      </van-row>
      <van-row class="row">
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
        <van-col span="8" class="item">类目</van-col>
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
    &:nth-child(2n) {
      background-color: #fafafa;
    }
  }
}
</style>
