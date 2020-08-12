import Vue from 'vue';
const req = context => context.keys().map(context);
// 基础组件
const BaiscComponents = req(require.context('./basic', true, /\.vue$/));

let BasicList = [];
let RegisterComponentObject = {};

BaiscComponents.forEach(temp => {
  const instance = temp.default;
  let {
    name,
    dispayLabel,
    displayIconfont
  } = instance;
  Vue.component(name, instance);

  // 左侧选择面板展示
  if (dispayLabel && displayIconfont) {
    BasicList.push({
      componentName: name,
      type: 'Baisc',
      label: dispayLabel,
      icon: displayIconfont
    });
  }
  // 添加到注册map
  RegisterComponentObject[name] = instance;
});

export default [{ label: '基础组件', list: BasicList }];

export { RegisterComponentObject };
