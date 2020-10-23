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
    <p ref="scrollElement"></p>
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
      <van-icon name="chat-o" :badge="articleData.comment_length" />
      <van-icon
        name="star-o"
        :class="{ enshrine: articleData.has_star }"
        @click="enshrine"
      />
    </footer>
    <footer class="footer2" v-show="!showFooter">
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        ref="textarea"
        v-model="commentTxt"
        @focus="clearText"
        @blur="setText"
      ></textarea>
      <button @touchstart.prevent.stop="submit">提交</button>
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
      commentTxt: "评论：",
      parent_id: "",
      // event: this.$refs.scrollElement,
    };
  },
  created() {
    this.getArticle();
    this.getCmment();
    this.$bus.$on("replybus", (userId, nickname, event) => {
      this.parent_id = userId;
      this.commentTxt = "回复：" + nickname;
      this.showFooter = false;
      // this.event = event;
    });
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
    clearText() {
      this.commentTxt.startsWith("评论：") && (this.commentTxt = "");
    },
    setText() {
      this.commentTxt == "" && (this.commentTxt = "评论：");
      this.showFooter = true;
    },
    async submit() {
      const status = this.commentTxt == "评论：" || this.commentTxt == "";
      if (status) {
        return;
      }
      await this.axios.post(`/post_comment/${this.$route.params.articleId}`, {
        content: this.commentTxt,
        parent_id: this.parent_id,
      });
      this.commentTxt = "评论：";
      this.showFooter = true;
      this.parent_id = "";
      // console.log(this.event);
      this.$refs.scrollElement.scrollIntoView();
      this.getCmment();
      this.getArticle();
    },
    replybtn(v) {
      this.parent_id = v;
    },
    async enshrine() {
      await this.axios.get(`/post_star/${this.$route.params.articleId}`);
      this.getArticle();
    },
  },
  watch: {
    showFooter() {
      this.$nextTick(() => {
        this.showFooter == false && this.$refs.textarea.focus();
      });
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
.enshrine {
  color: red;
}
</style>