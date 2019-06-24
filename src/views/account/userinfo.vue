<template>
  <div>
    <div class="title">个人信息</div>
    <van-uploader class="upload" :after-read="after" :max-size="2097152" @oversize="oversize">
      <van-cell title="头像" center>
        <img class="avatar-img" :src="avatar" alt="">
      </van-cell>
    </van-uploader>
    <van-cell title="昵称" :value="userInfo.userName" is-link @click="showSetNickname = !showSetNickname" />
    <van-cell title="手机号" :value="userInfo.phone" />
    <van-cell title="性别" :value="userInfo.gender" is-link @click="showSetGender = !showSetGender" />
    <van-cell title="城市" :value="userInfo.city" is-link @click="showSetCity = !showSetCity" />
    <van-cell title="职业状态" :value="userInfo.identity" is-link @click="showSetIdentity = !showSetIdentity" />
    <van-dialog
      v-model="showSetNickname"
      @confirm="setNickname"
      @cancel="newName = ''"
      show-cancel-button
    >
      <input type="text" placeholder="输入昵称" maxlength="10" v-model="newName">
    </van-dialog>
    <van-actionsheet
      v-model="showSetGender"
      :actions="[{name: '女'},{name: '男'},{name: '保密'}]"
      cancel-text="取消"
      @select="setGender"
    />
    <van-popup v-model="showSetCity" position="bottom" :overlay="true">
      <van-area :area-list="areaList" :columns-num="2" @confirm="setCity" @cancel="showSetCity = false" title="标题" />
    </van-popup>
    <van-actionsheet
      v-model="showSetIdentity"
      :actions="[{name: '学生党'},{name: '上班族'},{name: '其他'}]"
      cancel-text="取消"
      @select="setIdentity"
      
    />
  </div>
</template>
<script>
import area from '../../lib/area.js'
import storage from '../../utils/storage.js'
import net from '../../utils/net.js'
import config from '../../utils/config.js'
export default {
  data: function() {
    return {
      showSetNickname: false,
      showSetGender: false,
      showSetCity: false,
      showSetIdentity: false,
      areaList: area,
      newName: '',
      newGender: '',
      newCity: '',
      newIdentity: '',
      userInfo: {}
    }
  },
  computed: {
    avatar: function () {
      if (!this.userInfo.headPortrait) {
        return '/default_avatar.png'
      } else if (this.userInfo.headPortrait.length < 37) {
        return config.STATIC + this.userInfo.headPortrait
      } else {
        return this.userInfo.headPortrait
      }
    }
  },
  mounted: function () {
    this.userInfo = JSON.parse(storage.get('userInfo'))
  },
  methods: {
    setNickname: function() {
      this.confirm('userName', this.newName)
    },
    setGender: function(e) {
      this.showSetGender = false
      this.confirm('gender', e.name)
    },
    setCity: function(e) {
      this.showSetCity = false
      let city = e[1]?e[1].name:e[0].name
      this.confirm('city', city)
    },
    setIdentity: function(e) {
      this.showSetIdentity = false
      this.confirm('identity', e.name)
    },
    confirm: function (key, value) {
      this.$toast.loading('修改中')
      let data = {}
      data[key] = value
      net.patch('/users', data).then( res => {
        if (res.data.code == 200) {
          if (key != 'headPortrait' ) {
            this.userInfo[key] = value
          }
          storage.set('userInfo', JSON.stringify(this.userInfo))
          this.$toast.success('修改成功')
        } else {
          this.$toast.fail('修改失败')
        }
      }).catch( () => {
        this.$toast.fail('修改失败')
      })
    },
    after: function(file) {
      this.userInfo.headPortrait = file.content
      let data = new FormData
      data.append('file', file.file)
      this.$toast.loading('上传头像中')
      net.post('/upload', data).then( res => {
        if (res.data.code == 200) {
          this.$toast.clear()
          this.confirm('headPortrait', res.data.data)
        } else {
          this.$toast.fail('头像上传失败')
        }
      }).catch( () => {
        this.$toast.fail('头像上传失败')
      })
    },
    oversize: function() {
      this.$dialog.alert({
        title: '提示',
        message: '不能上传大小超过2M的图片'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  padding: 15px 20px;
}
.avatar-img {
  width: 30px;
  height: 30px;
}
input {
  box-sizing: border-box;
  margin: 50px 0px;
  text-align: center;
  width: 100%;
  border: 0px;
}
.upload {
  width: 100%;
}
</style>
