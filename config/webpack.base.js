const WebpackChain = require('webpack-chain')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const configs = require('./configuration')

const webpackChain = new WebpackChain()

Object.keys(configs.ENTRY).forEach(name =>
  webpackChain.entry(name).add(configs.ENTRY[name]),
)

/** js */
webpackChain.module
  .rule('js')
  .test(/\.(jsx?|tsx?)$/)
  .exclude.add(/node_modules/)
  .end()
  .use('script')
  .loader('babel-loader')
  .options({
    ...require('./babel-options'),
  })

/** style */
webpackChain.module
  .rule('css')
  .test(/\.(c|le)ss$/)
  .use('style')
  .loader(
    configs.MODE_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
  )
  .end()
  .use('css')
  .loader('css-loader')
  .end()
  .use('less')
  .loader('less-loader')

/** 图片 */
webpackChain.module
  .rule('image')
  .test(/\.(png|jpg|gif|svg|webp)/)
  .exclude.add(/node_modules/)
  .end()
  .use('url')
  .loader('url-loader')
  .options({
    limit: 8192,
  })
/** pug */
webpackChain.module
  .rule('pug')
  .test(/\.pug$/)
  .use('pug')
  .loader('pug-loader')

/** plugin */
webpackChain.plugin('html').use(HtmlWebPackPlugin, [
  {
    title: configs.TITLE,
    meta: configs.META,
    favicon: configs.FAVICON,
    template: './public/index.pug',
    hash: true,
    xhtml: true,
  },
])

/** resolve */
/** alias */
Object.keys(configs.ALIAS).forEach(name => {
  webpackChain.resolve.alias.set(name, configs.ALIAS[name])
})

/** 用于描述的 JSON 文件 */
webpackChain.resolve.descriptionFiles.add('package.json')

/** 自动解析确定的扩展 */
webpackChain.resolve.extensions
  .add('.ts')
  .add('.tsx')
  .add('.js')
  .add('.jsx')
  .add('.json')

webpackChain.resolve.mainFields
  .add('jsnext:main')
  .add('browser')
  .add('main')

/** 解析目录时要使用的文件名。 */
webpackChain.resolve.mainFiles.add('index')

webpackChain.resolve.modules.add(configs.MODULES).add('node_modules')

module.exports = webpackChain