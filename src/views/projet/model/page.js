
import { deepClone } from '@/utils/object';
import { generateUniqueIdByCustom } from '@/utils/string';
import { copyCommonCss } from './css';

const Page = {
  uid: null,
  puid: null,
  title: '页面标题',
  desc: '',
  root: true,
  width: 375,
  height: 644,
  elements: []
};

/**
 * 初始化新页面
 */
export function InitNewPage () {
  let uid = generateUniqueIdByCustom(12);
  return Object.assign(deepClone(Page), {
    uid,
    puid: uid,
    css: copyCommonCss()
  });
}
