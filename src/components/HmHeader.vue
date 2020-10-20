<template>
  <div>
    <div class="bgbox"></div>
    <div class="header">
      <i class="iconfont iconjiantou2" @click="$router.go(-1)"></i>
      <h2>
        <slot></slot>
      </h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bgbox {
  height: 40px;
}
.header {
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
}
i {
  margin-left: 10px;
  font-size: 18px;
  float: left;
  line-height: 40px;
  height: 40px;
}
h2 {
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #f4f4f4;
}
</style>