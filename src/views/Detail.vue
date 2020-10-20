<template>
  <div
    class="detail"
    :class="{ f_padding1: showFooter, f_padding2: !showFooter }"
  >
    <hm-header>
      <i class="iconfont iconnew"></i>
      <button
        class="focusBtn"
        :class="{ hasFollowed: articleData.has_follow }"
        @click.prevent="focusBtn"
      >
        {{ articleData.has_follow ? "关注" : "已关注" }}
      </button>
    </hm-header>
    <h3 class="title line2">{{ articleData.title }}</h3>
    <p class="articleTime">
      <span v-if="articleData.user">{{ articleData.user.nickname }}</span
      ><span>{{ articleData.create_date | date }}</span>
    </p>
    <div class="content">
      <div v-if="articleData.type == 2">
        <video :src="articleData.content" controls></video>
      </div>
      <div v-else>
        <div v-html="articleData.content"></div>
      </div>
    </div>
    <div class="clearfix">
      <div
        class="focusBtn dianzan"
        :class="{ hasFollowed: articleData.has_like }"
        @click.prevent="like"
      >
        <i class="iconfont icondianzan"></i>
        <span>2</span>
      </div>
    </div>
    <div class="comments" v-if="commentData">
      <comment
        v-for="item in commentData"
        :commentData="item"
        :key="item.id"
      ></comment>
    </div>
    <footer class="footer1" v-show="showFooter">
      <input
        type="text"
        placeholder="写跟贴"
        @focus="showFooter = !showFooter"
      />
      <van-icon name="chat-o" badge="9" /> <van-icon name="star-o" />
    </footer>
    <footer class="footer2" v-show="!showFooter">
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="回复："
      ></textarea>
      <button>提交</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleData: "",
      commentData: "",
      showFooter: true,
    };
  },
  created() {
    this.getArticle();
    this.getCmment();
  },
  methods: {
    async getArticle() {
      const res = await this.axios.get(`/post/${this.$route.params.articleId}`);
      this.articleData = res.data.data;
    },
    async changeFocus() {
      const id = this.articleData.user.id;
      const url = this.articleData.has_follow
        ? `/user_unfollow/${id}`
        : `/user_follows/${id}`;
      const res = await this.axios.get(url);
      this.getArticle();
    },
    async changeLike() {
      const id = this.$route.params.articleId;
      const url = `/post_like/${id}`;
      const res = await this.axios.get(url);
      this.getArticle();
    },
    focusBtn() {
      this.changeFocus();
    },
    like() {
      this.changeLike();
    },
    async getCmment() {
      const res = await this.axios.get(
        `/post_comment/${this.$route.params.articleId}`
      );
      this.commentData = res.data.data;
    },
  },
};
</script>

<style scoped lang='less'>
.iconnew {
  font-size: 40px;
  color: red;
}
.focusBtn {
  margin-top: 7px;
  border: 1px solid #ccc;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  font-weight: normal;
  float: right;
  padding: 0 15px;
  margin-right: 20px;
  border-radius: 15px;
  background: transparent;
}
.hasFollowed {
  border: 1px solid red;
  color: red;
}
.title {
  margin: 15px;
  line-height: 24px;
}
/deep/.content {
  padding: 0 10px;
  video {
    width: 100%;
  }
  img {
    width: 100%;
  }
}
.articleTime {
  margin: 10px 15px;
  span {
    margin-left: 5px;
  }
}
.dianzan {
  .icondianzan {
    font-size: 14px;
    padding-right: 5px;
  }
}
.comments {
  margin-top: 15px;
  border-top: 1px solid #999;
}
.detail {
  .footer1 {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      height: 24px;
      background: #ccc;
      width: 120px;
      text-indent: 1em;
      border-radius: 12px;
      border: none;
    }
    background: #fff;
  }
  .van-icon {
    font-size: 22px;
  }
  .footer2 {
    width: 100%;
    height: 60px;
    background: #fff;
    position: fixed;

    bottom: 0;
    textarea {
      background: #ccc;
      border-radius: 6px;
      border: none;
      resize: none;
      height: 45px;
      margin-top: 10px;
      margin-left: 10px;
      width: 240px;
      padding-top: 5px;
      text-indent: 1em;
      box-sizing: border-box;
    }
    button {
      width: 60px;
      height: 24px;
      line-height: 24px;
      border: none;
      background: red;
      float: right;
      margin-right: 20px;
      border-radius: 5px;
      margin-top: 30px;
    }
  }
}
.f_padding1 {
  padding-bottom: 42px;
}
.f_padding2 {
  padding-bottom: 62px;
}
</style>