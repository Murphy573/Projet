/* tagsview状态管理 */
export default {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  getters: {
    vx_gt_VisitedViews (state) {
      return state.visitedViews;
    },
    vx_gt_CachedViews (state) {
      return state.cachedViews;
    }
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.name === view.name)) return;
      state.visitedViews.push(Object.assign({}, view));
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (view.meta.cached) {
        if (state.cachedViews.includes(view.meta.cached)) return;
        state.cachedViews.push(view.meta.cached);
      }
    },
    DEL_VISITED_VIEW: (state, view) => {
      let _index = state.visitedViews.findIndex(v => v.name === view.name);
      if (_index !== -1) {
        state.visitedViews.splice(_index, 1);
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      let _index = state.cachedViews.indexOf(view.meta.cached);
      _index > -1 && state.cachedViews.splice(_index, 1);
    },
    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.meta.affix || v.name === view.name;
      });
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      let _index = state.cachedViews.indexOf(view.meta.cached);
      if (_index > -1) {
        state.cachedViews = state.cachedViews.slice(_index, _index + 1);
      }
      else {
        // if _index = -1, there is no cached tags
        state.cachedViews = [];
      }
    },
    DEL_ALL_VISITED_VIEWS: state => {
      // keep affix tags
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
      state.visitedViews = affixTags;
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = [];
    },
    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.name === view.name) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    // 重置所有view状态：清空
    RESET_ALL_VIEWS (state) {
      state.visitedViews = [];
      state.cachedViews = [];
    }
  },
  actions: {
    vx_ac_AddView ({ dispatch }, view) {
      dispatch('vx_ac_AddVisitedView', view);
      dispatch('vx_ac_AddCachedView', view);
    },
    vx_ac_AddVisitedView ({ commit }, view) {
      commit('ADD_VISITED_VIEW', view);
    },
    vx_ac_AddCachedView ({ commit }, view) {
      commit('ADD_CACHED_VIEW', view);
    },
    vx_ac_DelView ({ dispatch }, view) {
      dispatch('vx_ac_DelVisitedView', view);
      dispatch('vx_ac_DelCachedView', view);
    },
    vx_ac_DelVisitedView ({ commit }, view) {
      commit('DEL_VISITED_VIEW', view);
    },
    vx_ac_DelCachedView ({ commit }, view) {
      commit('DEL_CACHED_VIEW', view);
    },
    vx_ac_DelOthersViews ({ dispatch }, view) {
      dispatch('vx_ac_DelOthersVisitedViews', view);
      dispatch('vx_ac_DelOthersCachedViews', view);
    },
    vx_ac_DelOthersVisitedViews ({ commit }, view) {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
    },
    vx_ac_DelOthersCachedViews ({ commit }, view) {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
    },
    vx_ac_DelAllViews ({ dispatch }) {
      dispatch('vx_ac_DelAllVisitedViews');
      dispatch('vx_ac_DelAllCachedViews');
    },
    vx_ac_DelAllVisitedViews ({ commit }) {
      commit('DEL_ALL_VISITED_VIEWS');
    },
    vx_ac_DelAllCachedViews ({ commit }) {
      commit('DEL_ALL_CACHED_VIEWS');
    },
    vx_ac_UpdateVisitedView ({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view);
    },
    vx_ac_ResetTagsViewState ({ commit }) {
      commit('RESET_ALL_VIEWS');
    }
  }
};
