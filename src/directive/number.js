import { isRegExp } from '@/utils/common';
import { debounce } from '@/utils/debounce-throttle';

/* 限制输入框只能输入number类型 */
const Price_Pattern = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?)/;
const Integer_Pattern = /^(0|[1-9]\d*)/;
/**
 * 整数处理
 * @param {*} value
 */
const IntegerHandle = value => {
  let _match = value.toString().match(Integer_Pattern);
  if (_match != null) return _match[0];
  return '';
};

/**
 * 金额处理
 * @param {*} value
 */
const PriceHandle = value => {
  let _match = value.toString().match(Price_Pattern);
  if (_match != null) return _match[0];
  return '';
};

/**
 * 自定义处理
 * @param {*} value 输入的值
 * @param {RegExp} regexp 正则
 * @param {{match:true, replace:true}}} modifiers replace or match
 */
const CustomHandle = (value, regexp, modifiers) => {
  if (!isRegExp(regexp)) return value;
  if (modifiers.replace) {
    return value.toString().replace(regexp, '');
  }
  let _match = value.toString().match(regexp);
  if (_match != null) return _match[0];
  return '';
};

/**
 * 参考 https://github.com/vuejs/Discussion/issues/157#issuecomment-273301588
 * 触发事件以便通知vue进行数据更新
 * @param {*} el
 * @param {*} type
 */
const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

/**
 * 输入框输入只能输入数字（整数和浮点型）
 * 使用方式：v-number:integer.replace="RegExp"
 * :integer(默认)：可以替换成price，整数还是金额格式，忽略.replace和match
 * .replace(默认)：可以替换为match，字符串处理的方式
 * RegExp：传入的正则，当值存在时忽略integer/price，处理方式取决于.replace还是.match
 */
const Number = {
  bind (el, binding) {
    let {
      arg = 'integer',
      modifiers = { replace: true },
      value: regexp
    } = binding;
    // 搜索input
    let _input = el;
    if (_input.tagName.toUpperCase() !== 'INPUT') {
      _input = _input.querySelector('input');
    }
    if (!_input) return;
    // 分情况绑定处理函数
    let handler;
    if (regexp) {
      handler = value => {
        return CustomHandle(value, regexp, modifiers);
      };
    }
    else if (arg === 'integer') {
      handler = IntegerHandle;
    }
    else {
      handler = PriceHandle;
    }
    // 监听事件，去抖的方式执行处理函数
    _input.onkeyup = debounce(() => {
      _input.value = handler(_input.value);
      trigger(_input, 'input');
    }, 500);
    _input.onblur = debounce(() => {
      _input.value = handler(_input.value);
      trigger(_input, 'input');
    }, 500);
  }
};

export default function (Vue) {
  Vue.directive('number', Number);
}
