import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import menu from './modules/menu';
import tagsView from './modules/tagsView';
import user from './modules/user';
import Projet from '@/views/projet/store/projet';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    menu,
    tagsView,
    user,
    Projet
  }
});

export default store;
