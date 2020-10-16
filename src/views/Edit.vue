<template>
  <div>
    <hm-header>信息编辑</hm-header>
    <div class="nikPic">
      <img :src="axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader class="van-uploader" :after-read="afterRead" />
    </div>
    <van-cell-group>
      <van-cell
        title="昵称"
        is-link
        :value="info.nickname"
        @click="editNickName"
      />
      <van-cell title="密码" is-link value="*****" />
      <van-cell
        title="性别"
        is-link
        :value="info.gender ? '男' : '女'"
        @click="editSex"
      />
    </van-cell-group>
    <van-dialog
      v-model="nickShow"
      title="昵称"
      show-cancel-button
      @confirm="nicknameConfirm"
    >
      <van-field v-model="nickname" />
    </van-dialog>
    <van-dialog
      v-model="sexShow"
      title="性别"
      show-cancel-button
      @confirm="sexConfirm"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <input type="file" @change="ff" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ss: "",
      info: "",
      nickname: "",
      gender: "",
      nickShow: false,
      sexShow: false,
    };
  },
  created() {
    const id = localStorage.getItem("id");
    this.axiosGet(`/user/${id}`);
  },

  methods: {
    ff(el) {
      console.log(el);
    },
    axiosGet(url) {
      this.axios
        .get(url)
        .then((res) => {
          const { statusCode, data } = res.data;
          statusCode == 200 && (this.info = data);
        })
        .catch(() => {
          this.$toast("网络故障稍后再试！");
        });
    },
    axiosPost(url, data) {
      this.axios
        .post(url, data)
        .then(() => {
          const id = localStorage.getItem("id");
          this.axiosGet(`/user/${id}`);
        })
        .catch(() => {
          this.$toast("网络故障稍后再试！");
        });
    },
    editNickName() {
      this.nickShow = true;
      this.nickname = this.info.nickname;
    },
    nicknameConfirm() {
      const flag = this.nickname != this.info.nickname && this.nickname != "";
      if (!flag) {
        this.$toast("昵称不能为空或重复");
      } else {
        const id = localStorage.getItem("id");
        this.axiosPost(`/user_update/${id}`, {
          nickname: this.nickname,
        });
      }
    },
    editSex() {
      this.gender = this.info.gender;
      this.sexShow = true;
    },
    sexConfirm() {
      const flag = this.gender !== this.info.gender;
      if (flag) {
        const id = localStorage.getItem("id");
        this.axiosPost(`/user_update/${id}`, {
          gender: this.gender,
        });
      }
    },
    afterRead(file) {
      let data = new FormData();
      data.append("file", file.file);
      this.axios.post("/upload", data).then((res) => {
        const head_img = res.data.data.url;
        const id = localStorage.getItem("id");
        this.axiosPost(`/user_update/${id}`, {
          head_img,
        });
      });
    },
  },
};
</script>

<style scoped lang='less'>
.nikPic {
  text-align: center;
  padding: 15px 0;
  position: relative;
  img {
    width: 70px;
    height: 70px;
  }
  .van-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }
}
</style>