const getItem = (type, args) => {
  if (!args.length || !type) return null;
  else if (args.length === 1) {
    return window[type].getItem(args[0]);
  }
  else {
    const storage = {};
    args.forEach(arg => {
      storage[arg] = window[type].getItem(arg) || null;
    });
    return storage;
  }
};

const setItem = (type, args) => {
  if (!args.length || !type) return null;
  else if (
    args.length === 1 &&
    Object.prototype.toString.call(args[0]) === '[object Object]'
  ) {
    let data = args[0];
    Object.keys(data).forEach(key => {
      let value = data[key];
      window[type].setItem(key, value);
    });
  }
  else {
    window[type].setItem(args[0], args[1]);
  }
};

const removeItem = (type, args) => {
  if (!args.length || !type) return null;
  else if (args.length === 1) {
    window[type].removeItem(args[0]);
  }
  else {
    args.forEach(arg => {
      window[type].removeItem(arg);
    });
  }
};

/**
 * 构造自定义storage
 * @param {String} type localStorage || sessionStorage
 */
const build = type => {
  return {
    type,
    /**
     * 获取
     * 使用方式：
     *  1、getItem('key') return 'value' ， 即原有方式
     *  2、getItem('key1', 'key2', ..) return {key1: value1,key2: value2,...}，即：输入多个字符串key，返回key组成的对象
     * @param  {...any} args 参数
     */
    getItem (...args) {
      return getItem(this.type, args);
    },
    /**
     * 设置
     * 使用方式：
     *  1、setItem('key', 'value')， 即原有方式
     *  2、setItem({key1: value1,key2: value2,...})，即：key组成的对象，key1代表在storage中中的key
     * @param  {...any} args 参数
     */
    setItem (...args) {
      setItem(this.type, args);
    },
    /**
     * 删除
     * 使用方式：
     *  1、removeItem('key')， 即原有方式
     *  2、removeItem('key1', 'key2', ..)，即：输入多个字符串key，可以删除多个storage存储
     * @param  {...any} args 参数
     */
    removeItem (...args) {
      removeItem(this.type, args);
    }
  };
};

const MyStorage = {
  sessionStorage: build('sessionStorage'),
  localStorage: build('localStorage')
};

export default MyStorage;
