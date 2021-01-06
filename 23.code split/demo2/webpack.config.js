const { resolve } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  // 单入口
  entry: './src/js/index.js',
  // entry: {
  //   index: './src/js/index.js',
  //   test: './src/js/test.js'
  // },
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
  /*
    1.可以将node_modules中代码单独打包一个chunk最终输出
    2.自动分析多入口chunk中,有没有公共的文件(文件不可太小).如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production' // 生产环境下,js自动压缩
  // devServer: {
  //   port: 3000,
  //   open: true
  // }
}