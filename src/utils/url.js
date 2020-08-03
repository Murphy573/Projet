import { isPlainObj } from './common';
/**
 * 获取url中指定的参数
 * @param {String} name 参数名
 * @param {String} url 传入的url
 * @returns {String} 参数值
 */
export function getUrlParam (name, url = null) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = url
    ? new URL(url).search.substr(1).match(reg)
    : window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 将url中的参数转为object
 * @param {String} url url
 * @returns {Object}
 */
export function convertUrlParam2Obj (url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  );
}

/**
 * 将对象转为url参数
 * @param {Object} obj 传入的对象
 */
export function convertObj2UrlParam (obj) {
  if (!obj) return '';
  return Object.keys(obj)
    .map(key => {
      if (obj[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    })
    .join('&');
}

/**
 * 拼接URL参数
 * @param {String} url url
 * @param {Object} paramObj 参数
 */
export function appendUrlParams (url, paramObj) {
  if (!url) return '';
  if (!paramObj || !isPlainObj(paramObj)) return url;

  let paramArr = [];
  for (let key in paramObj) {
    paramArr.push(`${key}=${paramObj[key]}`);
  }

  return url.includes('?')
    ? `${url}&${paramArr.join('&')}`
    : `${url}?${paramArr.join('&')}`;
}

/**
 * 删除url中指定的参数
 * @param {String} url 网址字符串
 * @param {Array<String>} params 参数名称列表
 */
export function deleteUrlParams (url, params) {
  if (!url || !Array.isArray(params)) return url;
  params.forEach(item => {
    let pattern = '&*' + item + '=([^&]*)';
    if (url.match(pattern)) {
      url = url.replace(url.match(pattern)[0], '');
    }
  });
  return url;
}
