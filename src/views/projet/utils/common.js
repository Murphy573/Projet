import { Message } from 'element-ui';

/**
 * 请求出错的消息提示
 * @param {String} msg 错误消息
 */
export function showMessage (msg, type = 'warning') {
  Message({
    message: msg,
    type: type,
    duration: 4 * 1000
  });
}
