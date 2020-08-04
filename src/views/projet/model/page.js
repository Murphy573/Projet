
import { deepClone } from '@/utils/object';
import { generateUniqueIdByCustom } from '@/utils/string';

const Page = {
  uid: null,
  title: '页面标题',
  desc: '',
  root: true,
  elements: []
};

/**
 * 初始化新页面
 */
export function InitNewPage () {
  return Object.assign(deepClone(Page), { uid: generateUniqueIdByCustom(12, 16) });
}
