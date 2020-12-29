/*
   开发环境配置: 能让代码运行
   运行项目指令
   webpack 会将打包结果输出出去
   npx webpack serve 只会在内存中编译打包,不会输出
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'built')
  },
  module:{
    rules: [
      {
        // 处理less资源
        test: /\.less$/,
        use: ['style-loader','css-loader', 'less-loader']
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options:{
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 处理其他资源
        exclude: /\.(html|css|js|less|jpg|png|gif)/,
        loader: 'file-loader',
        options:{
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer:{
    contentBase: resolve(__dirname, 'built'),
    compress: true, // 一切服务都启用gzip 压缩：
    port: 8888,
    open: true
  }
}