<template>
  <div>
    <div class="seller-bar">
      <img :src="bookOfMaster.headPortrait?bookOfMaster.headPortrait:'/default_avatar.png'" alt="">
      <div class="userinfo">
        <div class="nickname">{{bookOfMaster.userName?bookOfMaster.userName:'用户'+bookOfMaster.id}}</div>
        <div class="other">
          <div class="identity">{{bookOfMaster.identity}}</div>
          <div class="city">{{bookOfMaster.city}}</div>
        </div>
      </div>
      <div class="right">
        <van-button type="danger" size="small" @click="toChat">我想要</van-button>
      </div>
    </div>
    <div class="book-info">
      <div class="title">{{bookInfo.name}}</div>
      <div class="discription">{{bookInfo.discription}}</div>
      <div class="imgs" v-for="(item, index) in imgs" :key="index">
        <img :src="item" alt="">
      </div>
      <div class="time">发布于：{{humanTime}}</div>
    </div>
  </div>
</template>
<script>
import net from '../../utils/net.js'
import time from '../../utils/time.js'
import storage from '../../utils/storage.js'
import config from '../../utils/config.js'
import msgCenter from '../../utils/msgProcessCenter.js'
export default {
  data: function () {
    return {
      bookInfo: {
        name: '----',
        discription: '----',
        img: '/default_book.png',
        createTime: '--'
      },
      bookOfMaster: {
        id: '',
        userName: '',
        gender: '',
        identity: '',
        headPortrait: '',
        city: '',
        school: '',
      }
    }
  },
  mounted: function() {
    this.$toast.loading('加载中')
    net.get('/books', {
      params: {
        id: this.$route.params.id
      }
    }).then( res => {
      if (res.data.code == 200) {
        if (res.data.data.state == 'success') { // 图书已交易
          this.$router.go(-1)
        } else {
          this.bookInfo = res.data.data
          net.get('/users/id', {
            params: {
              id: res.data.data.userId
            }
          }).then( res => {
            if (res.data.code == 200) {
              this.$toast.clear()
              this.bookOfMaster = res.data.data
            } else {
              this.$toast.fail('服务器异常')
            }
          }).catch( () => {
            this.$toast.fail('网络异常')
          })
        }
      } else {
        this.$toast.fail('服务器异常')
      }
    }).catch( () => {
        this.$toast.fail('网络异常')
      })
    this.userInfo = JSON.parse(storage.get('userInfo'))
  },
  computed: {
    humanTime: function () {
      return time(new Date(this.bookInfo.createTime))
    },
    imgs: function () {
      return this.bookInfo.img.split(',').map( item => {
        return config.STATIC + item
      })
    }
  },
  methods: {
    toChat: function () {
      if (this.bookInfo.userId == this.userInfo.id) {
        this.$toast.fail('这是你发布的书')
        return
      }
      let msgBody = {
        type: 'create',
        receiveId: this.bookInfo.userId,
        msg: {
          bookId: this.$route.params.id
        }
      }
      this.$toast.loading('加载中')
      msgCenter.sendMsg(msgBody).then( () => {
        this.$toast.clear()
        this.$router.push('/msg/chat?id=' + this.bookInfo.userId)
      }).catch( () => {
        this.$toast.fail('网络异常')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.seller-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.1);
  img {
    margin: 0px 10px 0px 20px;
    border-radius: 3px;
    width: 45px;
    height: 45px;
  }
  .userinfo {
    flex: 1;
    .nickname {
      font-size: 15px;
      font-weight: bold;
    }
    .other{
      display: flex;
      flex-direction: row;
      & > * {
        padding-right: 10px;
        color: #888;
      }
    }
  }
  .right {
    padding-right: 20px;
  }
}
.book-info {
  padding: 15px 15px 70px 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebedf0;
  }
  .discription {
    padding: 10px 0px;
    font-size: 15px;
    line-height: 24px;
  }
  .imgs {
    img {
      width: 100%;
    }
  }
  .time {
    padding-top: 10px;
    font-size: 12px;
    color: #888;
  }
}
</style>
