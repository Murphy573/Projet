
import { PROJET_ATTR_LINK } from './attr.editor';
/**
 * 创建组件：可以添加一些公共属性
 * @param {config} 组件配置
 * @param {Boolean} hasElements 是否含有子组件
 */
export default function (config, hasElements = false) {
  if (!config.props) {
    config.props = {};
  }
  // uid
  config.props.uid = {
    type: String,
    default: ''
  };
  // 样式
  config.props.css = {
    type: Object,
    default () {
      return {};
    }
  };
  // 跳转链接
  if (config.name !== 'ProjetPage') {
    config.props.jumpLink = {
      type: String,
      default: '',

      editor: {
        label: '点击跳转',
        type: PROJET_ATTR_LINK
      }
    };
  }
  // 是否支持嵌套
  if (hasElements) {
    config.props.elements = {
      type: Array,
      default () {
        return [];
      }
    };
  }

  return config;
}
