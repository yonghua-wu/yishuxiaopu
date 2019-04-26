<template>
  <div class="container">
    <div class="logo">易书小铺</div>
    <div class="input-group">
      <input type="number" placeholder="输入手机号" maxlength="11"/>
    </div>
    <div class="input-group">
      <input type="password" placeholder="设置密码" maxlength="16"/>
    </div>
    <div class="input-group">
      <input type="password" placeholder="确认密码" maxlength="16"/>
    </div>
    <div class="input-group">
      <input type="number" placeholder="验证码" maxlength="6"/>
      <div class="inner-btn">获取验证码</div>
    </div>
    <van-button size="large" type="primary">注册</van-button>
    <div class="footer">
      <div class="protocol">注册即同意《用户服务协议》</div>
      <div class="reset-pw"></div>
    </div>
  </div>
</template>
<script>
export default {
  
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
