<template>
  <div>
    <van-row class="userinfo bcfff mbtm20" type="flex" align="center" @click.native="goLogin">
      <img :src="avatar" alt="" class="avatar">
      <div class="nickname">{{userInfo.userName ? userInfo.userName : userInfo.phone}}</div>
    </van-row>
    <van-row class="features bcfff mbtm20">
      <van-col span="12" class="release" @click.native="$router.push('/transaction/add-book')">发布图书</van-col>
      <van-col span="12" class="record" @click.native="$router.push('/transaction/record')">历史交易</van-col>
    </van-row>
    <div class="mbtm20">
      <van-cell value="" icon="location-o" is-link to="/address/list">
        <template slot="title">
          <span class="custom-text">地址管理</span>
          <!-- <van-tag type="danger">标签</van-tag> -->
        </template>
      </van-cell>
    </div>
    <div class="mbtm20">
      <van-cell value="" icon="user-o" is-link to="/account/userinfo">
        <template slot="title">
          <span class="custom-text">个人信息</span>
          <!-- <van-tag type="danger">标签</van-tag> -->
        </template>
      </van-cell>
      <van-cell value="" icon="setting-o" is-link to="/account/setting">
        <template slot="title">
          <span class="custom-text">账号设置</span>
          <!-- <van-tag type="danger">标签</van-tag> -->
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import net from '../../utils/net.js'
import storage from '../../utils/storage.js'
import config from '../../utils/config.js'
export default {
  data: function () {
    return {
      userInfo: {
        userName: '点击登陆',
        phone: '',
        gender: '',
        headPortrait: '',
        city: '',
        school: '',
        identity: ''
      }
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
    if (this.$store.state.isLogin) {
      let userinfo = storage.get('userInfo') || ''
      if (userinfo == '') {
        net.get('/users').then( res => {
          this.userInfo = res.data.data
          storage.set('userInfo', JSON.stringify(res.data.data))
        })
      } else {
        this.userInfo = JSON.parse(userinfo)
      }
    }
  },
  methods: {
    goLogin: function () {
      if (!this.$store.state.isLogin) {
        this.$router.push('/account/login')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.userinfo {
  height: 150px;
  .avatar {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin-left: 20px;
  }
  .nickname {
    font-size: 22px;
    font-weight: bold;
    margin-left: 20px;
  }
}
.features {
  height: 60px;
  & > * {
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    border-right: 1px solid rgba(235, 237, 240, 0.5);
  }
  & > *:active {
    background-color: #f2f3f5;
  }
}
.bcfff {
  background-color: #fff;
}
.mbtm20 {
  margin-bottom: 20px;
}
</style>
