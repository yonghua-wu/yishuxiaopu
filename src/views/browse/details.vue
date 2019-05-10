<template>
  <div>
    <div class="seller-bar">
      <img :src="bookOfMaster.head_portrait" alt="">
      <div class="userinfo">
        <div class="nickname">{{bookOfMaster.user_name}}</div>
        <div class="other">
          <div class="identity">{{bookOfMaster.identity}}</div>
          <div class="city">{{bookOfMaster.city}}</div>
        </div>
      </div>
      <div class="right">
        <van-button type="danger" size="small">我想要</van-button>
      </div>
    </div>
    <div class="book-info">
      <div class="title">{{bookInfo.name}}</div>
      <div class="discription">{{bookInfo.discription}}</div>
      <div class="imgs">
        <img :src="bookInfo.img" alt="">
      </div>
      <div class="time">发布于：{{bookInfo.create_time}}</div>
    </div>
  </div>
</template>
<script>
import net from '../../utils/net.js'
export default {
  data: function () {
    return {
      bookInfo: {
        name: '----',
        discription: '----',
        img: '/default_book.png',
        create_time: '--'
      },
      bookOfMaster: {
        id: '',
        user_name: '',
        gender: '',
        identity: '',
        head_portrait: '',
        city: '',
        school: '',
      }
    }
  },
  mounted: function() {
    net.get('/books', {
      params: {
        id: this.$route.params.id
      }
    }).then( res => {
      this.bookInfo = res.data.data
      net.get('/users/id', {
        params: {
          id: res.data.data.user_id
        }
      }).then( res => {
        this.bookOfMaster = res.data.data
      })
    })
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
