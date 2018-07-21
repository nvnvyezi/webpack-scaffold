const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require('./webpack.common.config');

const devConfig = {
  // 入口
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname, '../src/index.js')
    ],
    // vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  // 出口
  output: {
    // path: path.join(__dirname, '.././dist'),
    filename: '[name].[hash].js',
    // chunkFilename: '[name].[chunkhash].js'
  },
  plugins:  [
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: path.join(__dirname, '../src/index.html')
  //   }),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor'
  //   })
  ],
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: ['babel-loader?cacheDirectory=true'],
      //   include: path.join(__dirname, `../src`)
      // },
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        use: [{
            loader: 'eslint-loader', 
            options: { fix: true }
        }],
        include: path.resolve(__dirname, './src/**/*.js'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', "postcss-loader"]
      },
      // {
      //   test: /\.less$/,
      //   use: [{
      //       loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //       loader: "css-loader" // translates CSS into CommonJS
      //   }, {
      //       loader: "less-loader", options: {
      //         strictMath: true,
      //         noIeCompat: true,
      //         paths: [
      //           path.resolve(__dirname, "node_modules")
      //         ],
      //         plugins: [
      //           new CleanCSSPlugin({ advanced: true })
      //         ],
      //         sourceMap: true
      //     } // compiles Less to CSS
      //   }]
      // },
      // use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
// fallback:编译后用什么loader来提取css文件
// publicfile:用来覆盖项目路径,生成该css文件的文件路径
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options:{
                modules:true,
                importLoaders:1,
                localIdentName:'[local]_[hash:base64:5]',
              }
            },
            {
              loader:'less-loader',
            },
          ],
        }),
      }
      // {
      //   test: /\.less$/,
      //   loader: 'style-loader!css-loader!less-loader'
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //         limit: 8192
      //     }
      //   }]
      // }
    ]
  },
  // 静态文件服务器
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    compress: true,
    // quiet: true
    clientLogLevel: 'none',
    noInfo: true
  },
  // resolve: {
  //   // 别名
  //   alias: {
  //     pages: path.join(__dirname, '../src/pages/'),
  //     components: path.join(__dirname, '../src/components'),
  //     router: path.join(__dirname, '../src/router')
  //   }
  // },
  devtool: 'inline-source-map'
}

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);