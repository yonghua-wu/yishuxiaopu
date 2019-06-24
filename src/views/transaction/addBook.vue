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
      showSelectClass: false,
      selectClassIndex: null,
      bookTitle: '',
      bookDescription: '',
      classNames: ['小说', '传记', '艺术', '漫画', '哲学', '励志', '美食', '保健', '旅行', '经营', '科技', '计算机', '教育', '工具', '期刊'],
      uploadImgs: [],
      isUpload: true 
    }
  },
  computed: {
    selectClassName: function () {
      if (this.selectClassIndex === null) {
        return '请选择'
      } else {
        return this.classNames[this.selectClassIndex]
      }
    }
  },
  mounted: function () {
  },
  methods: {
    selectedClass: function (value, index) {
      this.selectClassIndex = index
      this.showSelectClass = false
    },
    after: function (file) {
      // eslint-disable-next-line
      console.log(file)
      this.uploadImgs.push(file)
      if (this.uploadImgs.length == 9) {
        this.isUpload = false
      }
    },
    delSelectedImg: function (index) {
      this.uploadImgs.splice(index, 1)
      if (this.uploadImgs.length < 9) {
        this.isUpload = true
      }
    },
    submit: function() {
      if (this.bookTitle == '') {
        this.$toast('请填写书籍标题')
        return
      }
      if (this.selectClassIndex == null) {
        this.$toast('请选择书籍分类')
        return
      }
      if (this.bookDescription == '') {
        this.$toast('请填写书籍描述')
        return
      }
      if (this.uploadImgs.length == 0) {
        this.$toast('请至少上传一张图片')
        return
      }
      let that = this
      function uploading () {
        let requests = []
        for(let i=0; i<that.uploadImgs.length; i++) {
          let data = new FormData
          data.append('file', that.uploadImgs[i].file)
          requests.push(net.post('/upload', data))
        }
        return requests
      }
      async function uploadImgs () {
        let imgNames = []
        let process = uploading()
        for(let i=0; i<process.length; i++) {
          let res = await process[i]
          imgNames.push(res.data)
        }
        return imgNames
      }
      this.$toast.loading('上传图片中')
      uploadImgs().then( res => {
        let data = {
          name: this.bookTitle,
          type: this.selectClassIndex,
          discription: this.bookDescription,
          img: res.toString()
        }
        this.$toast.loading({
          mask: true,
          message: '书籍发布中'
        })
        net.post('/books', data).then( res => {
          if (res.data.code == 200) {
            this.$toast.success('发布成功')
            this.$router.go(-1)
          } else {
            this.$toast.fail('发布失败，网络异常')
          }
        }).catch( () => {
          this.$toast.fail('发布失败，网络异常')
        })
      }).catch( () => {
        this.$toast.fail('上传失败，网络异常')
      })
    },
    oversize: function() {
      this.$dialog.alert({
        title: '提示',
        message: '不能上传大小超过2M的图片'
      })
    }
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
