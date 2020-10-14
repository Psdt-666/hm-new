<template>
  <div>
    <hm-header>我的关注</hm-header>
    <div>
      <ul class="myAttentions">
        <li v-for="item in list" :key="item.id">
          <div class="attention">
            <img :src="axios.defaults.baseURL + item.head_img" alt="" />
            <div class="nickname">
              <span>{{ item.nickname }}</span
              ><br />
              <span>{{ item.create_date | date }}</span>
            </div>
            <button @click="unfollow(item.id)">取消关注</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      id: localStorage.getItem("id"),
    };
  },
  created() {
    // this.axios.get(`/user_follows/6`)
    this.getAxios();
  },
  methods: {
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: "温馨提示",
          message: "确认取消关注吗",
        })
        const res = await this.axios.get(`/user_unfollow/${id}`);
        this.getAxios();
      } catch (error) {
        
      }
    },
    async getAxios() {
      const res = await this.axios.get(`/user_follows`);
      this.list = res.data.data;
    },
  },
};
</script>

<style scoped lang='less'>
.attention {
  padding: 20px;
  display: flex;
  align-items: center;
  img {
    margin-right: 15px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .nickname {
    flex: 1;
    line-height: 20px;
  }
  button {
    border: 0px solid #ccc;
    width: 100px;
    background: #ccc;
    height: 30px;
    border-radius: 15px;
  }
}
</style>