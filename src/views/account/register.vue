<template>
  <div class="container">
    <div class="logo">易书小铺</div>
    <div class="input-group" :class="{err: errPhone}">
      <input type="number" placeholder="输入手机号" maxlength="11" v-model="phone"/>
    </div>
    <div class="input-group" :class="{err: errPw}">
      <input type="password" placeholder="设置密码" maxlength="16" v-model="password"/>
    </div>
    <div class="input-group" :class="{err: errAgaPw}">
      <input type="password" placeholder="确认密码" maxlength="16" v-model="againPassword"/>
    </div>
    <div class="input-group" :class="{err: errPin}">
      <input type="number" placeholder="验证码" maxlength="6" v-model="pin"/>
      <div class="inner-btn" @click="getPin">{{ rightPinText }}</div>
    </div>
    <van-button size="large" type="primary" @click="submit">注册</van-button>
    <div class="footer">
      <div class="protocol">注册即同意《用户服务协议》</div>
      <div class="reset-pw"></div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data: function () {
    return {
      errPhone: false,
      errPw: false,
      errAgaPw: false,
      errPin: false,
      phone: '',
      password: '',
      againPassword: '',
      pin: '',
      getPinText: '获取验证码',
      countdown: 0
    }
  },
  computed: {
    rightPinText: function () {
      if (this.countdown == 0) {
        return '获取验证码'
      } else {
        return this.countdown + 's'
      }
    }
  },
  methods: {
    submit: function () {
      let pass = true
      this.errPhone = false
      this.errPw = false
      this.errAgaPw = false
      this.errPin = false
      if (this.phone.length != 11) {
        this.$toast('手机号格式有误')
        this.errPhone = true
        pass = false
      } else if (this.password.length < 6 ) {
        this.$toast('密码长度应大于6位')
        this.errPw = true
        pass = false
      } else if (this.password != this.againPassword ) {
        this.$toast('两次密码不一致')
        this.errAgaPw = true
        pass = false
      } else if (this.pin.length != 6) {
        this.$toast('验证码输入有误')
        this.errPin = true
        pass = false
      }
      if (pass) {
        // eslint-disable-next-line
        console.log('phone:',this.phone,'password:',this.password,'againPassword:',this.againPassword,'pin:',this.pin)
        // 发送请求
        this.$toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          mask: true,
          message: '加载中...'
        })
        setTimeout(()=>{this.$toast.clear()}, 10000)
      }
    },
    getPin: function () {
      if (this.countdown != 0) {
        return
      }
      this.countdown = 60
      let that = this
      setTimeout(function decrement () {
        that.countdown--
        if (that.countdown == 0) return
        setTimeout(decrement, 1000)
      }, 1000)
      // 发送请求获取验证码
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin: 10vh 30px 0px 30px;
  .logo {
    font-size: 26px;
    text-align: center;
    padding-bottom: 30px;
  }
  .input-group {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    padding: 5px;
    border: 1px solid #ebedf0;
    border-radius: 3px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    input {
      flex: 1;
      width: 100%;
      height: 100%;
      border: 0px;
      background-color: unset;
      padding: 0 10px;
    }
    .inner-btn {
      padding-right: 10px;
      width: 70px;
      text-align: center;
    }
  }
  .err {
    border: 1px solid #f44;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0px 10px;
    .reset-pw {
      color: #888;
    }
  }
}
</style>
