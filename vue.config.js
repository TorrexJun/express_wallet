'use strict'
const path = require('path')
const fs = require('fs')
module.exports = {
  pages: JSON.parse(fs.readFileSync(path.join(__dirname, 'config/page.index.json'), 'utf8')),
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/yishuActivity/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: process.env.NODE_ENV === 'development',

  configureWebpack: (config) => {
    config.entry.app = ['babel-polyfill', './src/main.js']
  },
  chainWebpack: config => {
    config.module.rule('scss').oneOf('vue').use('px2rem-loader').loader('px2rem-loader').before('postcss-loader').options({ remUnit: 37.5, remPrecision: 8 }).end()
    config.output.filename('[name].[hash].js').end();
  }
}
