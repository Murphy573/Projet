import MyStorage from './storage';

const REDIRECT_SESSION_KEY = 'REDIRECT_ROUTER';

/**
 * 设置重定向路由信息
 * @param {{name: String, query: {}, params: {}, meta: {}}} routerInfo 路由信息
 */
export function setRedirectRouter (routerInfo) {
  MyStorage.sessionStorage.setItem(
    REDIRECT_SESSION_KEY,
    JSON.stringify(routerInfo)
  );
}

/**
 * 获取存储的重定向路由信息
 */
export function getRedirectRouter () {
  try {
    const _getted = JSON.parse(
      MyStorage.sessionStorage.getItem(REDIRECT_SESSION_KEY)
    );
    MyStorage.sessionStorage.removeItem(REDIRECT_SESSION_KEY);
    return _getted;
  }
  catch (error) {
    MyStorage.sessionStorage.removeItem(REDIRECT_SESSION_KEY);
    return null;
  }
}
