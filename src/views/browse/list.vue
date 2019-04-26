<template>
  <div>
    <div class="main">
      <filter-bar class="top-bar" />
      <book-list class="list" />
    </div>
  </div>
</template>
<script>
import BookList from '../../components/BookList'
import FilterBar from '../../components/FilterBar'
export default {
  components: {
    'book-list': BookList,
    'filter-bar': FilterBar
  }
}
</script>
<style lang="scss" scoped>
.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.list {
  margin: 50px 20px 20px 20px;
}
</style>
