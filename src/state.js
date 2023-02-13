import { observer } from "./observer/index.js";
export function initState(vm) {
  const ops = vm.$options;
  if (!ops) return;
  if (ops.data) {
    initData(vm);
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newVal) {
      vm[target][key] = newVal
    }
  })
}

function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === "function" ? data.call(vm) : data;
  vm._data = data; //进行数据的挂载 
  // 对数据进行深度劫持 object.defineProperty
  observer(data)
  // 将data 代理到 vm._data
  for(let key in data) {
    proxy(vm, '_data', key)
  }
}
