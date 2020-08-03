/**
 * 生成笛卡尔积
 * @param {Array<Array<Sting|Number>>} array 二维数组
 * @example generateDescartes([[1,2], ['a','b']]) -> [[1,'a'],[1,'b'],[2,'a'],[2,'b']]
 */
export function generateDescartes (array) {
  if (array.length < 2) return array[0] || [];
  return array.reduce((col, set) => {
    let res = [];
    col.forEach(function (c) {
      set.forEach(function (s) {
        let t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      });
    });
    return res;
  });
}

/**
 * 深度扁平化数组
 * @param {Array} array
 * @example deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
 */
export function deepFlatten (array) {
  return array.reduce((newArr, v) => {
    return newArr.concat(Array.isArray(v) ? deepFlatten(v) : v);
  }, []);
}

/**
 * 两个数组之间的差值
 * @param {Array} arr1
 * @param {Array} arr2
 * @example difference([1,2,3], [1,2]) -> [3]
 */
export function difference (arr1, arr2) {
  const set = new Set(arr2);
  return arr1.filter(x => !set.has(x));
}

/**
 * 比较多个乱序数组是否完全相等
 * @param  {...any<Array>} args 可以传入多个数组
 * @example compareArraySor1(['我','爱你', '祖国'],['我','祖国','爱你'],['我','爱你', '祖国']) -> true
 * @example compareArraySor1([1,2,3],[2,3,1],[3,1,2]) -> true
 * @returns {Boolean}
 */
export function compareArraySort (...args) {
  if (args.length < 2) {
    throw new Error('请至少传入两个以上的数组');
  }

  const compare = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    // 进行排序
    arr1 = arr1.sort();
    arr2 = arr2.sort();

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  let flag = true;
  let init = args[0];

  for (let i = 1; i < args.length; i++) {
    flag = compare(init, args[i]);
    if (!flag) {
      return false;
    }
  }
  return true;
}
