// 引入element
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局css
import '@/styles/index.scss';

import Vue from 'vue';
import App from './App';
// 状态管理
import store from './store';
// 路由
import router from './router/index';
// 国际化
import i18n from './i18n';
// 路由拦截
import './router/router-event';

import './icons'; // icon
import './directive';
// 引入全局filter
import './filters';

Vue.use(Element, { size: 'small', zIndex: 3000 });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
