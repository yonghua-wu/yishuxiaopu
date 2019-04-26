<template>
  <div>
    <van-col class="item">
      <div class="img">
        <img :src="imgUrl" alt="">
      </div>
      <div class="book-name">{{bookName}}</div>
      <van-row class="book-info" type="flex" justify="space-between">
        <div class="pageviews">浏览：{{pageViews}}</div>
        <div class="create-time">{{createTime}}</div>
      </van-row>
    </van-col>
  </div>
</template>
<script>
export default {
  props: {
    imgUrl: String,
    bookName: String,
    pageViews: Number,
    createTime: String
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
}
.item {
  border-radius: 8px;
  width: 100%;
  .img {
    width: 100%;
    height: 0;
    padding-top: 100%; // 让图片高度等于宽度
    position: relative;
    img {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .book-name {
    margin: 8px 10px;
    font-size: 14px;
    font-weight: 600;
    display: -webkit-box;    
    -webkit-box-orient: vertical;   
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .book-info {
    margin: 0px 10px 8px 10px;
    color: #888;
    font-size: 12px;
  }
}
</style>
