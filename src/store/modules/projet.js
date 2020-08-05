/* 编辑器核心 */
import { InitNewPage } from '@/views/projet/model/page';
import { InitNewElement } from '@/views/projet/model/element';
import { findActiveElement } from '@/views/projet/utils/element';
import { showMessage } from '@/views/projet/utils/common';
import { isPlainObj, isArray } from '@/utils/common';

export default {
  namespaced: true,
  state: {
    pageData: {},
    // 当前激活元素父id
    activeElementPuid: null,
    // 当前激活元素id
    activeElementUid: null,
    // 历史缓存
    historyCache: [],
    curHistoryIndex: -1
  },
  getters: {
    vx_gt_pageData (state) {
      return state.pageData;
    },
    vx_gt_activeElementUid (state) {
      return state.activeElementUid;
    },
    vx_gt_activeElementData (state) {
      return findActiveElement(state.pageData, state.activeElementUid);
    }
  },
  mutations: {
    ADD_PAGE (state, pageData = null) {
      if (!pageData) return;
      state.pageData = pageData;
    },
    ADD_ELEMENT (state, element = null) {
      if (!element) return;
      let finded = findActiveElement(state.pageData, state.activeElementUid);
      if (!finded) return;
      finded.elements.push(element);
    },
    SET_ACTIVEELEMENTPUID (state, puid = '') {
      if (!puid) return;
      state.activeElementPuid = puid;
    },
    SET_ACTIVEELEMENTUID (state, uid = '') {
      if (!uid) return;
      state.activeElementUid = uid;
    }
  },
  actions: {
    /* 设置激活元素id */
    vx_ac_SetActiveElementUid ({ commit, getters }, activeElementUid = '') {
      if (!activeElementUid) return;
      commit('SET_ACTIVEELEMENTUID', activeElementUid);
      commit('SET_ACTIVEELEMENTPUID', getters.vx_gt_activeElementData.puid);
    },
    /* 添加页面 */
    vx_ac_AddPage ({ commit }) {
      debugger;
      let _page = InitNewPage();
      commit('ADD_PAGE', _page);
      commit('SET_ACTIVEELEMENTPUID', _page.uid);
      commit('SET_ACTIVEELEMENTUID', _page.puid);
    },
    /* 添加元素组件 */
    vx_ac_AddElement ({ commit, getters }, elementData = null) {
      if (!elementData) return;
      let { vx_gt_activeElementData, vx_gt_activeElementUid } = getters;
      if (!isArray(vx_gt_activeElementData.elements)) {
        showMessage('当前元素不支持插入子元素');
        return;
      }
      let _elementData = InitNewElement(elementData);
      // 设置当前激活元素的id为其父ID
      _elementData.puid = vx_gt_activeElementUid;

      commit('ADD_ELEMENT', _elementData);
      commit('SET_ACTIVEELEMENTPUID', _elementData.puid);
      commit('SET_ACTIVEELEMENTUID', _elementData.uid);
    }
  }
};
