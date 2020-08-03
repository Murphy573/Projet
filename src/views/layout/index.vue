<template>
  <div class="layout">
    <SideBar />
    <div id="global-main-container"
      class="main-container"
      :class="cmpt_mainClass">
      <div class="main-top">
        <Navbar />
        <TagsView v-if="vx_gt_showTagsView" />
      </div>
      <div class="main-bottom">
        <transition name="fade-transform"
          mode="out-in">
          <keep-alive :include="vx_gt_CachedViews">
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './components/sidebar/sidebar';
import Navbar from './components/navbar';
import TagsView from './components/tags-view';
import { mapGetters } from 'vuex';

export default {
  name: 'Layout',

  components: { SideBar, Navbar, TagsView },

  computed: {
    ...mapGetters(['vx_gt_CachedViews', 'vx_gt_showTagsView', 'vx_gt_fixedHeader', 'vx_gt_Sidebar']),
    cmpt_isSidebarCollapse () {
      return !this.vx_gt_Sidebar.opened;
    },
    cmpt_mainClass () {
      return {
        'fixed-header': this.vx_gt_fixedHeader,
        collapse: this.cmpt_isSidebarCollapse,
        showTagsView: this.vx_gt_showTagsView
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  height: 100%;
  width: 100%;

  display: flex;

  .main-container {
    position: relative;
    flex: 1;
    transition: width 0.28s;
    overflow-y: auto;
    overflow-x: hidden;

    .main-top {
      width: 100%;
    }

    &.fixed-header {
      .main-top {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$--size-menuNormalWidth});
        transition: width 0.28s;
      }
      &.collapse {
        .main-top {
          width: calc(100% - #{$--size-menuCollapseWidth});
        }
      }

      &.showTagsView {
        .main-bottom {
          padding-top: calc(#{$--size-navHeight} + #{$--size-tagHeight});
        }
      }

      .main-bottom {
        padding-top: $--size-navHeight;
      }
    }
  }
}
</style>
