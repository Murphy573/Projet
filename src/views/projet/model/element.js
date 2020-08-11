import { deepClone } from '@/utils/object';
import { isPlainObj, isArray } from '@/utils/common';
import { generateUniqueIdByCustom } from '@/utils/string';
import { copyCommonCss } from './css';
import { getComponentPropsAndCss } from '../utils/element';

/**
 * 根据组件名称初始化基础组件
 * @param {String} componentName 组件名称
 */
export function InitBasicElement (componentName) {
  let _elementData = deepClone(getComponentPropsAndCss(componentName));
  _elementData.componentName = componentName;
  _elementData.uid = generateUniqueIdByCustom(12);
  // 用组件定义的defaultCss值覆盖默认样式
  _elementData.css = Object.assign({}, copyCommonCss(), _elementData.defaultCss);
  delete _elementData.defaultCss;
  return _elementData;
}

/**
 * 根据组合组件JSON串生成新的组件元素
 * @param {String} componentJson 组合组件的JSON串
 * @param {String} puid 要添加到的父元素uid
 */
export function InitComplexElement (componentJson, puid) {
  try {
    let elementsData = JSON.parse(componentJson);
    let _elementsData = [];
    if (isPlainObj(elementsData)) {
      _elementsData = [elementsData];
    }
    else if (isArray(elementsData)) {
      _elementsData = elementsData;
    }

    let _map = (data, puid) => {
      return data.map(ele => {
        ele.uid = generateUniqueIdByCustom(12);
        ele.puid = puid;
        let elements = ele.props.elements;

        if (isArray(elements) && elements.length) {
          ele.props.elements = _map(elements, ele.uid);
        }

        return ele;
      });
    };

    return _map(_elementsData, puid);
  }
  catch (error) {
    return null;
  }
}
