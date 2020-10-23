<template>
  <div>
    <header>
      <i class="iconfont iconjiantou2" @click="$router.go(-1)"></i>
      <div class="center">
        <input
          v-model="searchTxt"
          type="text"
          class="search"
          placeholder="请输入搜索内容"
          @keyup.enter="search"
          @input="getRecommend"
        />
        <i class="iconfont iconsearch"></i>
      </div>
      <button @click="search">搜索</button>
    </header>
    <div class="content">
      <div class="history" v-show="showhistory">
        <p class="title">历史记录</p>
        <ul>
          <li v-for="item in historyData" :key="item" @click="searchTxt = item">
            {{ item }}
          </li>
        </ul>
        <p class="title">热门搜索</p>
        <ul>
          <li
            v-for="(item, index) in hotData"
            :key="index"
            @click="searchTxt = item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div v-show="showrecommend" class="recommend">
        <ul>
          <li
            v-for="item in recommendData"
            :key="item.id"
            @click="searchTxt = item.title"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>

      <div v-show="showarttile">
        <my-enshrine
          v-for="item in arttileData"
          :key="item.id"
          :item="item"
          @click.native="$router.push(`detail/${item.id}`)"
        ></my-enshrine>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTxt: "",
      historyData: JSON.parse(localStorage.getItem("historydata")) || [],
      hotData: ["关晓彤", "1", "情火"],
      arttileData: [],
      recommendData: [],
      showhistory: true,
      showarttile: false,
      showrecommend: false,
    };
  },
  created() {
    this.search = this.tools.throttle(this.search, 6000);
    this.getRecommend = this.tools.anti_shake(this.getRecommend, 1000);
  },
  methods: {
    async search() {
      if (!this.searchTxt) {
        return;
      }
      const res = await this.axios.get("/post_search", {
        params: {
          keyword: this.searchTxt,
        },
      });
      this.arttileData = res.data.data;
      this.historyData.push(this.searchTxt);
      this.historyData = [...new Set(this.historyData)];
      this.searchTxt = "";
    },
    async getRecommend() {
      console.log(222);
      if (!this.searchTxt) {
        this.recommendData = "";
        return;
      }
      const res = await this.axios.get("/post_search_recommend", {
        params: {
          keyword: this.searchTxt,
        },
      });
      this.recommendData = res.data.data;
    },
  },
  updated() {},
  watch: {
    arttileData(v) {
      this.showrecommend = this.showhistory = !v;
      this.showarttile = v != "";
    },
    recommendData(v) {
      this.showarttile = this.showhistory = !v;
      this.showrecommend = v != "";
    },
    historyData(v) {
      localStorage.setItem("historydata", JSON.stringify(v));
    },
  },
};
</script>

<style scoped lang='less'>
header {
  display: flex;
  align-items: center;
  line-height: 40px;
  background: rgb(224, 223, 223);
  .iconjiantou2 {
    width: 30px;
    margin-left: 5px;
  }
  .center {
    position: relative;
    flex: 1;
    height: 26px;
    .search {
      height: 26px;
      width: 100%;
      display: block;
      border-radius: 13px;
      border: 1px solid #ccc;
      font-size: 12px;
      font-weight: normal;
      text-indent: 1.7em;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      margin-left: 3px;
      margin-top: 2px;
      transform: translateY(-50%);
    }
  }
  button {
    text-align: center;
    width: 40px;
    background: transparent;
    border: none;
    font-weight: normal;
    font-size: 14px;
    margin-right: 10px;
    margin-left: 5px;
  }
}
.content {
  padding: 15px;
  .history {
    .title {
      font-weight: 700;
      margin: 5px 0;
    }
    ul {
      display: flex;
      li {
        padding: 5px 10px;
        background: #ccc;
        margin: 5px;
      }
    }
  }

  .recommend {
    li {
      line-height: 40px;
      border-bottom: 1px solid rgb(204, 201, 201);
    }
  }
}
</style>