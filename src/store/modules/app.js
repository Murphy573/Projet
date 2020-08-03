/* app全局配置 */
const app = {
  state: {
    // 是否显示tags
    showTagsView: true,
    // 是否固定navbar和tagsview
    fixedHeader: false,
    // 是否显示侧边栏Logo
    showSidebarLogo: false
  },
  getters: {
    vx_gt_showTagsView (state) {
      return state.showTagsView;
    },
    vx_gt_fixedHeader (state) {
      return state.fixedHeader;
    },
    vx_gt_showSidebarLogo (state) {
      return state.showSidebarLogo;
    }
  }
};

export default app;
