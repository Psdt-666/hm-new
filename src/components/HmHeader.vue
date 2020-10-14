<template>
  <div>
    <i class="iconfont iconjiantou2" @click='$router.go(-1)'></i>
    <h2>
      <slot></slot>
    </h2>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
i{
  font-size: 18px;
  float: left;
  line-height: 40px;
  height: 40px;
}
h2{
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #f4f4f4;
}
</style>