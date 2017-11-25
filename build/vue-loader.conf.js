var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction,
    less: 'vue-style-loader!css-loader!less-loader',
    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
    scss: 'vue-style-loader!css-loader!sass-loader',
    stylus: 'vue-style-loader!css-loader!stylus-loader'
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
