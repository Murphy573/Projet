import { deepClone } from '@/utils/object';
import { generateUniqueIdByCustom } from '@/utils/string';
import { copyCommonCss } from './css';
import { getComponentPropsAndCss } from '../utils/element';

/**
 * 初始化新元素
 */
export function InitNewElement (componentName) {
  let _elementData = deepClone(getComponentPropsAndCss(componentName));
  _elementData.componentName = componentName;
  _elementData.uid = generateUniqueIdByCustom(12);
  // 用组件定义的defaultCss值覆盖默认样式
  _elementData.css = Object.assign({}, copyCommonCss(), _elementData.defaultCss);
  delete _elementData.defaultCss;
  return _elementData;
}
