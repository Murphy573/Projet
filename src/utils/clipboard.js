import Clipboard from 'clipboard';
import { isFunction, noop } from './common';

// 检测是否安装了clipboard
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ');
}

export default function ({
  action = 'copy',
  text = 'clipboard',
  success = noop,
  error = noop,
  event = null
} = {}) {
  // 检测event是否是事件对象
  if (!(event instanceof Event)) {
    throw new Error('you should pass in an Event');
  }
  const clipboard = new Clipboard(event.target, {
    text: () => text,
    action: () => (action === 'cut' ? 'cut' : 'copy')
  });

  clipboard.on('success', e => {
    isFunction(success) && success(e);
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });
  clipboard.on('error', e => {
    isFunction(error) && error(e);
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });

  clipboard.onClick(event);
}
