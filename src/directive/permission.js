import CheckPermission from '@/utils/permission';

const permission = {
  inserted (el, binding) {
    const { value } = binding;
    let _hasPermission = CheckPermission(value);
    if (!_hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};

export default function (Vue) {
  Vue.directive('permission', permission);
}
