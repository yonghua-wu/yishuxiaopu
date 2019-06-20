<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="发布中">
        <book-list class="list" :list="transaction" @touch-item="$router.push('/transaction/edit/' + $event)"/>
      </van-tab>
      <van-tab title="已交易">
        <book-list class="list" :list="complete" @touch-item="$router.push('/transaction/edit/' + $event)"/>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import net from '../../utils/net.js'
import BookList from '../../components/BookList'
export default {
  components: {
    'book-list': BookList
  },
  data: function () {
    return {
      active: 0,
      books: []
    }
  },
  computed: {
    transaction: function () {
      return this.books.filter(function (item) {
        return item.state == 'transaction'
      })
    },
    complete: function () {
      return this.books.filter(function (item) {
        return item.state == 'complete'
      })
    }
  },
  mounted: function () {
    net.get('/books/user').then( res => {
      if (res.data.code == 200) {
        this.books = res.data.data
      } else {
        this.$toast.fail('服务器异常')
      }
    }).catch( () => {
      this.$toast.fail('网络异常')
    })
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.list {
  padding: 15px;
}
</style>
