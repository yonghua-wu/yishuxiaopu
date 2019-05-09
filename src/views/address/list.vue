<template>
  <div>
    <van-address-list
      :list="list"
      :switchable="false"
      @add="$router.push('/address/add')"
      @edit="onEdit"
    />
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
  },
  methods: {
    onEdit: function (e) {
      // eslint-disable-next-line
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
