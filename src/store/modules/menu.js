/**
 * 左侧导航问题
 */
import MenuConfig from '@/configs/menu';
import CheckPermission from '@/utils/permission';
import { deepClone } from '@/utils/object';
import Cookies from 'js-cookie';

// 初始化激活的导航
const INIT_ACTIVE_MENU = '';

/**
 * 递归过滤符合条件的路由
 */
function filterMenus (menus) {
  return menus.filter(menu => {
    if (CheckPermission(menu.meta.permissions)) {
      // 如果路由配置表里是嵌套路由
      if (menu.children) {
        menu.children = filterMenus(menu.children);
        // 过滤后的嵌套路由如果子路由长度不为0
        if (menu.children && menu.children.length) {
          return true;
        }
        return false;
      }
      else {
        return true;
      }
    }
  });
}

export default {
  state: {
    // 有权限的导航菜单
    menus: [],
    // 当前激活的导航
    activeMenu: '',
    // 侧边栏展开收起状态
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    }
  },
  mutations: {
    SET_MENUS (state, menus = []) {
      state.menus = menus;
    },
    SET_ACTIVE_MENU (state, menu) {
      state.activeMenu = menu;
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      }
      else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    }
  },
  getters: {
    vx_gt_Menus (state) {
      return state.menus;
    },
    vx_gt_ActiveMenu (state) {
      return state.activeMenu;
    },
    vx_gt_Sidebar (state) {
      return state.sidebar;
    }
  },
  actions: {
    vx_ac_GenerateMenus ({ commit }) {
      let _MenuConfig = deepClone(MenuConfig);
      let _menus = filterMenus(_MenuConfig);
      commit('SET_MENUS', _menus);
    },
    vx_ac_SetActiveMenu ({ commit }, menu = INIT_ACTIVE_MENU) {
      commit('SET_ACTIVE_MENU', menu);
    },
    // 重置所有state
    vx_ac_ResetSidebarState ({ commit }) {
      commit('SET_ACTIVE_MENU', INIT_ACTIVE_MENU);
      commit('SET_MENUS');
    },
    vx_ac_ToggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR');
    }
  }
};
