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
          let addreses = res.data.data.addreses
          for (let i=0; i<addreses.length; i++) {
            this.list.push({
              id: addreses[i].id,
              name: addreses[i].receiver,
              tel: addreses[i].receiverTel,
              address: addreses[i].province + addreses[i].city + addreses[i].area + addreses[i].detailedAddress,
              areaCode: addreses[i].zipCode,
              addressDetail: addreses[i].detailedAddress
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
