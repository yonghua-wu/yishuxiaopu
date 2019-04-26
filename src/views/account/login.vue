<template>
  <div class="container">
    <div class="logo">易书小铺</div>
    <div class="input-group">
      <input type="number" placeholder="请输入手机号" maxlength="11"/>
    </div>
    <div class="input-group">
      <input type="password" placeholder="请输入密码" maxlength="16"/>
    </div>
    <van-button size="large" type="primary">登陆</van-button>
    <div class="footer">
      <div class="protocol"></div>
      <div class="reset-pw">找回密码</div>
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
