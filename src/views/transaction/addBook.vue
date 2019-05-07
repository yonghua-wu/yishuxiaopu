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
    <van-cell-group class="upload">
      <van-uploader>
        <van-icon class="icon" name="photograph" />
      </van-uploader>
    </van-cell-group>
    <div class="big-btn">
      <van-button type="primary" size="large">发布</van-button>
    </div>
    <van-popup v-model="showSelectClass" position="bottom" :overlay="true">
      <van-picker :columns="classNames" @confirm="selectedClass" @cancel="showSelectClass = false" :show-toolbar="true" title="选择分类"/>
    </van-popup>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      showSelectClass: false,
      selectClassIndex: null,
      bookTitle: '',
      bookDescription: '',
      classNames: ['小说', '传记', '艺术', '漫画', '哲学', '励志', '美食', '保健', '旅行', '经营', '科技', '计算机', '教育', '工具', '期刊']
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
  methods: {
    selectedClass: function (value, index) {
      this.selectClassIndex = index
      this.showSelectClass = false
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
.upload {
  padding: 15px;
  margin-bottom: 20px;
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
  padding: 0px 10px 15px 10px;
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
