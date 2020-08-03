import _cloneDeep from 'lodash.clonedeep';

/**
 * 深拷贝
 * @param {Object} target 目标拷贝对象
 */
export function deepClone (target) {
  return _cloneDeep(target);
}

/**
 * 根据路径path获取路径对应的值
 * @param {Object} obj 目标对象
 * @param {String} path 路径，exmp: a.b.c
 * @param {Boolean} strict 严格模式
 */
export function getPropByPath (obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    }
    else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
}

/**
 * 判断传入的参数是否都相等
 * @param  {...any} args 参数
 */
export function deepCompare (...args) {
  /* eslint-disable */
  let i, l, leftChain, rightChain;

  function compare2Objects (x, y) {
    let p;
    // 判断NaN和undefined
    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === 'number' &&
      typeof y === 'number'
    ) {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }
  // 如果长度小于1，默认返回true
  if (args.length < 1) {
    return true;
  }
  // 循环判断传入的对象参数是否都相等
  for (i = 1, l = args.length; i < l; i++) {
    leftChain = []; // Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(args[0], args[i])) {
      return false;
    }
  }

  return true;
}
