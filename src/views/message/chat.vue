<template>
  <div>
    <div class="log-area">
      <a-message v-for="(item, index) in msg.msgLog" :key="index" :sender="item.sender" :time="item.sendTime" :msg="item.msg" :avatar="item.sendTime=='myself' ? userInfo.headPortrait : msg.avatar"/>
    </div>
    <div class="transaction">
      <div class="title" @click="showContent = !showContent">{{stageTitle}}</div>
      <div class="mid-arrow" @click="showContent = !showContent">
        <van-icon :name="showContent ? 'arrow-down' : 'arrow-up'" />
      </div>
      <div class="content" v-show="showContent">
        <!-- 主动方stage==0 -->
        <div class="initiative-0" v-if="showStage == 'initiative-0'">
          <div class="book-list">
            <div class="item" v-for="(item, index) in books" :key="index" @click="selectedBook(index)">
              <div class="img">
                <img src="/default_book.png" alt="">
              </div>
              <div class="book-title">{{item.name}}</div>
            </div>
          </div>
        </div>

        <!-- 被动方stage==0 -->
        <div class="passive-0" v-if="showStage == 'passive-0'">
          <div class="description">
            <div class="text">TA看中了你的</div>
            <div class="book-title">{{passiveBook.name}}</div>
          </div>
          <div class="img">
            <img src="/default_book.png">
          </div>
        </div>
        
        <!-- 主动方stage==1 -->
        <div class="initiative-1" v-if="showStage == 'initiative-1'">
          <div class="switch-book">
            <div class="book">
              <div class="img">
                <img src="/default_book.png" alt="">
              </div>
              <div class="name">{{initiativeBook.name}}</div>
            </div>
            <img src="/arow.png" alt="" class="arow">
            <div class="book">
              <div class="img">
                <img src="/long.png" alt="">
              </div>
              <div class="name">{{passiveBook.name}}</div>
            </div>
          </div>
        </div>
        
        <!-- 被动方stage==1 -->
        <div class="passive-1" v-if="showStage == 'passive-1'">
          <div class="switch-book">
            <div class="book">
              <div class="img">
                <img src="/default_book.png" alt="">
              </div>
              <div class="name">{{initiativeBook.name}}</div>
            </div>
            <img src="/arow.png" class="arow">
            <div class="book">
              <div class="img">
                <img src="/default_book.png">
              </div>
              <div class="name">{{passiveBook.name}}</div>
            </div>
          </div>
          <div class="buttons">
            <input type="button" value="拒绝">
            <input type="button" value="同意">
          </div>
        </div>
        
        <!-- 双方相同stage==2 -->
        <div class="stage-2" v-if="showStage == 'stage-2'">
          <div class="item" v-for="(item, index) in addresses" :key="index">
            <div class="name-tel">
              <div class="name">{{item.receiver}}</div>
              <div class="tel">{{item.receiverTel}}</div>
            </div>
            <div class="address">{{item.province + item.city + item.area + item.detailedAddress}}</div>
          </div>
        </div>
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
import { Promise } from 'q';
export default {
  components: {
    'a-message': AMessage
  },
  data: function() {
    return {
      userInfo: {}, // 用户信息
      text: '', // 输入框的文字
      btnText: '发送', // 按钮上的文字
      showContent: true, // 是否显示content（操作）区域
      books: [],
      book: {},
      initiativeBook: null,
      passiveBook: null,
      addresses: null
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
    },
    stageTitle: function () {
      switch (this.showStage) {
        case 'initiative-0':
          this.getBooks()
          return '发起易书，请选择您的图书'
        case 'passive-0':
          this.getPassiveBook()
          return '等待对方发起易书'
        case 'initiative-1':
          return '等待对方确认'
        case 'passive-1':
          return '对方发起易书，请确认'
        case 'stage-2':
          this.getAddress()
          return '选择您的地址'
        default :
          return ''
      }
    },
    showStage: function () {
      if (this.msg.stage == 0 && this.msg.booksHost == false) {
        return 'initiative-0'
      } else if (this.msg.stage == 0 && this.msg.booksHost == true) {
        return 'passive-0'
      } else if (this.msg.stage == 1 && this.msg.booksHost == false) {
        return 'initiative-1'
      } else if (this.msg.stage == 1 && this.msg.booksHost == true) {
        return 'passive-1'
      } else if (this.msg.stage == 2) {
        return 'stage-2'
      } else {
        return ''
      }
    },
    // 获取被动方的书籍id
    getPassiveBookId: function () {
      return this.msg.bookId
    },
    // 获取主动方选择的书籍id
    getInitiativeSelectBookId: function () {
      if (this.showStage != 'passive-1') {
        return null
      }
      for (let i=0; i<this.msg.msgLog.length; i++) {
        if ( 'bookId' in this.msg.msgLog[i]) {
          return this.msg.msgLog[i].bookId
        }
      }
      return null
    }
  },
  methods: {
    // 发送用户输入的消息
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
            // 发送成功，添加本地消息记录
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
    // 获取主动方的所有图书，用于主动方挑选要交易的图书
    getBooks: function () {
      net.get('/books/user').then( res => {
        if (res.data.code == 200) {
          this.books = res.data.data
        } else {
          this.$toast('服务器异常')
        }
      }).catch( () => {
        this.$toast('网络异常')
      })
    },
    // 获取被动方的图书信息
    getPassiveBook: function () {
      this.getBook(this.getPassiveBookId).then( res => {
        this.passiveBook = res
      }).catch( () => {
        this.passiveBook = null
      })
    },
    // 获取主动方的图书信息
    getInitiativeBook: function () {
      this.getBook(this.getInitiativeSelectBookId).then( res => {
        this.initiativeBook = res
      }).catch( () => {
        this.initiativeBook = null
      })
    },
    getBook: function (id) {
      return new Promise((resolve, reject) => {
        net.get('/books?id=' + id).then( res => {
          if (res.data.code == 200) {
            resolve(res.data.data)
          } else {
            this.$toast('服务器异常')
            reject(null)
          }
        }).catch( () => {
          this.$toast('网络异常')
          reject(null)
        })
      })
    },
    // 获取自己的地址列表
    getAddress: function () {
      net.get('/addresses').then( res => {
        if (res.data.code == 200) {
          this.addresses = res.data.data
        } else {
          this.$toast('网络异常')
        }
      }).catch( () => {
        this.$toast('网络异常')
      })
    },
    // 主动方选择了要交换的图书
    selectedBook: function(index) {
      let msgBody = {
        type: 'transaction',
        receiveId: this.$route.query.id,
        msg: JSON.stringify({
          stage: 1,
          bookId: this.books[index].id
        })
      }
      // 发送消息
      net.post('/msg', msgBody).then( res => {
        if (res.data.code == 200) {

        }
      })
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
  left: 0px;
  width: 100%;
  .mid-arrow {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 20px;
    line-height: 26px;
    color: #fff;
    text-align: center;
    background-color: rgba(0,0,0,0.34);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #07c160;
    color: #fff;
  }
  .content {
    background-color: #f8f8f8;
    .initiative-0 {
      box-sizing: border-box;
      height: 170px;
      .book-list {
        display: flex;
        flex-direction: row;
        height: 100%;
        overflow: auto;
        .item {
          box-sizing: border-box;
          padding: 15px 10px 10px 10px;
          height: 100%;
          width: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .img {
            height: 0;
            width: 100px;
            padding-top: 120px;
            overflow: hidden;
            background-color: #fff;
            border-radius: 8px;
            position: relative;
            img {
              position: absolute;
              border-radius: 15px;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
          .book-title {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    .passive-0 {
      box-sizing: border-box;
      height: 120px;
      width: 100%;
      padding: 15px;
      display: flex;
      flex-direction: row;
      .description {
        flex: 1;
        height: 100%;
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .text {
          font-size: 15px;
          padding-bottom: 10px;
        }
        .book-title {
          font-size: 16px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          display:-webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp:2; //显示的行
        }
      }
      .img {
        height: 0;
        width: 80px;
        padding-top: 90px;
        overflow: hidden;
        background-color: #fff;
        border-radius: 8px;
        position: relative;
        img {
          position: absolute;
          border-radius: 15px;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
    }
    .initiative-1 {
      padding: 15px;
    }
    .passive-1 {
      padding: 15px;
      .buttons {
        display: flex;
        flex-direction: row;
        padding-top: 10px;
        input {
          padding: 0px;
          border: 0px;
          height: 35px;
          line-height: 35px;
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
    .stage-2 {
      padding: 15px;
      background-color: #fff;
      height: 120px;
      overflow: auto;
      .item {
        border-bottom: 1px solid #f0f0f0;
        padding: 10px;
        display: flex;
        flex-direction: column;
        &:active {
          background-color: #f0f0f0;
        }
        &:last-child {
          border: 0px;
        }
        .name-tel {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-bottom: 5px;
          .name {
            font-weight: bold;
            font-size: 16px;
          }
          .tel {

          }
        }
      }
      .address {
        color: #555;
      }
    }
    .switch-book {
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
          width: 100px;
          padding-top: 110px;
          overflow: hidden;
          background-color: #fff;
          border-radius: 8px;
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
          width: 100px;
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
  }
}
.msg {
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
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
