<template>
  <div class="login-container">
    <el-form ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">管理员登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          placeholder="管理员账户" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.password"
          :type="passwordType"
          name="password"
          auto-complete="on"
          tabindex="2"
          show-password
          placeholder="管理员密码"
          @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">登录</el-button>

      <div style="position:relative">
        <div class="tips">
          账号密码随便输入
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('管理员密码长度应大于6'));
      }
      else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'test123',
        password: 'test123'
      },
      loginRules: {
        username: [{ required: true, message: '管理员账户不允许为空', trigger: 'blur' }],
        password: [
          { required: true, message: '管理员密码不允许为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    };
  },
  created () {
    this.redirect = this.$route.query && this.$route.query.redirect;
  },
  methods: {
    ...mapActions(['vx_ac_LoginByUsername']),
    async handleLogin () {
      try {
        await this.$refs.loginForm.validate();
        this.loading = true;
        await this.vx_ac_LoginByUsername(this.loginForm);

        this.$router.push({ path: this.redirect || '/layout/dashboard' });
      }
      catch (error) { }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
