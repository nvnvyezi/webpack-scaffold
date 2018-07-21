// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

const publicConfig = {
  devtool: 'cheap-module-source-map',
  // entry: {
  //   app: [
  //       path.join(__dirname, '../src/index.js')
  //   ],
  //   vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  // },
  // output: {
  //   path: path.join(__dirname, '.././dist'),
  //   filename: '[name].[chunkhash].js',
  //   chunkFilename: '[name].[chunkhash].js',
  //   publicPath: '/'
  // },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: ['babel-loader'],
      //   include: path.join(__dirname, '../src')
      // }, 
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader"]
          })
      }, 
      // {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [{
      //         loader: 'url-loader',
      //         options: {
      //             limit: 8192
      //         }
      //   }]
      // }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: path.join(__dirname, '../src/index.html')
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime'
    // }),
    new CleanWebpackPlugin(['../dist/*.*']),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true
    })
  ],

  // resolve: {
  //   alias: {
  //     pages: path.join(__dirname, '../src/pages/'),
  //     components: path.join(__dirname, '../src/components'),
  //     router: path.join(__dirname, '../src/router')
  //   }
  // }
};

module.exports = merge(commonConfig, publicConfig);