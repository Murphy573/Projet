import Vue from 'vue';
import ProjetPage from './ProjetPage/index.vue';
import ProjectText from './ProjetText/index.vue';

const Components = [
  ProjetPage,
  ProjectText
];

Components.forEach(component => {
  Vue.component(component.name, component);
});

let RegisterComponentObject = {};
Components.forEach(item => {
  RegisterComponentObject[item.name] = item;
});

export { RegisterComponentObject };
