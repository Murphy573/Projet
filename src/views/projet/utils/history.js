export default {
  // 记录的数组
  history: [],
  // 当前索引
  index: -1,
  // 最多记录50步
  maxLength: 50,
  /**
   * 获取历史记录长度
   */
  get length () {
    return this.history.length;
  },
  /**
  * 获取前一个数据
  */
  getPrev () {
    let prev = this.index - 1;
    let prevData = this.history[prev];
    if (prevData) {
      this.index = prev;
      try {
        prevData = JSON.parse(prevData);
      }
      catch (e) {
        prevData = null;
      }
    }
    return prevData;
  },
  /**
  * 获取下一个记录
  */
  getNext () {
    let next = this.index + 1;
    let nextData = this.history[next];
    if (nextData) {
      this.index = next;
      try {
        nextData = JSON.parse(nextData);
      }
      catch (e) {
        nextData = null;
      }
    }
    return nextData;
  },
  /**
   * 添加记录
   * @param {Object} data 要记录的数据
   */
  add (data) {
    if (!data) return;
    let index = this.index;
    let startIndex = 0;
    let length = this.history.length;
    // 如果当前索引不是历史记录最后一个，截取0到当前索引+1，之后的操作舍弃
    // 如果长度等于最大记录长度，截取1到最大长度
    if (!(index === length - 1 && length < this.maxLength)) {
      startIndex = Math.max(index + 2 - this.maxLength, 0);
      this.history = this.history.slice(startIndex, index + 1);
    }
    this.history.push(JSON.stringify(data));
    this.index = this.history.length - 1;
  }
};
