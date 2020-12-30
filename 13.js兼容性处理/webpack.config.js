const { resolve } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'dist')
  },
  module:{
    rules: [
      /*
        js兼容性处理: babel-loader @babel/core @babel/preset-env
        1.基本js兼容性处理 --> @babel/preset-env
        问题: 只能转换基本语法,如promise高级语法不能转换
        2.全部js兼容性处理 --> @babel/polyfill 直接在js文件中引入即可
        问题: 我只要解决部分兼容性问题,但是将所有兼容性代码全部引入,体积太大了
        3.需要做兼容性处理的就做: 按需加载 -->core-js

        需要第一个和第三个配合时候就可以兼容全部js了
      */
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       options: {
         // 预设:指示babel做怎么样的兼容性处理
         presets: [
           [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                corejs:{
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets:{
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
           ]
          ]
       }
     }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}