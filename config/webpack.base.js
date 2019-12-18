const Config = require('webpack-chain')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const configs = require('./configuration')

const config = new Config()

Object.keys(configs.ENTRY).forEach(name =>
  config.entry(name).add(configs.ENTRY[name]),
)

/** js */
config.module
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
config.module
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
config.module
  .rule('image')
  .test(/\.(png|jpg|gif|svg|webp)/)
  .exclude.add(/node_modules/)
  .end()
  .use('url')
  .loader('url-loader')
  .options({
    limit: 8192,
  })

/** plugin */
config.plugin('html').use(HtmlWebPackPlugin, [
  {
    cache: true,
    favicon: configs.FAVICON,
    title: configs.TITLE,
    template: './public/index.html',
    filename: './index.html',
    inject: true,
    hash: true,
    meta: configs.META,
    minify: { collapseWhitespace: true },
    showErrors: true,
    xhtml: true,
  },
])

/** resolve */
/** alias */
Object.keys(configs.ALIAS).forEach(name => {
  config.resolve.alias.set(name, configs.ALIAS[name])
})

/** 用于描述的 JSON 文件 */
config.resolve.descriptionFiles.add('package.json')

/** 自动解析确定的扩展 */
config.resolve.extensions
  .add('.ts')
  .add('.tsx')
  .add('.js')
  .add('.jsx')
  .add('.json')

config.resolve.mainFields
  .add('jsnext:main')
  .add('browser')
  .add('main')

/** 解析目录时要使用的文件名。 */
config.resolve.mainFiles.add('index')

config.resolve.modules.add(configs.MODULES).add('node_modules')

module.exports = config
