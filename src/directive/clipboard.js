import Clipboard from 'clipboard';
import { isPlainObj, isFunction, noop } from '../utils/common';

// 检测是否安装了clipboard
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ');
}

const DATA_CONTEXT = '_clipboard_data_context_',
  CLIPBOARD_CONTEXT = '_clipboard_context_';

const clipboard = {
  bind (el, binding) {
    if (!isPlainObj(binding.value)) {
      throw new Error(
        'you should pass in an object, like: {text: value, success: successFunction, error: errorFunction}'
      );
    }

    el[DATA_CONTEXT] = {
      text: binding.value.text,
      successCallback: binding.value.success || noop,
      errorCallback: binding.value.error || noop,
      arg: binding.arg === 'cut' ? 'cut' : 'copy'
    };

    const clipboard = new Clipboard(el, {
      text () {
        return el[DATA_CONTEXT].text;
      },
      action () {
        return el[DATA_CONTEXT].arg;
      }
    });

    clipboard.on('success', e => {
      const callback = el[DATA_CONTEXT].successCallback;
      isFunction(callback) && callback(e);
    });
    clipboard.on('error', e => {
      const callback = el[DATA_CONTEXT].errorCallback;
      isFunction(callback) && callback(e);
    });

    el[CLIPBOARD_CONTEXT] = clipboard;
  },
  update (el, binding) {
    if (!isPlainObj(binding.value)) {
      throw new Error(
        'you should pass in an object, like: {text: value, success: successFunction, error: errorFunction}'
      );
    }
    // 更新数据对象
    el[DATA_CONTEXT] = {
      text: binding.value.text,
      successCallback: binding.value.success,
      errorCallback: binding.value.error,
      arg: binding.arg === 'cut' ? 'cut' : 'copy'
    };
  },
  unbind (el) {
    delete el[DATA_CONTEXT];
    el[CLIPBOARD_CONTEXT].destroy();
    delete el[CLIPBOARD_CONTEXT];
  }
};

export default function (Vue) {
  Vue.directive('clipboard', clipboard);
}
