<template>
  <div>
    <div class="log-area">
      <a-message />
    </div>
    <div class="control-area">
      <div class="transaction">发起易书</div>
      <div class="msg">
        <input class="input" type="text" name="" id="">
        <input class="btn" type="button" value="发送">
      </div>
    </div>
  </div>
</template>
<script>
import AMessage from '../../components/AMessage'
export default {
  components: {
    'a-message': AMessage
  }
}
</script>
<style lang="scss" scoped>
.log-area {
  margin: 15px 15px 60px 15px;
}
.control-area {
  position: fixed;
  bottom: 0px;
  height: 90px;
  width: 100%;
  background-color: #fff;
  .transaction {
    width: 100%;
    height: 40%;
    color: #fff;
    background-color: #07c160;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .msg {
    box-sizing: border-box;
    width: 100%;
    height: 60%;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .input {
      flex: 1;
      border: 0px;
      border-radius: 6px;
      height: 60%;
      margin-right: 10px;
      padding-left: 5px;
      padding-right: 5px;
      background-color: #f0f0f0;
    }
    .btn {
      height: 60%;
      width: 50px;
      border: 0px;
      border-radius: 6px;
      color: #fff;
      background-color: #f44;
    }
  }
}
</style>
