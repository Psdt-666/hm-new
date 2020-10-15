<template>
  <div>
    <hm-header>我的收藏</hm-header>
    <my-enshrine v-for="item in data" :key="item.id" :item="item"></my-enshrine>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  async created() {
    const res = await this.axios.get("/user_star");
    this.data = res.data.data;
  },
};
</script>

<style>
</style>