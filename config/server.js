const ip = require('ip')
const portfinder = require('portfinder')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const WebpackDev = require('./webpack.dev')
const configuration = require('./configuration')

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = configuration.PORT
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      WebpackDev.devServer.port(port)
      /** 输出控制台信息 */
      WebpackDev.plugin('friend').use(FriendlyErrorsWebpackPlugin, [
        {
          clearConsole: true,
          compilationSuccessInfo: {
            messages: [
              `Project is running at http://${configuration.HOST ||
                'localhost'}:${port}`,
            ],
            notes: [`localhost IP: ${ip.address()}`],
          },
          onErrors: function(severity, errors) {
            console.error(severity, errors)
          },
        },
      ])
      resolve(WebpackDev.toConfig())
    }
  })
})
