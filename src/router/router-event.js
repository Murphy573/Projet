import router from '.';
import store from '../store';
import { Message } from 'element-ui';
import { setRedirectRouter } from '@/utils/redirect';
// progress bar
import NProgress from 'nprogress';
// progress bar style
import 'nprogress/nprogress.css';
import checkPermission from '@/utils/permission';
// NProgress Configuration
NProgress.configure({ showSpinner: false });

/**
 * 判断是否有权限：去执行跳转
 */
function jump (to, next) {
  if (checkPermission(to.meta.permissions)) {
    // 当路由改变时：设置激活路由menuMapper或者路由name
    store.dispatch('vx_ac_SetActiveMenu', to.meta.menuMapper || to.name);
    next();
  }
  else {
    Message.warning('您没有权限进入此页面，已为您重定向到首页！');
    jumpDashboard(next);
  }
}

/**
 * 跳转到登录页面
 */
function jumpLogin (to, from, next) {
  next({
    name: 'login',
    query: {
      redirect: to.fullPath
    },
    replace: true
  });
  NProgress.done();
}

/**
 * 跳转到首页
 */
function jumpDashboard (next) {
  setRedirectRouter({ name: 'dashboard' });
  next({ name: 'redirect', replace: true });
  NProgress.done();
}

/**
 * 拦截判断逻辑：
 * 1、判断是否存在TOKEN
 *    判断跳转的路由name是Login还是设置了禁止跳转的路由，
 *      是：跳转到dashboard
 *      否：判断权限列表是否存在
 *         不存在：获取权限并进行权限路由跳转逻辑
 *         存在：进行权限路由跳转逻辑
 * 2、判断是不是白名单
 * 3、否则跳转到login
 */
router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  if (store.getters.vx_gt_GetToken) {
    if (to.name === 'login' || to.meta.forbiddenJump || !to.matched.length) {
      jumpDashboard(next);
    }
    else {
      let _permissions = store.getters.vx_gt_GetPermissions;
      if (!Array.isArray(_permissions) || !_permissions.length) {
        store
          .dispatch('vx_ac_GetUserInfo')
          .then(() => {
            // 正常跳转判断
            jump(to, next);
          })
          .catch(error => {
            store.dispatch('vx_ac_FrontendLogout').then(() => {
              Message.error(error || '用户校验失败，请重新登录！');
              jumpLogin(to, from, next);
            });
          });
      }
      else {
        jump(to, next);
      }
    }
  }
  else if (to.meta.isWhiteList === true) {
    next();
  }
  else {
    jumpLogin(to, from, next);
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
