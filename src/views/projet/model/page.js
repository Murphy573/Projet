
import { deepClone } from '@/utils/object';
import { isPlainObj, isArray } from '@/utils/common';
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

/**
 * 从模版json中初始化页面
 * @param {String} tplJson
 */
export function InitTemplatePage (tplJson) {
  try {
    let pageData = JSON.parse(tplJson);
    let _pageData = [];
    if (isPlainObj(pageData)) {
      _pageData = [pageData];
    }
    else if (isArray(pageData)) {
      _pageData = pageData;
    }

    /**
     * 递归创建页面数据
     * @param {Array} data 模版数据
     * @param {String} puid 父uid
     */
    let _map = (data, puid) => {
      return data.map(ele => {
        ele.uid = generateUniqueIdByCustom(12);
        // 是否是根结点
        if (!ele.root) {
          ele.puid = puid;
        }
        else {
          ele.puid = ele.uid;
        }
        // 样式补全：因为保存的时候会去掉无用样式属性
        ele.css = Object.assign({}, copyCommonCss(), ele.css);
        let elements = ele.props.elements;

        if (isArray(elements) && elements.length) {
          ele.props.elements = _map(elements, ele.uid);
        }

        return ele;
      });
    };

    return _map(_pageData)[0];
  }
  catch (error) {
    return null;
  }
}
