/*
  webpack.config.js webpack的配置文件
  作用:指示webpack干那些活(当你运行webpack指令时,会加载里面的配置)
  所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs
*/

const { resolve } = require('path');

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  // 输出
  output:{
    filename: 'built.js', // 输出文件名
    // 输出路径
    // __dirname 是nodejs的变量,代表当前文件(webpack.config.js)的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader的配置
  // 不同文件必须配置不同的loader处理
  module: {
    rules:[
      // 详细loader配置
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use:[
          // use数组中loader执行顺序:从右到左,从下到到上 依次执行
          // 创建style标签,将js中的样式资源插入进行,添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中,里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          'less-loader'
        ]
      }
    
    ]
  },
  // plugins的配置
  plugins:[
    // 详细plugins的配置
  ],
  // 模式
  mode: 'development' // 开发模式
  // mode: 'production'
}