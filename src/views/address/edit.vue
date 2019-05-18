<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-delete
      show-search-result
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import area from '../../lib/area.js'
import net from '../../utils/net.js'
export default {
  data: function () {
    return {
      areaList: area,
      addressInfo: {
        name: '',
        tel: '',
        addressDetail: '',
        areaCode: '',
      },
      isEdit: false
    }
  },
  mounted: function () {
    if (this.$route.query.id) {
      this.addressInfo = this.$route.query
      this.isEdit = true
    }
  },
  methods: {
    onSave(e) {
      let data = {
        receiver: e.name,
        receiverTel: e.tel,
        country: '中国',
        province: e.province,
        city: e.city,
        zipCode: e.areaCode,
        area: e.county,
        detailedAddress: e.addressDetail,
      }
      if (this.isEdit) {
        data.id = this.$route.query.id
        net.patch('/addresses', data).then( res => {
          if (res.data.code == 200) {
            this.$toast.success('修改成功')
            this.$router.go(-1)
          } else {
            this.$toast.fail('网络异常')
          }
        }).catch( () => {
          this.$toast.fail('网络异常')
        })
      } else {
        net.post('/addresses', data).then( res => {
          if (res.data.code == 200) {
            this.$toast.success('已添加')
            this.$router.go(-1)
          } else {
            this.$toast.fail('网络异常')
          }
        }).catch( () => {
          this.$toast.fail('网络异常')
        })
      }
    },
    onDelete() {
      if (this.$route.query.id) {
        net.delete('/addresses',{
          params: {
            id: this.$route.query.id
          }
        }).then( res => {
          if (res.data.code == 200) {
            this.$toast.success('已删除')
            this.$router.go(-1)
          } else {
            this.$toast.fail('网络异常')
          }
        }).catch( () => {
          this.$toast.fail('网络异常')
        })
      } else {
        this.$router.go(-1)
      }
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
