
import { deepClone } from '@/utils/object';
import { generateUniqueIdByCustom } from '@/utils/string';
import { copyCommonCss } from './css';
import { getComponentPropsAndCss } from '../utils/element';

const PageComponentName = 'ProjetPage';
/**
 * 初始化新页面
 */
export function InitNewPage () {
  // 生成uid
  let uid = generateUniqueIdByCustom(12);
  // 拷贝组件的prop和默认css
  let _pageData = deepClone(getComponentPropsAndCss(PageComponentName));
  // 设置使用组件名称
  _pageData.componentName = PageComponentName;
  // 用组件定义的defaultCss值覆盖默认样式
  _pageData.css = Object.assign({}, copyCommonCss(), _pageData.defaultCss);
  // 删除默认样式
  delete _pageData.defaultCss;

  return Object.assign({}, {
    uid,
    puid: uid,
    root: true
  }, _pageData);
}
