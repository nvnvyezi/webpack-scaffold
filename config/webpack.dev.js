const webpack = require('webpack')
const ip = require('ip')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const webpackBase = require('./webpack.base')
const configs = require('./configuration')

webpackBase.mode('development').devtool('cheap-module-eval-source-map')

webpackBase.devServer
  /** 压缩 */
  .compress(true)
  .headers(configs.HEADERS)
  .host(configs.HOST || 'localhost')
  .hot(true)
  // .hotOnly(true)
  .https(configs.HTTPS)
  .inline(true)
  .open(configs.OPEN)
  .port(configs.PORT)
  .progress(true)
  .proxy(configs.PROXY)
  .quiet(true)
  .stats(configs.STATS || 'minimal')

/** 热更新 */
webpackBase.plugin('hot').use(webpack.HotModuleReplacementPlugin)

/** 输出控制台信息 */
webpackBase.plugin('friend').use(FriendlyErrorsWebpackPlugin, [
  {
    clearConsole: true,
    compilationSuccessInfo: {
      messages: [`Project is running at http://localhost:${configs.PORT}/`],
      notes: [`or open: http://${ip.address()}:${configs.PORT}`],
    },
    onErrors: function(severity, errors) {
      console.error(severity, errors)
    },
  },
])

module.exports = webpackBase.toConfig()
