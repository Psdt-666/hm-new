<template>
  <div>
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <p>点击删除 一个频道</p>
      <ul>
        <li v-for="item in list" :key="item.id" @click="delList(item)">
          {{ item.name }}
        </li>
      </ul>
      <p>点击添加一个频道</p>
      <ul>
        <li v-for="item in delData" :key="item.id" @click="addList(item.name)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: "",
      delData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.axios.get("/category");
      console.log(res);
      this.list = res.data.data;
    },
    async addList(v) {
      const res = await this.axios.post("/category", {
        name: v,
      });
      this.getList();
    },
    delList(v) {
      this.delData.push(v);
    },
  },
};
</script>

<style scoped lang='less'>
.content {
  padding: 20px;
  p {
    font-size: 14px;
    font-weight: 700;
    margin: 10px 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 5px 10px;
      margin: 5px;
      background: #ccc;
    }
  }
}
</style>