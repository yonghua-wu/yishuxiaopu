<template>
  <div>
    <van-search value="" placeholder="请输入搜索关键词" />
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="swipe-item">轮播图</van-swipe-item>
      <van-swipe-item class="swipe-item">轮播图</van-swipe-item>
    </van-swipe>
    <div class="type-area">
      <div class="title">书籍分类</div>
      <van-row type="flex" justify="center">
        <van-col span="6" class="item" @click.native="$router.push('/browse/list/classification/0')">小说</van-col>
        <van-col span="6" class="item" @click.native="$router.push('/browse/list/classification/2')">艺术</van-col>
        <van-col span="6" class="item" @click.native="$router.push('/browse/list/classification/4')">哲学</van-col>
        <van-col span="6" class="item" @click.native="$router.push('/browse/list/classification/6')">美食</van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="6" class="item" @click.native="$router.push('/browse/list/classification/8')">旅行</van-col>
        <van-col span="6" class="item" @click.native="$router.push('/browse/list/classification/10')">科技</van-col>
        <van-col span="6" class="item" @click.native="$router.push('/browse/list/classification/12')">教育</van-col>
        <van-col span="6" class="item" @click.native="$router.push('/browse/classification')">更多</van-col>
      </van-row>
    </div>
    <div class="recommend">
      <div class="title">书籍推荐</div>
      <book-list />
    </div>
  </div>
</template>
<script>
import BookList from '../../components/BookList.vue'
export default {
  components: {
    'book-list': BookList
  },
  methods: {
    
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
    border-radius: 8px;
    margin-bottom: 10px;
    width: 48%;
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
