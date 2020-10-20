<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-loge></hm-loge>
    <van-field
      v-model="u_name"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
      :error-message="name_msg"
      @clear="name_msg = ''"
    />
    <van-field
      v-model="nick_name"
      required
      clearable
      label="昵称"
      placeholder="请输入昵称"
      :error-message="nick_msg"
      @clear="nick_msg = ''"
    />
    <van-field
      v-model="u_password"
      required
      clearable
      label="密码"
      placeholder="请输入密码"
      :error-message="password_msg"
      @clear="password_msg = ''"
    />

    <hm-btn @click.native="register">立即注册</hm-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      u_name: "",
      name_msg: "",
      u_password: "",
      password_msg: "",
      nick_name: "",
      nick_msg: "",
    };
  },
  methods: {
    register() {
      const {
        u_name,
        name_msg,
        u_password,
        password_msg,
        nick_name,
        nick_msg,
      } = this;
      !(
        u_name &&
        !name_msg &&
        u_password &&
        !password_msg &&
        nick_name &&
        !nick_msg
      )
        ? this.$toast.fail("请检查注册信息格式")
        : this.axios
            .post("/register", {
              username: u_name,
              nickname: nick_name,
              password: u_password,
            })
            .then((res) => {
              const { message, statusCode } = res.data;
              statusCode === 200 &&
                this.$router.push({
                  name: "login",
                  params: {
                    username: u_name,
                    password: u_password,
                  },
                });
              this.$toast.success(message);
            })
            .catch((res) => {
              this.$toast.fail("网络故障，稍后再试！");
            });
    },
  },
  watch: {
    u_name(v) {
      const reg_uname = /^1\d{3,5}$/;
      !v ? "" : (this.name_msg = reg_uname.test(v) ? "" : "用户名格式不正确");
    },
    u_password(v) {
      const reg_upassword = /^\d{3,12}$/;
      !v
        ? ""
        : (this.password_msg = reg_upassword.test(v) ? "" : "密码格式不正确");
    },
    nick_name(v) {
      const reg_nickname = /^[\u4e00-\u9fa5]{3,7}$/;
      !v ? "" : (this.nick_msg = reg_nickname.test(v) ? "" : "昵称格式不正确");
    },
  },
};
</script>

<style>
</style>