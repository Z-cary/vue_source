// rollup默认导出一个对象 作为打包的配置文件
import babel from "rollup-plugin-babel"
export default {
    input: "./src/index.js", //入口文件
    output: {
        file: "./dis/vue.js", //出口文件
        name: 'Vue', //挂载全局变量  global.Vue
        format: "umd", //esm es6模块 commonjs模块 iife自执行函数 umd  (打包方式)
        sourcemap: true, //希望可以调试代码
    },
    plugin: [
        babel({
            exclude: "node_modules/**" //排除所有模块
        })
    ],
}