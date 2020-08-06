import { isPlainObj, isArray } from '@/utils/common';
import { RegisterComponentObject } from '../resource';

/**
 * 找出唯一id指定的元素
 * @param {Object|Array} elementsData 页面数据
 * @param {String} uid 唯一id
 * @return {Object} 找到的元素
 */
export const findActiveElement = (elementsData, uid) => {
  let _elementsData = [];
  if (isPlainObj(elementsData)) {
    _elementsData = [elementsData];
  }
  else if (isArray(elementsData)) {
    _elementsData = elementsData;
  }
  let finded = null;

  let findFunc = (data) => {
    return data.some(d => {
      if (finded) {
        return true;
      }
      if (d.uid === uid) {
        finded = d;
        return true;
      }
      else {
        if (isArray(d.props.elements)) {
          findFunc(d.props.elements);
        }
        return false;
      }
    });
  };

  findFunc(_elementsData);

  return finded;
};

/**
 * 获取组件的props和默认样式
 * @param {String} componentName 组件名称
 */
export function getComponentPropsAndCss (componentName) {
  let elComponentData;
  for (let key in RegisterComponentObject) {
    if (key.toLowerCase() === componentName.toLowerCase()) {
      elComponentData = RegisterComponentObject[key];
      break;
    }
  }
  if (!elComponentData) return {};

  let defaultCss = elComponentData.defaultCss || {};
  let props = {};
  for (let key in elComponentData.props) {
    props[key] =
      [Object, Array].includes(elComponentData.props[key].type)
        ? elComponentData.props[key].default()
        : elComponentData.props[key].default;
  }

  return { props, defaultCss };
}

/**
 * 获取组件的编辑属性
 * @param {String} componentName 组件名称
 */
export function getComponentPropsEditors (componentName) {
  let elComponentData;
  for (let key in RegisterComponentObject) {
    if (key.toLowerCase() === componentName.toLowerCase()) {
      elComponentData = RegisterComponentObject[key];
      break;
    }
  }
  if (!elComponentData) return [];

  let editorList = [];

  for (let key in elComponentData.props) {
    // elements为嵌套属性（不可以编辑），css由公共样式编辑
    if (key === 'elements' || key === 'css') continue;
    // 获取prop的编辑配置
    let editor = elComponentData.props[key].editor;
    // editor不存在或者不为对象，跳过
    if (!editor || !isPlainObj(editor)) continue;

    let { label, type, options, groups } = editor;
    editorList.push({
      propKey: key,
      label,
      renderType: type,
      options: options || [],
      groups: groups || []
    });
  }

  return editorList;
}
