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
import net from '../../utils/net.js'
export default {
  components: {
    'book-list': BookList,
    'filter-bar': FilterBar
  },
  data: function() {
    return {
      list: []
    }
  },
  mounted: function () {
    this.$toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: false,
      message: '加载中...'
    })
    switch(this.$route.params.type) {
      case 'classification':
        net.get('/books/type', { 
          params: {
            type: this.$route.params.value 
          }
        }).then( res => {
          this.list = res.data.data.books
          this.$toast.clear()
        }).catch( () => {
          this.$toast.clear()
          this.$toast.fail('网络异常')
        })
        break
      case 'seach':
        break
      default:
        this.$router.push('/browse/classification')
    }
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
