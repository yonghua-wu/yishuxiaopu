<template>
  <div>
    <div class="log-area">
      <a-message v-for="(item, index) in msg.msgLog" :key="index" :sender="item.sender" :time="item.sendTime" :msg="item.msg" :avatar="item.sendTime=='myself' ? userInfo.headPortrait : msg.avatar"/>
    </div>
    <div class="transaction">
      <div class="initiate" v-if="msg.stage==0" @click="showSelectBook=true">发起易书</div>
      <div class="in-transaction" v-if="msg.stage==1">
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
      <div class="address" v-if="msg.stage==2">
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
    <div class="select-book" v-if="showSelectBook" @click="showSelectBook=false">
      <div class="box" @click.stop="">
        <div class="header">
          <div class="title">请选择要交易的图书</div>
          <van-icon name="cross" class="close-icon" @click="showSelectBook=false"/>
        </div>
        <div class="book-list"></div>
        <div class="arrow"></div>
        <div class="book-list"></div>
        <button>完成</button>
      </div>
    </div>
    <div class="msg">
      <input class="input" type="text" name="" v-model="text" placeholder="输入内容" maxlength="140">
      <input class="btn" type="button" :value="btnText" @click="sendText" :disabled="btnText=='发送中'" :style="btnText=='发送中'?'background-color: #aaa':''">
    </div>
  </div>
</template>
<script>
import storage from '../../utils/storage.js'
import net from '../../utils/net.js'
import AMessage from '../../components/AMessage'
export default {
  components: {
    'a-message': AMessage
  },
  data: function() {
    return {
      stage: 0, // 交易进度
      userInfo: {},
      text: '',
      btnText: '发送',
      showSelectBook: false
    }
  },
  mounted: function() {
    if( ! this.$route.query.id) {
      this.$router.go(-1)
    }
    this.userInfo = JSON.parse(storage.get('userInfo'))
  },
  computed: {
    msg: function() {
      for(let i=0; i<this.$store.state.msg.length; i++) {
        if (this.$store.state.msg[i].otherSideId == this.$route.query.id) {
          return this.$store.state.msg[i]
        }
      }
      this.$router.go(-1)
      return {}
    }
  },
  methods: {
    sendText: function () {
      if (this.text) {
        this.btnText = '发送中'
        net.post('/msg', {
          type: 'text',
          receiveId: this.$route.query.id,
          msg: this.text
        }).then( res => {
          if (res.data.code != 200) {
            this.$toast('发送失败，请检查网络')
          } else {
            this.$store.dispatch('addMsg', {
              otherSideId: this.$route.query.id,
              sendTime: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
              type: 'text',
              msg: this.text,
              sender: 'myself'
            })
            this.text = ''
          }
          this.btnText = '发送'
        }).catch( () => {
          this.$toast('发送失败，请检查网络')
          this.btnText = '发送'
        })
      }
    },
    startTransaction: function () {

    }
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
    }
    .detail {
      padding: 0px 20px 20px 20px;
    }
  }
}
.select-book {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.4);
  overflow-y: auto;
  .box {
    position: relative;
    width: 85%;
    height: 80%;
    margin: 50px auto;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    overflow: hidden;
    .header {
      border-bottom: 1px solid #f0f0f0;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: relative;
      .title {
        font-size: 16px;
      }
      .close-icon {
        position: absolute;
        right: 12px;
        top: 12px;
        font-size: 26px;
      }
    }
    .book-list {
      height: 32%;
      border: 1px solid #f00;
      width: 100%;
    }
    button {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border: 0px;
      padding: 0px;
      position: absolute;
      bottom: 0px;
      right: 0px;
      font-size: 16px;
      color: #fff;
      background-color: #07c160;
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
