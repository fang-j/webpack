const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'built')
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use:[
          // 创建style标签,将样式放入
          // 'style-loader',
          // MiniCssExtractPlugin.loader,
          // 这个loader取代style-loader. 作用: 提取js中的css文件成单独文件
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          // 将css文件整合到js文件中
          'css-loader'
        ]
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development',
  devServer:{
    open: true,
    port: 8888
  }
}