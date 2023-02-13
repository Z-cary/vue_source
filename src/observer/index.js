class Observer {
  constructor(data) {
    // object.defineProperty只能劫持已经存在的属性(vue为此单独写了一些 api $set $delete)
    this.walk(data);
  }
  /**
   *
   * @param {Object} data
   */
  walk(data) {
    // '重新定义'属性
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
}
/**
 * 进行属性劫持
 * @param {object} target 
 * @param {需要劫持的属性} key 
 * @param {值} value 
 */
export function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if(value === newValue) return;
      value = newValue
    },
  });
}
/**
 * 进行数据劫持
 * @param {object} data 
 * @returns 
 */
export function observer(data) {
  // 判断是否是对象
  if (typeof data != "object" || data == null) return;
  // 判断对象是否已被劫持(判断一个对象是否已经被劫持，可以添加实例，用实例来判断是否被劫持过)

  return new Observer(data);
}
