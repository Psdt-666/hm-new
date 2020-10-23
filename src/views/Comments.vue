<template>
  <div>
    <hm-header>我的跟帖</hm-header>

    <ul class="comments">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in list" :key="item.id" class="comment">
          <p class="data">{{ item.create_date | date("YYYY-MM-DD hh:ss") }}</p>
          <div class="reply" v-if="item.parent">
            <span>回复：{{ item.parent.user.nickname }}</span
            ><br />
            <p>{{ item.parent.content }}</p>
          </div>
          <p class="newcomment">{{ item.content }}</p>
          <h3 class="line1">
            {{ item.post.title }} <i class="iconfont iconjiantou1"></i>
          </h3>
        </li>
      </van-list>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 0,
      loading: true,
      finished: false,
    };
  },
  created() {
    this.rander();
  },
  methods: {
    async rander() {
      this.pageIndex++;
      const res = await this.axios.get("/user_comments", {
        params: {
          pageIndex: this.pageIndex,
          pageSize: 5,
        },
      });
      this.list = [...this.list, ...res.data.data];
      this.loading = false;
      res.data.data.length < 5 && (this.finished = true);
    },
    onLoad() {
      this.rander();
    },
  },
};
</script>

<style  scoped lang='less'>
.comments {
  padding: 5px 10px;
}
.comment {
  border-bottom: 1px solid rgb(221, 218, 218);
  h3 {
    font-size: 12px;
    margin-bottom: 10px;
    color: #ccc;
    .iconjiantou1 {
      float: right;
    }
  }
}
.data {
  line-height: 24px;
}
.reply {
  line-height: 30px;
  background: rgba(236, 234, 234, 0.5);
}
.newcomment {
  line-height: 50px;
  font-size: 18px;
}
</style>