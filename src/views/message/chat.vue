<template>
  <div>
    <div class="log-area">
      <a-message />
    </div>
    <div class="transaction">
      <div class="initiate" v-if="stage==0">发起易书</div>
      <div class="in-transaction" v-if="stage==1">
        <div class="title">对方向你发起易书，请确认</div>
        <div class="books">
          <div class="book">
            <div class="img">
              <img src="/default_book.png" alt="">
            </div>
            <div class="name">名字名字名</div>
          </div>
          <img src="/arow.png" alt="" class="arow">
          <div class="book">
            <div class="img">
              <img src="/long.png" alt="">
            </div>
            <div class="name">名字</div>
          </div>
        </div>
        <div class="buttons">
          <input type="button" value="拒绝">
          <input type="button" value="同意">
        </div>
      </div>
      <div class="address" v-if="stage==2">
        <div class="title">邮寄地址</div>
        <div class="content">
          <div class="name-tel">
            <div class="name">名字</div>
            <div class="tel">12312312323</div>
          </div>
          <div class="detail">详细地址</div>
        </div>
      </div>
    </div>
    <div class="msg">
      <input class="input" type="text" name="" id="">
      <input class="btn" type="button" value="发送">
    </div>
  </div>
</template>
<script>
import AMessage from '../../components/AMessage'
export default {
  components: {
    'a-message': AMessage
  },
  data: function() {
    return {
      stage: 0
    }
  },
  mounted: function() {
    // this.$store.dispatch('addMsg', {abc: '123'})
  }
}
</script>
<style lang="scss" scoped>
.log-area {
  margin: 15px 15px 60px 15px;
}

.transaction {
  position: fixed;
  bottom: 60px;
  width: 100%;
  font-size: 16px;
  .initiate {  
    color: #fff;
    background-color: #07c160;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
  }
  .in-transaction {
    display: flex;
    flex-direction: column;
    .title {
      color: #fff;
      background-color: #07c160;
      height: 40px;
      width: 100%;
      line-height: 40px;
      text-align: center;
    }
    .books {
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .book {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        height: 100%;
        .img {
          height: 0;
          width: 120px;
          padding-top: 120px;
          overflow: hidden;
          background-color: #fff;
          border-radius: 15px;
          position: relative;
          img {
            position: absolute;
            border-radius: 15px;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
        .name {
          width: 120px;
          padding-top: 10px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display:-webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp:2; //显示的行
        }
      }
      .arow {
        width: 40px;
        height: 40px;
      }
    }
    .buttons {
      display: flex;
      flex-direction: row;
      padding: 15px 15px 10px 15px;
      input {
        padding: 0px;
        border: 0px;
        height: 40px;
        line-height: 40px;
        width: 50%;
        color: #fff;
        background-color: #aaa;
        &:nth-child(1) {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        &:nth-child(2) {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          background-color: #07c160;
        }
      }
    }
  }
  .address {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
    .title {
      color: #fff;
      background-color: #07c160;
      height: 40px;
      width: 100%;
      line-height: 40px;
      text-align: center;
    }
    .name-tel {
      padding: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .name {
        font-size: 16px;
        font-weight: bold;
      }
      .tel {

      }
    }
    .detail {
      padding: 0px 20px 20px 20px;
    }
  }
}
.msg {
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .input {
    flex: 1;
    border: 0px;
    border-radius: 6px;
    height: 35px;
    margin-right: 10px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #f0f0f0;
  }
  .btn {
    height: 35px;
    width: 50px;
    border: 0px;
    border-radius: 6px;
    color: #fff;
    background-color: #f44;
  }
}
</style>
