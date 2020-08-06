
import { deepClone } from '@/utils/object';
import { generateUniqueIdByCustom } from '@/utils/string';
import { copyCommonCss } from './css';
import { getComponentPropsAndCss } from '../utils/element';

const PageComponentName = 'ProjetPage';
/**
 * 初始化新页面
 */
export function InitNewPage () {
  let uid = generateUniqueIdByCustom(12);
  let _pageData = deepClone(getComponentPropsAndCss(PageComponentName));
  _pageData.componentName = PageComponentName;
  // 用组件定义的defaultCss值覆盖默认样式
  _pageData.css = Object.assign({}, copyCommonCss(), _pageData.defaultCss);
  delete _pageData.defaultCss;

  return Object.assign({}, {
    uid,
    puid: uid,
    root: true
  }, _pageData);
}
