<template>
  <div>
    <button>
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
div{
  margin:0 20px;
}
button{
  height: 40px;
  width: 100%;
  display: block;
  background:skyblue;
  border-radius: 30px;
  border: 0 solid #ccc;
  outline: none;
}
</style>