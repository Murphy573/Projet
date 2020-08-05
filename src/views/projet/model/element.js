import { deepClone } from '@/utils/object';
import { generateUniqueIdByCustom } from '@/utils/string';
import { copyCommonCss } from './css';

/**
 * 初始化新元素
 */
export function InitNewElement (elementData) {
  let _elementData = deepClone(elementData);
  _elementData.uid = generateUniqueIdByCustom(12);
  _elementData.css = copyCommonCss();
  return _elementData;
}
