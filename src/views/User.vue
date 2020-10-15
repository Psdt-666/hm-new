<template>
  <div class="login">
    <hm-header>个人中心</hm-header>
    <div class="umsg">
      <img :src="axios.defaults.baseURL + info.head_img" alt="" />
      <div>
        <i
          :class="{
            'iconfont iconxingbienan': info.gender,
            'iconfont iconxingbienv': !info.gender,
          }"
        ></i>
        <span>{{ info.nickname }}</span>
        <p>{{ info.create_date | date }}</p>
      </div>
    </div>
    <van-cell-group>
      <van-cell
        title="我的关注"
        is-link
        value="关注的用户"
        @click="$router.push('/attention')"
      />
      <van-cell
        title="我的跟贴"
        is-link
        value="跟帖回复"
        @click="$router.push('/comments')"
      />
      <van-cell
        title="我的收藏"
        is-link
        value="文档/视频"
        @click="$router.push('/enshrine')"
      />
      <van-cell title="设置" is-link @click="$router.push('/edit')" />
      <van-cell title="退出" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
    };
  },
  created() {
    const id = localStorage.getItem("id");
    this.axios.get(`/user/${id}`).then((res) => {
      const data = res.data;
      data.statusCode == 200 ? (this.info = data.data) : "";
    });
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您确定退出码",
        })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("./login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang='less'>
.umsg {
  height: 100px;
  border-bottom: 3px solid #cccc;
  display: flex;
  align-items: center;

  img {
    width: 70px;
    height: 70px;
    margin: 0 15px;
    background: skyblue;
    object-fit: contain;
  }
  div {
    flex: 1;
  }
}
</style>