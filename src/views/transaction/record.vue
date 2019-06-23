<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="发布中">
        <book-list class="list" :list="transactionBooks"/>
      </van-tab>
      <van-tab title="已交易">
        <book-list class="list" :list="completeBooks"/>
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
      transactionBooks: [],
      completeBooks: []
    }
  },
  mounted: function () {
    this.$toast.loading('加载中')
    net.get('/books/user?state=fail').then( res => {
      if (res.data.code == 200) {
        this.$toast.clear()
        this.transactionBooks = res.data.data
      } else {
        this.$toast.fail('服务器异常')
      }
    }).catch( () => {
      this.$toast.fail('网络异常')
    })
    net.get('/books/user?state=success').then( res => {
      if (res.data.code == 200) {
        this.$toast.clear()
        this.completeBooks = res.data.data
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
