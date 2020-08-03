import store from '@/store';
import Vue from 'vue';

/**
 * @param {Array} value
 * @returns {Boolean}
 */
const checkPermission = function (perms) {
  // 不传入值或者格式不对，不进行权限校验，就认为有权限
  if (!perms || !Array.isArray(perms)) return true;
  if (perms.length > 0) {
    const permissions = store.getters && store.getters.vx_gt_GetPermissions;

    let hasPermission = false;

    if (permissions.indexOf('*') >= 0) {
      hasPermission = true;
    }
    else {
      hasPermission = permissions.some(perm => {
        return perms.includes(perm);
      });
    }

    if (!hasPermission) {
      return false;
    }
    return true;
  }
  else {
    return false;
  }
};

/**
 * 注册到全局：判断是否有权限
 * @param {String} value 权限码
 */
Vue.prototype.$permission = checkPermission;

export default checkPermission;
