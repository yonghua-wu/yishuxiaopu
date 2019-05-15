<template>
  <div class="list">
    <book-item
      class="item"
      v-for="(item, index) in list"
      :key="index"
      :imgUrl="item.img"
      :bookName="item.name"
      :pageViews="item.views"
      :createTime="item.createTime"
      @click.native="$emit('touch-item', item.id)"
    />
    <van-col class="item">
      <div class="no-more">没有更多了</div>
    </van-col>
  </div>
</template>
<script>
import BookItem from './BookListItem.vue'
export default {
  props: {
    list: Array
  },
  components: {
    'book-item': BookItem
  }
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
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
