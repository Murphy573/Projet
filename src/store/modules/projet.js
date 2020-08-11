/* 编辑器核心 */
import { InitNewPage } from '@/views/projet/model/page';
import { InitBasicElement, InitComplexElement } from '@/views/projet/model/element';
import {
  findActiveElement,
  genElementTree,
  findActiveElementInParentIndex
} from '@/views/projet/utils/element';
import { showMessage } from '@/views/projet/utils/common';
import { isArray } from '@/utils/common';
import History from '@/views/projet/utils/history';

export default {
  namespaced: true,
  state: {
    pageData: {},
    // 当前激活元素父id
    activeElementPuid: null,
    // 当前激活元素id
    activeElementUid: null,
    // 复制的元素JSON串
    copiedElement: '',
    // 历史缓存索引
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
    // 获取复制的元素数据
    vx_gt_copiedElementData (state) {
      return state.copiedElement;
    },
    // 生成组件tree
    vx_gt_genElementsTree (state) {
      return genElementTree(state.pageData);
    },
    // 是否可以复制：不能复制根元素
    vx_gt_canCopy (state) {
      return state.activeElementUid !== state.pageData.uid;
    },
    // 是否可以粘贴：复制的元素json存在
    vx_gt_canPaste (state) {
      return !!state.copiedElement;
    },
    // 是否可以前移
    vx_gt_canMoveForward (state, getters) {
      let {
        vx_gt_activeRootElement,
        vx_gt_activeElementParentData,
        vx_gt_activeElementUid
      } = getters;

      if (vx_gt_activeRootElement) {
        return false;
      }

      let _index = findActiveElementInParentIndex(vx_gt_activeElementParentData, vx_gt_activeElementUid);

      return _index > 0;
    },
    // 是否可以后移
    vx_gt_canMoveBackward (state, getters) {
      let {
        vx_gt_activeRootElement,
        vx_gt_activeElementParentData,
        vx_gt_activeElementUid
      } = getters;

      if (vx_gt_activeRootElement) {
        return false;
      }

      let _index = findActiveElementInParentIndex(vx_gt_activeElementParentData, vx_gt_activeElementUid);

      return _index < vx_gt_activeElementParentData.props.elements.length - 1;
    },
    // 是否可以删除元素：不能删除根元素
    vx_gt_canDelElement (state) {
      return state.activeElementUid !== state.pageData.uid;
    },
    // 是否可以撤销
    vx_gt_canUndo (state) {
      return state.curHistoryIndex > 0;
    },
    // 是否可以反撤销
    vx_gt_canRedo (state) {
      return state.curHistoryIndex < History.length - 1;
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
    },
    SET_CURHISTORYINDEX (state, index = -1) {
      state.curHistoryIndex = index;
    },
    SET_COPIEDELEMENT (state, element = '') {
      if (!element) {
        state.copiedElement = '';
        return;
      };
      state.copiedElement = element;
    },
    /* 前移或者后移 */
    SET_MOVEFORWARDANDBACKWORD (state, data) {
      let { parentElements, index, flag } = data;
      if (flag === 'forward') {
        let _prev = parentElements[index - 1];
        let _cur = parentElements[index];
        parentElements.splice(index - 1, 2, _cur, _prev);
      }
      else if (flag === 'backward') {
        let _next = parentElements[index + 1];
        let _cur = parentElements[index];
        parentElements.splice(index, 2, _next, _cur);
      }
    },
    /* 删除元素 */
    DEL_ELEMENT (state, data) {
      let { parentElements, index } = data;
      parentElements.splice(index, 1);
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
    vx_ac_AddPage ({ commit, dispatch }) {
      let _page = InitNewPage();
      commit('ADD_PAGE', _page);
      commit('SET_ACTIVEELEMENTPUID', _page.uid);
      commit('SET_ACTIVEELEMENTUID', _page.puid);

      dispatch('vx_ac_AddHistory');
    },
    /* 添加元素组件 */
    vx_ac_AddElement ({ commit, getters, dispatch }, componentName = null) {
      if (!componentName) return;
      let { vx_gt_activeElementData, vx_gt_activeElementUid } = getters;
      if (!isArray(vx_gt_activeElementData.props.elements)) {
        showMessage('当前元素不支持插入子元素');
        return;
      }
      let _elementData = InitBasicElement(componentName);
      // 设置当前激活元素的id为其父ID
      _elementData.puid = vx_gt_activeElementUid;

      commit('ADD_ELEMENT', _elementData);
      commit('SET_ACTIVEELEMENTPUID', _elementData.puid);
      commit('SET_ACTIVEELEMENTUID', _elementData.uid);

      dispatch('vx_ac_AddHistory');
    },
    /* 添加组合组件 */
    vx_ac_AddComplexElement ({ commit, getters, dispatch }, componentJson = '') {
      if (!componentJson) return;
      let { vx_gt_activeElementData, vx_gt_activeElementUid } = getters;
      if (!isArray(vx_gt_activeElementData.props.elements)) {
        showMessage('当前元素不支持插入子元素');
        return;
      }
      let _elementDatas = InitComplexElement(componentJson, vx_gt_activeElementUid);

      if (isArray(_elementDatas) && _elementDatas.length) {
        _elementDatas.forEach(el => {
          commit('ADD_ELEMENT', el);
        });

        let { puid, uid } = _elementDatas[_elementDatas.length - 1];
        commit('SET_ACTIVEELEMENTPUID', puid);
        commit('SET_ACTIVEELEMENTUID', uid);
        dispatch('vx_ac_AddHistory');
      }
    },
    /* 复制元素 */
    async vx_ac_CopyElement ({ commit, getters }) {
      try {
        let { vx_gt_activeRootElement, vx_gt_activeElementData } = getters;
        if (vx_gt_activeRootElement) {
          showMessage('不能复制根元素！');
          return false;
        }
        commit('SET_COPIEDELEMENT', JSON.stringify(vx_gt_activeElementData));
        return vx_gt_activeElementData.props.title;
      }
      catch (error) {
        return false;
      }
    },
    /* 粘贴元素 */
    vx_ac_PasteElement ({ getters, dispatch, commit }) {
      // 调用组合组件添加方法
      dispatch('vx_ac_AddComplexElement', getters.vx_gt_copiedElementData);
      // 重置
      commit('SET_COPIEDELEMENT', '');
    },
    /* 前移和后移 */
    vx_ac_MoveForwardAndBackward ({ getters, commit, dispatch }, flag = 'forward') {
      let {
        vx_gt_activeElementParentData,
        vx_gt_activeElementUid
      } = getters;

      let _index = findActiveElementInParentIndex(vx_gt_activeElementParentData, vx_gt_activeElementUid);

      commit('SET_MOVEFORWARDANDBACKWORD', {
        parentElements: vx_gt_activeElementParentData.props.elements,
        index: _index,
        flag
      });
      dispatch('vx_ac_AddHistory');
    },
    /* 删除元素 */
    vx_ac_DelElement ({ getters, commit, dispatch }) {
      let {
        vx_gt_activeElementParentData,
        vx_gt_activeElementUid
      } = getters;

      let _index = findActiveElementInParentIndex(vx_gt_activeElementParentData, vx_gt_activeElementUid);

      commit('DEL_ELEMENT', {
        parentElements: vx_gt_activeElementParentData.props.elements,
        index: _index
      });
      commit('SET_ACTIVEELEMENTPUID', vx_gt_activeElementParentData.puid);
      commit('SET_ACTIVEELEMENTUID', vx_gt_activeElementParentData.uid);
      dispatch('vx_ac_AddHistory');
    },
    /* 添加历史记录 */
    vx_ac_AddHistory ({ getters, commit }) {
      let { vx_gt_pageData, vx_gt_activeElementUid, vx_gt_activeElementPuid } = getters;

      History.add({
        pageData: vx_gt_pageData,
        uid: vx_gt_activeElementUid,
        puid: vx_gt_activeElementPuid
      });
      commit('SET_CURHISTORYINDEX', History.index);
    },
    /* 撤销，反撤销 */
    vx_ac_UndoAndRedo ({ commit }, flag = 'undo') {
      let historyData = {};
      if (flag === 'undo') {
        historyData = History.getPrev();
      }
      else if (flag === 'redo') {
        historyData = History.getNext();
      }

      if (!historyData) {
        showMessage('未找到历史记录数据！');
      }
      else {
        let { pageData, uid, puid } = historyData;
        commit('ADD_PAGE', pageData);
        commit('SET_ACTIVEELEMENTPUID', puid);
        commit('SET_ACTIVEELEMENTUID', uid);
        commit('SET_CURHISTORYINDEX', History.index);
      }
    }
  }
};
