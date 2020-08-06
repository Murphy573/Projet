/* 属性类型映射的组件配置 */

/**
 * 基础写法
 * props: {
 *    text: {
 *      type: String,
 *      default: '这是一段文字'
 *      editor: {
 *        type: PROJET_ATTR_STRING,
 *        label: '属性展示名'
 *      }
 *    }
 * }
 */
// 输入 string
export const PROJET_ATTR_STRING = 'AttrInput';
// 输入 number
export const PROJET_ATTR_NUMBER = 'AttrNumber';
// 图片上传
export const PROJET_ATTR_IMAGEUPLOAD = 'AttrImageUpload';
// 颜色选择
export const PROJET_ATTR_COLORPICKER = 'AttrColorpicker';
// 链接
export const PROJET_ATTR_LINK = 'AttrLink';
// 下拉选择，editor写法举例
// 写法参考：editor: {type: PROJET_SELECT, options: [{label: '1', value: '1'}...]}
export const PROJET_ATTR_SELECT = 'AttrSelect';
// 开关switch
// 写法参考：AttrSwitch组件的options属性注释
export const PROJET_ATTR_SWITCH = 'AttrSwitch';
// 单选框 radio
// 写法参考：editor: {type: PROJET_ATTR_RADIO, options: [{label: '1', value: '1'}...]}
export const PROJET_ATTR_RADIO = 'AttrRadio';
// 多选框 checkbox
// 写法参考：editor: {type: PROJET_ATTR_CHECKBOX, options: [{label: '1', value: '1'}...]}
export const PROJET_ATTR_CHECKBOX = 'AttrCheckbox';
// 日期组件
export const PROJET_ATTR_DATETIME = 'AttrDatetime';
