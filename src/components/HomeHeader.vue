<template>
  <div>
    <hm-header class="homeHeader">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i><span>搜索新闻</span>
      </div>
      <div class="right">
        <i class="iconfont iconwode"></i>
      </div>
    </hm-header>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.left,
.right {
  width: 60px;
  height: 40px;
  line-height: 40px;
  color: azure;
  text-align: center;
}
.iconnew {
  font-size: 30px;
  float: none;
}
.iconwode {
  font-size: 20px;
  float: none;
}
.center {
  margin-top: 5px;
  height: 30px;
  line-height: 30px;
  color: azure;
  flex: 1;
  font-size: 12px;
  text-align: center;
  background: rgba(247, 244, 244, 0.6);
  border-radius: 15px;
  .iconsearch {
    float: none;
    vertical-align: middle;
    line-height: 30px;
  }
}
.hh {
  height: 30px;
  width: 100px;
  text-align: center;
}
</style>
