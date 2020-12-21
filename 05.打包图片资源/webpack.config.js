const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'built')
  },
  module: {
    rules:[
      {
        test: /\.less$/,
        // use里面放数组就是要使用多个loader
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 问题:处理不了html中img图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader file-loader
        loader: 'url-loader',
        options:{
          // 图片大小小于8kb,就会被base64处理
          // 优点:减少请求数量(减轻服务器压力)
          // 缺点: 图片体积会更大(文件请求速度更慢)
          limit: 8 * 1024,
          // 给图片进行重命名
          // [hash:10]取图片的hash前10位
          // [ext]取文件原来的扩展名(jpg|png之类的)
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
  mode: 'development'
}