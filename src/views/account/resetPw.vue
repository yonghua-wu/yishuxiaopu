<template>
  <div>
    <div v-if="step==1">
      <van-field
        v-model="phone"
        label="手机号"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
      />
      <van-cell-group>
        <van-field
          v-model="sms"
          center
          clearable
          maxlength="4"
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="primary" @click="sendSms">{{pinText}}</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="next">
      <van-button type="primary" size="large" @click="nextStep">{{step==1?'下一步':'修改密码'}}</van-button>
    </div>
    <div v-if="step==2">
      <van-field
        v-model="passwd"
        label="密码"
        type="password"
        maxlength="16"
        placeholder="请输入密码"
      />
      <van-field
        v-model="passwdAgain"
        label="确认密码"
        type="password"
        maxlength="16"
        placeholder="请确认密码"
      />
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      phone: '',
      sms: '',
      step: 1,
      countdown: 0,
      passwd: '',
      passwdAgain: ''
    }
  },
  computed: {
    pinText: function () {
      if (this.countdown == 0) {
        return '获取验证码'
      } else {
        return this.countdown + 's'
      }
    }
  },
  methods: {
    sendSms: function () {
      if (this.countdown != 0) {
        this.$toast('请稍后')
        return
      }
      this.errPhone = false
      if (this.phone.length != 11) {
        this.$toast('请检查手机号')
        this.errPhone = true
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
      this.$toast('验证码已发送')
    },
    nextStep: function () {
      if (this.step == 1) {
        if (this.sms.length == 4) {
          this.step = 2
        } else {
          this.$toast('请输入验证码')
        }
      } else {
        if ( this.passwd.length < 6) {
          this.$toast('密码太短')
        } else if (this.passwd != this.passwdAgain) {
          this.$toast('密码不一致')
        } else {
          // 修改密码请求

          this.$toast('密码已修改')
          this.$router.go(-1)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.next {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
