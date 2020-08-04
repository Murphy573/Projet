/* 编辑器核心 */
import { InitNewPage } from '@/views/projet/model/page';

export default {
  namespaced: true,
  state: {
    pageData: {},
    activeElementUid: null,
    // 操作历史缓存
    historyCache: [],
    curHistoryIndex: -1
  },
  getters: {
    vx_gt_pageData (state) {
      return state.pageData;
    }
  },
  mutations: {
    ADD_PAGE (state, pageData = null) {
      debugger;
      if (!pageData) return;
      state.pageData = pageData;
    }
  },
  actions: {
    /* 添加页面 */
    vx_ac_AddPage ({ commit }) {
      debugger;
      commit('ADD_PAGE', InitNewPage());
    }
  }
};
