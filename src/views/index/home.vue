<template>
  <div>
    <van-search value="" placeholder="请输入搜索关键词" />
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="swipe-item">轮播图</van-swipe-item>
      <van-swipe-item class="swipe-item">轮播图</van-swipe-item>
    </van-swipe>
    <div class="type-area" @click="more">
      <div class="title">书籍分类</div>
      <van-row type="flex" justify="center">
        <van-col span="6" class="item">小说</van-col>
        <van-col span="6" class="item">历史</van-col>
        <van-col span="6" class="item">推理</van-col>
        <van-col span="6" class="item">旅行</van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="6" class="item">传记</van-col>
        <van-col span="6" class="item">励志</van-col>
        <van-col span="6" class="item" id="tool">工具</van-col>
        <van-col span="6" class="item" id="more">更多</van-col>
      </van-row>
    </div>
    <div class="recommend">
      <div class="title">书籍推荐</div>
      <div class="list">
        <van-col class="item">
          <div class="img">
            <img src="../../assets/img.jpg" alt="">
          </div>
          <div class="book-name">书的名字书的名字书的名字书的名字书的名字书的名字</div>
          <van-row class="book-info" type="flex" justify="space-between">
            <div class="pageviews">浏览：1</div>
            <div class="creat-time">3分钟前</div>
          </van-row>
        </van-col>
        <!-- <van-col class="item">
          <div class="img">
            <img src="../../assets/img.jpg" alt="">
          </div>
          <div class="book-name">书的名字书的名字书的名字书的名字书的名字书的名字</div>
          <van-row class="book-info" type="flex" justify="space-between">
            <div class="pageviews">浏览：1</div>
            <div class="creat-time">3分钟前</div>
          </van-row>
        </van-col> -->
        <van-col class="item">
          <div class="no-more">没有更多了</div>
        </van-col>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    more: function(e) {
      console.log('more',e)
      this.$router.push('/browse/classification')
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe {
  height: 35vw;
}
.swipe-item {
  background-color: #ebedf0;
}
.title {
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 5px;
}
.type-area {
  padding: 20px;
  border-bottom: 1px solid #ebedf0;
  .item {
    height: 50px;
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
    &:active {
      background-color: #f2f3f5;
    }
  }
}
.recommend {
  padding: 20px;
  margin-bottom: 50px;
  .title {
    padding-bottom: 10px;
  }
  .list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    
  }
  .item {
    background-color: #fff;
    border: 1px solid rgba(235, 237, 240, 0.534);
    border-radius: 8px;
    margin-bottom: 10px;
    width: 48%;
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
    .no-more {
      min-height: 80px;
      line-height: 80px;
      text-align: center;
      
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
