/* 公共样式 */

import { deepClone } from '@/utils/object';

const NUMBER_PATTERN = /^[+-]?\d+(\.\d+)?([Ee][+-]?[\d]+)?$/;

const CommonCss = {
  width: 375,
  height: 40,
  // 边距
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  // 边框
  borderWidth: 0,
  borderStyle: 'none',
  borderColor: '',
  // borderTopWidth: 0,
  // borderTopColor: '',
  // borderTopStyle: 'solid',
  // borderRightWidth: 0,
  // borderRightColor: '',
  // borderRightStyle: 'solid',
  // borderBottomWidth: 0,
  // borderBottomColor: '',
  // borderBottomStyle: 'solid',
  // borderLeftWidth: 0,
  // borderLeftColor: '',
  // borderLeftStyle: 'solid',
  borderRadius: 0,
  // borderTopLeftRadius: 0,
  // borderTopRightRadius: 0,
  // borderBottomLeftRadius: 0,
  // borderBottomRightRadius: 0,
  // 文字
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: 1.2,
  textAlign: 'left',
  color: '',
  textDecoration: 'none',
  // 背景
  backgroundColor: '',
  backgroundImage: '',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  // 弹性盒子内项目缩小、放大比例
  flexShrink: 1,
  flexGrow: 1
};

/**
 * 需要增加单位的css属性
 */
const NeedUnitCssAttrs = [
  'width',
  'height',
  'top',
  'left',
  'paddingTop',
  'paddingLeft',
  'paddingRight',
  'paddingBottom',
  'marginTop',
  'marginLeft',
  'marginRight',
  'marginBottom',
  'fontSize',
  'borderWidth',
  'borderRadius',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'letterSpacing'
];

/**
 * 背景图片相关的key
 */
const BackgroundImageAttrs = ['backgroundImage', 'backgroundPosition', 'backgroundSize', 'backgroundRepeat'];

export function copyCommonCss () {
  return deepClone(CommonCss);
}

/**
 * 格式化css
 * @param {Object} cssObj css对象
 */
export function formatCommonCss (cssObj) {
  let style = {};

  for (let key in cssObj) {
    if (NeedUnitCssAttrs.includes(key)) {
      style[key] = cssObj[key] + (NUMBER_PATTERN.test(cssObj[key]) ? 'px' : '');
    }
    else {
      style[key] = cssObj[key];
    }
  }

  style.backgroundImage = style.backgroundImage
    ? `url(${style.backgroundImage})`
    : '';

  return style;
};

/**
 * 过滤无用的css属性，精简配置字符串大小
 * @param {Object} cssObj css对象
 */
export function filterUnusedCss (cssObj) {
  let _cssObj = Object.assign({}, cssObj);

  let style = {};

  for (let key in _cssObj) {
    let _cssValueOfKey = cssObj[key];
    // 需要添加样式单位的key
    if (NeedUnitCssAttrs.includes(key)) {
      if (Number(_cssValueOfKey) === 0 || !_cssValueOfKey) continue;
      style[key] = _cssValueOfKey;
    }
    else if (_cssValueOfKey !== '') {
      style[key] = _cssValueOfKey;
    }
  }
  // 如果背景图片不存在，那么与背景图相关的属性都无用处
  if (!style.backgroundImage) {
    BackgroundImageAttrs.forEach(bi => delete style[bi]);
  }
  // 边框
  if (!style.borderWidth || style.borderStyle === 'none') {
    delete style.borderStyle;
    delete style.borderWidth;
    delete style.borderColor;
  }
  // 删除浏览器默认文字相关样式
  if (style.fontWeight === 'normal') {
    delete style.fontWeight;
  }
  if (style.textAlign === 'left') {
    delete style.textAlign;
  }
  if (style.textDecoration === 'none') {
    delete style.textDecoration;
  }

  return style;
}
