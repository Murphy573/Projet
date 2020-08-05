/* 公共样式 */

import { deepClone } from '@/utils/object';

const CommonCss = {
  width: 375,
  height: 40,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  borderWidth: 0,
  borderColor: '',
  borderStyle: 'solid',
  borderRadius: 0,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 1.2,
  textAlign: 'left',
  color: '#333333',
  backgroundColor: '',
  backgroundImage: '',
  backgroundSize: 'cover',
  opacity: 1
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
    'borderWidth',
    'fontSize',
    'borderRadius',
    'letterSpacing'
  ];

  let style = {};

  for (let key in cssObj) {
    if (needUnitStr.includes(key)) {
      style[key] = cssObj[key] + 'px';
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
