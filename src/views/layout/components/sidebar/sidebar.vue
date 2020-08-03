<template>
  <div class="sidebar-container"
    :class="cmpt_classObj">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu mode="vertical"
        :default-active="vx_gt_ActiveMenu"
        :background-color="cmpt_cssVars.colorMenuBg"
        :text-color="cmpt_cssVars.colorMenuText"
        :active-text-color="cmpt_cssVars.colorMenuActiveText"
        :collapse="cmlt_isCollapse"
        :collapse-transition="false"
        :unique-opened="false"
        @select="setCurrentMenu">
        <sidebar-item v-for="item of vx_gt_Menus"
          :item="item"
          :key="item.name"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SidebarItem from './sidebar-item';
import CssVars from '@/styles/vars.scss';

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['vx_gt_ActiveMenu', 'vx_gt_Menus', 'vx_gt_Sidebar']),
    cmlt_isCollapse () {
      return !this.vx_gt_Sidebar.opened;
    },
    cmpt_classObj () {
      return {
        hideSidebar: !this.vx_gt_Sidebar.opened,
        withoutAnimation: this.vx_gt_Sidebar.withoutAnimation
      };
    },
    cmpt_cssVars () {
      return CssVars;
    }
  },
  methods: {
    ...mapActions(['vx_ac_SetActiveMenu']),
    setCurrentMenu (name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  transition: width 0.28s;
  width: $--size-menuNormalWidth !important;
  flex: none;
  background-color: $--color-menuBg;
  height: 100%;
  font-size: 0;
  overflow: hidden;
  z-index: 1001;

  ::v-deep {
    .el-scrollbar {
      width: 100%;
      height: 100%;

      .scrollbar-wrapper {
        overflow-x: hidden !important;
      }

      .el-scrollbar__bar {
        &.is-vertical {
          right: 0;
        }
        &.is-horizontal {
          display: none;
        }
      }
    }

    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;

      .el-submenu {
        .el-submenu {
          .el-submenu__title {
            background-color: $--color-subMenuBg !important;

            &:hover {
              background-color: $--color-subMenuHoverBg !important;
            }
          }
        }
      }
    }
  }

  &.hideSidebar {
    width: $--size-menuCollapseWidth !important;

    ::v-deep {
      .submenu-title-noDropdown {
        padding: 0 !important;
        position: relative;

        .el-tooltip {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }
        }
      }

      .el-submenu {
        overflow: hidden;

        & > .el-submenu__title {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }

          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }

      .el-menu--collapse {
        .el-submenu {
          & > .el-submenu__title {
            & > span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }
          }
        }
      }
    }
  }

  &.withoutAnimation {
    transition: none;
  }
}
</style>
