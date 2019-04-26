<template>
  <div>
    <div class="filter-bar">
      <div class="factor">
        <div>综合排序</div>
        <van-icon class="icon" tag="div" name="arrow-down" />
      </div>
      <div class="factor">
        <div>图书分类</div>
        <van-icon class="icon" tag="div" name="arrow-down" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.filter-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
  height: 40px;
  width: 100%;
  .factor {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > * {
      margin-right: 3px;
    }
  }
}
</style>
