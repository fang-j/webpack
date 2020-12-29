const { resolve } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置node.js环境变量
// process.env.NODE_ENV = 'development';
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            // options:{
            //   publicPath: '../'
            // }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options:{
              ident: 'postcss',
              plugins: () => [
                // postcss插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development',
  devServer:{
    open: true,
    port: 8888,
    hot: true
  }
}