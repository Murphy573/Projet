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
  // 拷贝组件的prop和默认css
  let _elementData = deepClone(getComponentPropsAndCss(componentName));
  // 设置使用组件名称
  _elementData.componentName = componentName;
  // 生成uid
  _elementData.uid = generateUniqueIdByCustom(12);
  // 用组件定义的defaultCss值覆盖默认样式
  _elementData.css = Object.assign({}, copyCommonCss(), _elementData.defaultCss);
  // 删除默认样式
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

    /**
     * 递归创建组件数据
     * @param {Array} data 组件数据
     * @param {String} puid 父uid
     */
    let _map = (data, puid) => {
      return data.map(ele => {
        ele.uid = generateUniqueIdByCustom(12);
        ele.puid = puid;
        // 样式补全：因为保存的时候会去掉无用样式属性
        ele.css = Object.assign({}, copyCommonCss(), ele.css);
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
