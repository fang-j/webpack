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
        语法检查:eslint-loader eslint 
        注意:只检查自己写的源代码,第三方的库是不用检查的
        设置检查规则: package.json中eslintConfig中设置
         "eslintConfig": {
            "extends": "airbnb-base" // 继承airbnb-base代码规格
          },
        airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
       */
      {
        test:/\.js$/,
        exclude: /node_modules/, // 排除node_modules代码检查
        loader: 'eslint-loader',
        options: {
          // 自动修改eslint代码
          fix: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ]
}