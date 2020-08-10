import Vue from 'vue';
import ProjetPage from './ProjetPage/index.vue';
import ProjetFlexContainer from './ProjetFlexContainer/index.vue';
import ProjetText from './ProjetText/index.vue';
import ProjetSample from './ProjetSample/index.vue';
import ProjetImage from './ProjetImage/index.vue';

const Components = [
  ProjetPage,
  ProjetText,
  ProjetImage,
  ProjetSample,
  ProjetFlexContainer
];

Components.forEach(component => {
  Vue.component(component.name, component);
});

let RegisterComponentObject = {};
Components.forEach(item => {
  RegisterComponentObject[item.name] = item;
});

export { RegisterComponentObject };
