<template>
  <div class="comment">
    <div class="title">
      <img
        :src="this.axios.defaults.baseURL + commentData.user.head_img"
        alt=""
      />
      <div class="center">
        <span>{{ commentData.user.nickname }}</span
        ><br />
        <span>{{ commentData.user.create_date }}</span>
      </div>
      <button>回复</button>
    </div>
    <reply
      v-if="commentData"
      :replyData="commentData.parent"
      :isReply="computedReplay(0, commentData.parent)"
    ></reply>
    <p class="footer">{{ commentData.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    commentData: Object,
    required: true,
  },
  data() {
    return {
      count: 0,
    };
  },
  created() {},
  methods: {
    computedReplay(m, v) {
      if (v) {
        m++;
        return this.computedReplay(m, v.parent);
      } else {
        return m;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  button {
    margin-top: 10px;
    width: 36px;
    height: 24px;
    line-height: 40px;
    line-height: 24px;
    background: transparent;
    border: none;
  }
  .center {
    flex: 1;
    text-align: left;
    margin-left: 10px;
    line-height: 18px;
  }
}
.comment {
  border-bottom: 1px solid #000;
  padding: 15px;
  .footer {
    margin-top: 10px;
  }
}
</style>