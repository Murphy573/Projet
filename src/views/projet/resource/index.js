import Vue from 'vue';
import ProjectText from './ProjetText/index.vue';

const Components = [
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
