<template>
  <div class="myEnshrine">
    <div class="content1" v-if="item.type == 1 && item.cover.length < 3">
      <div class="left">
        <h3 class="line2">{{ item.title }}</h3>
        <div class="footer">
          {{ item.user.nickname }} <span>{{ item.open }} 跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="urlFormate(item.cover[0].url)" alt="" />
      </div>
    </div>
    <div class="content2" v-else-if="item.type == 1">
      <div class="left">
        <h3>{{ item.title }}</h3>
      </div>
      <div class="right">
        <img :src="urlFormate(item.cover[0].url)" alt="" />
        <img :src="urlFormate(item.cover[1].url)" alt="" />
        <img :src="urlFormate(item.cover[2].url)" alt="" />
      </div>
      <div class="footer">
        {{ item.user.nickname }} <span>{{ item.open }} 跟帖</span>
      </div>
    </div>
    <div class="content3" v-else>
      <div class="left">
        <h3>{{ item.title }}</h3>
      </div>
      <div class="right">
        <div class="play">
          <i class="iconfont iconshipin"></i>
        </div>
        <img :src="urlFormate(item.cover[0].url)" alt="" />
      </div>
      <div class="footer">
        {{ item.user.nickname }} <span>{{ item.open }} 跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    required: true,
  },
  methods: {
    urlFormate(url) {
      return url.startsWith("http") ? url : this.axios.defaults.baseURL + url;
    },
  },
};
</script>

<style scoped lang='less'>
.content1,
.content2,
.content3 {
  padding: 15px;
  border-bottom: 1px solid #ccc;
}
h3 {
  font-size: 16px;
}
.content1 {
  display: flex;
  .left {
    flex: 1;
    .line2 {
      line-height: 24px;
    }
    h3 {
      height: 70px;
      padding-right: 30px;
    }
    .footer {
      font-size: 12px;
      color: #ccc;
    }
  }
  .right {
    img {
      width: 120px;
      height: 80px;
    }
  }
}
.content2 {
  .right {
    display: flex;
    img {
      margin: 5px 5px;
      width: 106px;
    }
  }
  .footer {
    font-size: 12px;
    color: #ccc;
  }
}
.content3 {
  position: relative;
  .right {
    padding: 10px 5px;
    padding: 5px;
    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: rgba(0, 0, 0, 0.4);
      text-align: center;
      .iconshipin {
        line-height: 60px;
        font-size: 40px;
        color: #fff;
      }
    }

    img {
      // width: 100%;
      width: 335px;
      height: 170px;
      object-fit: cover;
    }
  }
  .footer {
    font-size: 12px;
    color: #ccc;
  }
}
</style>