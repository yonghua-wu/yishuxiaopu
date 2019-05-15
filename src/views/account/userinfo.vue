<template>
  <div>
    <div class="title">个人信息</div>
    <van-cell title="头像" center>
      <img class="avatar-img" :src="userInfo.headPortrait ? userInfo.headPortrait : '/default_avatar.png'" alt="">
    </van-cell>
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
  mounted: function () {
    this.userInfo = JSON.parse(storage.get('userInfo'))
  },
  methods: {
    setNickname: function() {
      // eslint-disable-next-line
      console.log(this.newName)
      this.confirm('userName', this.newName)
    },
    setGender: function(e) {
      this.showSetGender = false
      this.newGender = e.name
      // eslint-disable-next-line
      console.log(this.newGender,e)
      this.confirm('gender', this.newGender)
    },
    setCity: function(e) {
      this.showSetCity = false
      if(e[1]) {
        this.newCity = e[1].name
      } else {
        this.newCity = e[0].name
      }
      // eslint-disable-next-line
      console.log(this.newCity,e)
      this.confirm('city', this.newCity)
    },
    setIdentity: function(e) {
      this.showSetIdentity = false
      this.newIdentity = e.name
      // eslint-disable-next-line
      console.log(this.newIdentity,e)
      this.confirm('identity', this.newIdentity)
    },
    confirm: function (key, value) {
      // eslint-disable-next-line
      console.log(key, value, typeof(value))
      this.userInfo[key] = value
      storage.set('userInfo', JSON.stringify(this.userInfo))
      let data = {}
      data[key] = value
      net.patch('/users', data).then( res => {
        // eslint-disable-next-line
        console.log(res)
      }).catch( err => {
        // eslint-disable-next-line
        console.log(err)
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
</style>
