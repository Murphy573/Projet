export function noop () {}

export function transferTargetType (target) {
  return Object.prototype.toString.call(target);
}

export function isString (target) {
  return typeof target === 'string';
}

export function isObject (target) {
  return transferTargetType(target) === '[object Object]';
}

export function isNull (target) {
  return transferTargetType(target) === '[object Null]';
}

export function isUndefined (target) {
  return transferTargetType(target) === '[object Undefined]';
}

export function isArray (target) {
  return transferTargetType(target) === '[object Array]';
}

export function isRegExp (target) {
  return transferTargetType(target) === '[object RegExp]';
}

export function isDate (target) {
  return transferTargetType(target) === '[object Date]';
}

export function isFunction (target) {
  return transferTargetType(target) === '[object Function]';
}

export function isBoolean (target) {
  return transferTargetType(target) === '[object Boolean]';
}

export function isNumber (target) {
  return transferTargetType(target) === '[object Number]';
}

export function isPlainObj (target) {
  return !isNull(target) && isObject(target);
}
