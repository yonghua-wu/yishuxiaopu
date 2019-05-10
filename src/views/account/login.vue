<template>
  <div class="container">
    <div class="logo">易书小铺</div>
    <div class="input-group" :class="{err: errPhone}">
      <input type="text" name="username" placeholder="请输入手机号" maxlength="11" v-model="phone"/>
    </div>
    <div class="input-group" :class="{err: errPw}">
      <input type="password" name="password" placeholder="请输入密码" maxlength="16" v-model="password"/>
    </div>
    <van-button size="large" type="primary" @click="submit">登陆</van-button>
    <div class="footer">
      <div class="protocol" @click="$router.push('/account/register')">去注册</div>
      <div class="reset-pw">找回密码</div>
    </div>
  </div>
</template>
<script>
import storage from '../../utils/storage.js'
import net from '../../utils/net.js'
export default {
  data: function () {
    return {
      errPhone: false,
      errPw: false,
      phone: '',
      password: ''
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
        this.$toast('密码格式有误')
        this.errPw = true
        pass = false
      }
      if (pass) {
        // eslint-disable-next-line
        console.log('phone:',this.phone,'password:',this.password)
        
        this.$toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          mask: true,
          message: '登陆中...'
        })

        // 发送请求
        net.post('/auth', {
          phone: this.phone,
          password: this.password
        }).then( res => {
          // eslint-disable-next-line
          console.log(res)
          this.$toast.clear()
          switch (res.data.code) {
            case 200: 
              storage.del('userInfo')
              this.$store.commit('setLogged')
              this.$toast.success('登陆成功')
              this.$router.go(-1)
              break
            case 411: 
              this.$toast.fail('用户名或密码错误')
              this.phone = ''
              this.password = ''
              break
            case 418: 
              this.$toast.fail('用户名或密码错误')
              this.phone = ''
              this.password = ''
              break
            default: 
              this.$toast.fail('未知的异常')
              break
          }
        }).catch( err => {
          // eslint-disable-next-line
          console.log(err)
          this.$toast.clear()
          this.$toast.fail('网络异常')
        })
      }
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
    .protocol {
      color: #888;
    }
  }
}
</style>
