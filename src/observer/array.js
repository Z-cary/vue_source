let oldArryProto = Array.prototype;
// 创新代理原型，对代理原型进行重写
export let newArrayProto = Object.create(oldArryProto);
// 记录会改变原数组的方法
let methods = ["push", "prop", "shift", "unshifr", "reverse", "splice", "sort"];
methods.forEach((method) => {
  newArrayProto[method] = function (...args) {
    //重写数组方法
    const result = oldArryProto[method].call(this, ...args); // 内部调用原来的方法，也叫函数劫持，切片编程
    let inserted;
    let ob = this.__ob__;
    switch(method) {
        case 'push':
        case 'unshift':
            inserted = args;
            break;
        case 'splice': // splice(start, num, value)
            inserted = args.slice(2); // 将参数进行截取，只要最后的值，对值进行劫持
        default:
            break;

    }
    if(inserted) {
        ob.arrayOberser(inserted)
    }
    return result;
  };
});
