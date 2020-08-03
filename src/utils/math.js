/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

// 数字校验：支持科学计数法
const NUMBER_PATTERN = /^[+-]?\d+(\.\d+)?([Ee][+-]?[\d]+)?$/;

/**
 * 判断是否是数字：数字字符串也认为是数字
 * @param {Number|String} num
 */
function checkNumber (num) {
  if (!NUMBER_PATTERN.test(num)) {
    throw new Error(`${num} is not a number`);
  }
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {Number} num 输入数
 * @param {Boolean} checkBoundaryFlag 是否检测边界
 */
function checkBoundary (num, checkBoundaryFlag = false) {
  checkNumber(num);

  if (!checkBoundaryFlag) return;
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    throw new Error(
      `${num} is beyond boundary when transfer to integer, the results may not be accurate`
    );
  }
}

/**
 * 把错误的数据转正
 * @param {Number} num 输入数
 * @param {Number} precision
 * @example  strip(0.09999999999999998)=0.1
 */
function strip (num, precision = 12) {
  checkNumber(num);

  return +parseFloat(num.toPrecision(precision));
}

/**
 * 返回浮点数小数位长度
 * @param {Number} num 输入数
 */
function digitLength (num) {
  checkNumber(num);

  // 科学记数法
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {Number} num 输入数
 */
function float2Fixed (num) {
  checkNumber(num);

  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}

/**
 * 精确乘法
 * @param {Number} num1 输入数1
 * @param {Number} num2 输入数2
 */
export function times (num1, num2) {
  checkNumber(num1);
  checkNumber(num2);

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

/**
 * 精确加法
 * @param {Number} num1 输入数1
 * @param {Number} num2 输入数2
 */
export function plus (num1, num2) {
  checkNumber(num1);
  checkNumber(num2);

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 精确减法
 * @param {Number} num1 输入数1
 * @param {Number} num2 输入数2
 */
export function minus (num1, num2) {
  checkNumber(num1);
  checkNumber(num2);

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 精确除法
 * @param {Number} num1 输入数1
 * @param {Number} num2 输入数2
 */
export function divide (num1, num2) {
  checkNumber(num1);
  checkNumber(num2);

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);

  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times(
    num1Changed / num2Changed,
    strip(Math.pow(10, digitLength(num2) - digitLength(num1)))
  );
}

/**
 * 四舍五入
 * @param {Number} num 输入数
 * @param {Number} ratio 保留几位小数
 */
export function round (num, ratio = 0) {
  checkNumber(num);

  const base = Math.pow(10, ratio);
  return divide(Math.round(times(num, base)), base);
}
