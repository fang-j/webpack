const { resolve } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  // 单入口  单页面
  // entry: './src/js/index.js',
  entry: {
    // 多入口:有一个入口,最终输出就有一个bundle  多页面
    main: './src/js/index.js',
    test: './src/js/test.js'
  },
  output:{
    // [name]: 取文件名 入口名 main|test
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'built')
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      // 压缩html
      minify: {
        collapseInlineTagWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production' // 生产环境下,js自动压缩
  // devServer: {
  //   port: 3000,
  //   open: true
  // }
}