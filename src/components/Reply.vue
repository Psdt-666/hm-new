<template>
  <div v-if="replyData">
    <reply
      v-if="replyData.parent"
      :isReply="isReply - 1"
      :replyData="replyData.parent"
    ></reply>
    <div class="reply">
      <p>
        <span>{{ isReply }}楼</span><span>{{ replyData.user.nickname }}</span>
        <span>{{ replyData.create_date }}</span
        ><span>回复</span>
      </p>
      <p>{{ replyData.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    replyData: {
      type: Object,
      required: true,
    },
    isReply: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped lang='less'>
.reply {
  background: rgb(233, 233, 233);
  border: 1px solid rgb(204, 204, 204);
  padding: 10px;
  p {
    padding: 5px 0;
  }
  p:first-child {
    span {
      margin-left: 5px;
    }
    span:last-child {
      float: right;
      margin: 5px;
    }
  }
}
</style>