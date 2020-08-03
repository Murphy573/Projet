<template>
  <div class="navbar">
    <Hamburger :is-active="vx_gt_Sidebar.opened"
      @toggle-click="vx_ac_ToggleSideBar"
      class="hamburger-container" />

    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-tooltip content="全屏"
        effect="dark"
        placement="bottom">
        <screenfull class="screenfull right-menu-item hover-effect" />
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item"
        trigger="click">
        <div class="avatar-wrapper">
          <img :src="cmpt_UserInfo.avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/profile/password">
              密码修改
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;"
              @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Breadcrumb from './breadcrumb';
import Hamburger from './hamburger';
import Screenfull from '@/components/screenfull';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'vx_gt_Sidebar',
      'vx_gt_GetUserInfo'
    ]),
    cmpt_UserInfo () {
      return this.vx_gt_GetUserInfo || {};
    }
  },
  methods: {
    ...mapActions(['vx_ac_ToggleSideBar', 'vx_ac_Logout']),
    logout () {
      this.vx_ac_Logout().then(() => {
        window.location.reload();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: $--size-navHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $--size-navHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
