import Vue from 'vue';
import Router from 'vue-router';
import routes from './router-config';

/* 解决NavigationDuplicated error：跳转重复路由 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
  mode: process.env.VUE_APP_Router_Mode,
  routes
});
