const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css代码

/*
    tree shaking: 去除无用代码
      前提:1.必须使用ES6模块化 2.开启production环境
      作用: 减少代码体积

      在package.json中配置
      "sideEffects": false  所有代码都没有副作用(都可以进行tree shaking)
        问题: 可能会把css / @babel/polyfill (副作用)文件干掉
        "sideEffects": ["*.css"]
 */



// 定义nodejs环境,决定使用browserslist哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  'css-loader',
  {
    // 还需要在package.json定义browserslist对象进行兼容浏览器
    loader: 'postcss-loader',
    options:{
      ident: 'postcss',
      plugins: () => {
        require('postcss-preset-env')()
      }
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output:{
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'built')
  },
  module:{
    rules: [
      {
        // eslint配置
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下loader只会匹配一个
        // 注意:不能有两个配置处理同一种类型的文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test:/\.less$/,
            use: [
              ...commonCssLoader,
              // less转换为css 才能被postcss做兼容性处理
              'less-loader'
            ]
          },
          /*
            正常来讲,一个文件只能被一个loader处理
            当一个文件要被多个loader处理,那么一定要指定loader执行的先后顺序
             先执行eslint 在执行babel
          */
          {
            // js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets:{
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ],
              // 开启babel缓存
              // 第二次构建时,会读取之前的缓存
              cacheDirectory: true
            }
          },
          // 图片
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb,就会被base64处理
              limit: 8 * 1024,
              // 给图片进行重命名
              // [hash:10]取图片的hash前10位
              // [ext]取文件原来的扩展名(jpg|png之类的)
              name: '[hash:10].[ext]',
              // 输出路径
              outputPath: 'imgs',
              esModule: false
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          // 排除需要处理的文件类型,其他类型的文件原封不动输出
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options:{
              outputPath: 'media'
            }
          }
        ]
      }
     
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
      // 压缩html
      // minify: {
      //   collapseInlineTagWhitespace: true,
      //   removeComments: true
      // }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production', // 生产环境下,js自动压缩
  devtool: 'source-map'
  // devServer: {
  //   port: 3000,
  //   open: true
  // }
}