<template>
  <div>
    <home-header></home-header>

    <van-tabs v-model="active" sticky>
      <van-tab :title="item.name" v-for="item in list" :key="item.id">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <my-enshrine
              v-for="item in data"
              :key="item.id"
              :item="item"
            ></my-enshrine>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      list: [],
      data: [],
      loading: false,
      finished: false,
      isLoading: true,
      pageIndex: 1,
      pageSize: 5,
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      const res = await this.axios.get("/category");
      this.list = res.data.data;
      this.getdata(1);
    },
    async getdata(n) {
      const res2 = await this.axios.get("/post", {
        params: {
          category: this.list[this.active].id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });
      if (n) {
        this.data = [...this.data, ...res2.data.data];
      } else {
        this.data = res2.data.data;
      }
      this.isLoading = false;
      this.loading = false;
      res2.data.data.length < 5 && (this.finished = true);
    },
    onRefresh() {
      this.pageIndex = 1;
      this.getdata(0);
    },
    onLoad() {
      this.pageIndex++;
      this.getdata(1);
    },
  },
  watch: {
    active(val) {
      this.data = [];
      this.pageIndex = 1;
      this.getdata(1);
    },
  },
};
</script>

<style scoped lang='less'>
/deep/ .van-tabs__nav {
  background: #cccc;
}
</style>