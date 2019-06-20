<template>
  <div>
    <div class="title">标题</div>
    <van-field placeholder="请输入书籍标题" v-model="bookTitle"/>
    <div class="title">分类</div>
    <div class="classification" @click="showSelectClass = true">
      <div class="class-title">书籍分类</div>
      <div class="content">{{selectClassName}}</div>
    </div>
    <div class="title">描述</div>
    <van-field
      type="textarea"
      placeholder="请输入书籍描述"
      rows="5"
      v-model="bookDescription"
    />
    <div class="title">添加图片</div>
    <van-cell-group class="upload-area">
      <div class="img-box" v-for="(item, index) in uploadImgs" :key="index">
        <img :src="item.content" />
        <van-icon class="close" name="clear" @click.native="delSelectedImg(index)" />
      </div>
      <van-uploader class="upload-btn" v-if="isUpload" :after-read="after" :max-size="2097152" @oversize="oversize">
        <van-icon class="icon" name="photograph"/>
      </van-uploader>
    </van-cell-group>
    <div class="big-btn">
      <van-button type="primary" size="large" @click="submit">发布</van-button>
    </div>
    <van-popup v-model="showSelectClass" position="bottom" :overlay="true">
      <van-picker :columns="classNames" @confirm="selectedClass" @cancel="showSelectClass = false" :show-toolbar="true" title="选择分类"/>
    </van-popup>
  </div>
</template>
<script>
import net from '../../utils/net.js'
export default {
  data: function () {
    return {
      bookInfo: {}
    }
  },
  mounted: function () {
    net.get('/books', {
      params: {
        id: this.$route.params.id
      }
    }).then( res => {
      if (res.data.code == 200) {
        this.bookInfo = res.data.data
      } else {
        this.$toast.fail('服务器异常')
      }
    }).catch( () => {
      this.$toast.fail('网络异常')
    })
  }
}
</script>
<style lang="scss" scoped>
.title {
  color: #888;
  padding: 15px 15px 10px 15px;
  font-size: 12px;
}
.upload-area {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    width: 100px;
    height: 100px;
    img {
      padding: 10px;
      width: 80px;
      height: 80px;
    }
    .close {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: 26px;
      color: #f44;
      background-color: #fff;
      border-radius: 50%;
    }
  }
  .upload-btn {
    width: 80px;
    height: 80px;
    padding: 10px;
  }
}
.icon {
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 20px;
}
.big-btn {
  padding: 10px 10px 15px 10px;
}
.classification {
  padding: 10px 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  .content {
    flex: 1;
    padding-left: 40px;
    color: #555;
  }
}
</style>
