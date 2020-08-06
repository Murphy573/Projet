
/**
 * 创建组件：可以添加一些公共属性
 * @param {config} 组件配置
 * @param {Boolean} hasElements 是否含有子组件
 */
export default function (config, hasElements = false) {
  if (!config.props) {
    config.props = {};
  }
  config.props.css = {
    type: Object,
    default () {
      return {};
    }
  };

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
