import { isPlainObj, isArray } from '@/utils/common';

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
  else if (isArray(elementsData.elements)) {
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
        if (isArray(d.elements)) {
          findFunc(d.elements);
        }
        return false;
      }
    });
  };

  findFunc(_elementsData);

  return finded;
};
