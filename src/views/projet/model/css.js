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
  lineHeight: 1.4,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '',
  backgroundImage: '',
  backgroundSize: 'cover',
  opacity: 1
};

export function copyCommonCss () {
  return deepClone(CommonCss);
}
