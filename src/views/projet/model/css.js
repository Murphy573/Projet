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
  // 弹性盒子缩小
  flexShrink: 0,
  flexGrow: 0
};

export function copyCommonCss () {
  return deepClone(CommonCss);
}

export function formatCommonCss (cssObj) {
  let needUnitStr = [
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

  let style = {};

  for (let key in cssObj) {
    if (needUnitStr.includes(key)) {
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
