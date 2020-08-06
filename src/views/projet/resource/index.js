import Vue from 'vue';
import ProjetPage from './ProjetPage/index.vue';
import ProjetText from './ProjetText/index.vue';
import ProjetSample from './ProjetSample/index.vue';

const Components = [
  ProjetPage,
  ProjetText,
  ProjetSample
];

Components.forEach(component => {
  Vue.component(component.name, component);
});

let RegisterComponentObject = {};
Components.forEach(item => {
  RegisterComponentObject[item.name] = item;
});

export { RegisterComponentObject };
