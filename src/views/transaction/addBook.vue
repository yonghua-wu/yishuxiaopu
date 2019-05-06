<template>
  <div>
    <div class="title">标题</div>
    <van-field placeholder="请输入书籍标题" />
    <div class="title">分类</div>
    <van-cell title="书籍分类" value="请选择" />
    <div class="title">描述</div>
    <van-field
      type="textarea"
      placeholder="请输入书籍描述"
      rows="5"
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
  </div>
</template>
<script>
export default {
  
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
</style>
