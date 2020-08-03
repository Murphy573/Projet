import Vue from 'vue';
// 引入全局filter
import * as filters from './global';

// 设置全局filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
