<template>
  <div>
    <van-address-list
      :list="list"
      :switchable="false"
      @add="$router.push('/address/edit')"
      @edit="onEdit"
    />
  </div>
</template>
<script>
import net from '../../utils/net'
export default {
  data: function () {
    return {
      list: []
    }
  },
  mounted: function () {
    this.getAllAddr()
  },
  methods: {
    getAllAddr: function() {
      net.get('/addresses').then( res => {
        if (res.data.code == 200) {
          let addresses = res.data.data.addresses
          for (let i=0; i<addresses.length; i++) {
            this.list.push({
              id: addresses[i].id,
              name: addresses[i].receiver,
              tel: addresses[i].receiverTel,
              address: addresses[i].province + addresses[i].city + addresses[i].area + addresses[i].detailedAddress,
              areaCode: addresses[i].zipCode,
              addressDetail: addresses[i].detailedAddress
            })
          }
        } else {
          this.$toast.fail('网络异常')
        }
      }).catch( () => {
        this.$toast.fail('网络异常')
      })
    },
    onEdit: function (e) {
      this.$router.push({
        path: '/address/edit',
        query: {
          id: e.id,
          name: e.name,
          tel: e.tel,
          areaCode: e.areaCode,
          addressDetail: e.addressDetail
        } 
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
