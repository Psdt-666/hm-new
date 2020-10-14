<template>
  <div class="login">
    <hm-header class="title">登录1111</hm-header>
    <hm-loge></hm-loge>
    <van-field
      v-model="u_name"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
      :error-message="name_msg"
      @input="checkname"
      @clear="name_msg = ''"
    />
    <van-field
      v-model="u_password"
      required
      clearable
      label="密码"
      placeholder="请输入密码"
      :error-message="password_msg"
      @input="checkpassword"
      @clear="password_msg = ''"
    />
    <hm-btn @click.native="login">立即登录</hm-btn>
    <div class="toRegister">如果没有账号<a href="/register">去注册</a></div>
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
    };
  },
  created() {
    const { username, password } = this.$route.query;
    this.u_name = username;
    this.u_password = password;
  },
  methods: {
    checkname() {
      const reg_uname = /^1\d{3,5}$/;
      this.name_msg = reg_uname.test(this.u_name) ? "" : "用户名格式不正确";
    },
    checkpassword() {
      const reg_upassword = /^\d{3,12}$/;
      this.password_msg = reg_upassword.test(this.u_password)
        ? ""
        : "用户名格式不正确";
    },
    login() {
      const { u_name, name_msg, u_password, password_msg } = this;
      u_name != "" && !name_msg && u_password != "" && !password_msg
        ? this.axios
            .post("/login", {
              username: u_name,
              password: u_password,
            })
            .then((res) => {
              const {data}=res.data
              const { message, statusCode } = res.data;
              if(statusCode == 200){
                localStorage.setItem('token',data.token)
                localStorage.setItem('id',data.user.id)
                // this.axios.defaults.headers.common['Authorization']=localStorage.getItem('token')
                this.$router.push("/user");
              }
              this.$toast.success(message);
            })
            // .catch((err) => {
            //   this.$toast.fail("网络故障，稍后再试！");
            // })
        : this.$toast.fail("用户名或密码格式不对");
    },
  },
};
</script>

<style>
.toRegister{
  margin-top: 10px;
  padding-right: 30px;
  text-align: right;
}
.title .iconjiantou2{
  display: none;
}
</style>