const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'built')
  },
  module:{
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|jpeg|gif)/,
        loader: 'url-loader',
        options:{
          limit: 8 * 1024,
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片(负责引入img,从而能被url-loader进行处理)
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',

  // 开发服务器 devServer: 用来自动化(自动编译,自动打开浏览器,自动刷新浏览器)
  // 特点: 只会在内存中编译打包,不会有任何输出
  // 启动devServer指令: npx webpack serve
  devServer:{
    // 项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 8888,
    // 自动打开浏览器
    open: true
  }
}