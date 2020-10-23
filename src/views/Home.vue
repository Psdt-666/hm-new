<template>
  <div>
    <home-header></home-header>
    <div class="right" @click="$router.push('/tableList')">></div>
    <van-tabs v-model="active" sticky>
      <van-tab :title="item.name" v-for="item in list" :key="item.id">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
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
              @click.native="$router.push(`detail/${item.id}`)"
            ></my-enshrine>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      active: 1,
      list: [],
      data: [],
      loading: false,
      finished: false,
      isLoading: false,
      pageIndex: 1,
      pageSize: 5,
    };
  },
  created() {
    this.getlist(1);
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
      this.finished = false;
      this.pageIndex = 1;
      this.getdata(0);
    },
    onLoad() {
      this.pageIndex++;
      this.getdata(1);
    },
  },
  watch: {
    active() {
      this.data = [];
      this.pageIndex = 1;
      this.finished = false;
      this.loading = true;
      this.getdata(1);
    },
  },
};
</script>

<style scoped lang='less'>
.right {
  height: 44px;
  width: 40px;
  text-align: center;
  line-height: 44px;
  background: #cccc;
  position: absolute;
  right: 0;
  z-index: 997;
}
/deep/ .van-tabs__nav {
  background: #cccc;
  margin-right: 40px;
}
</style>