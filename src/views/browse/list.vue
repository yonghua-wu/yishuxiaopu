<template>
  <div>
    <div class="main">
      <filter-bar class="top-bar" />
      <book-list class="list" :list="list" @touch-item="$router.push('/browse/details/' + $event)"/>
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
  },
  data: function() {
    return {
      list: [
        {
          id: 1,
          img: '',
          name: '书名',
          views: 1,
          create_time: '3分钟前',
        },{
          id: 2,
          img: '',
          name: '书名',
          views: 1,
          create_time: '3分钟前',
        },
      ]
    }
  },
  mounted: function () {
    
  },
  methods: {
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
