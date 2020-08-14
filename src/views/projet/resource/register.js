import Vue from 'vue';
const req = context => context.keys().map(context);
// 基础组件
const BaiscComponents = req(require.context('./basic', true, /\.vue$/));
// 复合组件
const ComplexComponents = req(require.context('./complex', true, /\.json$/));

/* 基础组件 */
let BasicList = [];
let RegisterComponentObject = {};
BaiscComponents.forEach(temp => {
  const instance = temp.default;
  let {
    name,
    displayLabel,
    displayIcon
  } = instance;
  Vue.component(name, instance);

  // 左侧选择面板展示
  if (displayLabel && displayIcon) {
    BasicList.push({
      componentName: name,

      label: displayLabel,
      icon: displayIcon
    });
  }
  // 添加到注册map
  RegisterComponentObject[name] = instance;
});

/* 复合组件 */
let ComplexList = [];
ComplexComponents.forEach(temp => {
  let { displayLabel, displayIcon, configs } = temp;
  ComplexList.push({
    configs: JSON.stringify(configs),
    label: displayLabel,
    icon: displayIcon
  });
});

export default [
  { label: '基础组件', type: 'Basic', list: BasicList },
  { label: '复合组件', type: 'Complex', list: ComplexList }
];

export { RegisterComponentObject };
