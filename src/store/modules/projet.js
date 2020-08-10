/* 编辑器核心 */
import { InitNewPage } from '@/views/projet/model/page';
import { InitNewElement } from '@/views/projet/model/element';
import {
  findActiveElement,
  genElementTree
} from '@/views/projet/utils/element';
import { showMessage } from '@/views/projet/utils/common';
import { isArray } from '@/utils/common';

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
    // 当前激活元素的uid
    vx_gt_activeElementUid (state) {
      return state.activeElementUid;
    },
    // 当前激活元素的父元素uid
    vx_gt_activeElementPuid (state) {
      return state.activeElementPuid;
    },
    // 是否激活的是根元素
    vx_gt_activeRootElement (state) {
      return state.activeElementUid === state.pageData.uid;
    },
    // 获取激活元素数据
    vx_gt_activeElementData (state) {
      return findActiveElement(state.pageData, state.activeElementUid);
    },
    // 获取激活元素父元素数据
    vx_gt_activeElementParentData (state) {
      return findActiveElement(state.pageData, state.activeElementPuid);
    },
    // 生成组件tree
    vx_gt_genElementsTree (state) {
      return genElementTree(state.pageData);
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
      finded.props.elements.push(element);
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
      let _page = InitNewPage();
      commit('ADD_PAGE', _page);
      commit('SET_ACTIVEELEMENTPUID', _page.uid);
      commit('SET_ACTIVEELEMENTUID', _page.puid);
    },
    /* 添加元素组件 */
    vx_ac_AddElement ({ commit, getters }, componentName = null) {
      if (!componentName) return;
      let { vx_gt_activeElementData, vx_gt_activeElementUid } = getters;
      if (!isArray(vx_gt_activeElementData.props.elements)) {
        showMessage('当前元素不支持插入子元素');
        return;
      }
      let _elementData = InitNewElement(componentName);
      // 设置当前激活元素的id为其父ID
      _elementData.puid = vx_gt_activeElementUid;

      commit('ADD_ELEMENT', _elementData);
      commit('SET_ACTIVEELEMENTPUID', _elementData.puid);
      commit('SET_ACTIVEELEMENTUID', _elementData.uid);
    }
  }
};
