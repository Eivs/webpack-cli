let webpack = require("webpack")
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let devMiddleWare = require('webpack-dev-middleware')
let hotMiddleWare = require('webpack-hot-middleware')
let ExtractTextPlugin = require("extract-text-webpack-plugin")

let baseConfig = require('./webpack.base.config')

let devOption = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/main.js'
    ],
  },
  output: {
    path: '/dist',
    filename: '[name].[hash].min.js'
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin('./css/[name].[hash].min.css'),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}

module.exports = function(app) {

  let webpackconfig = Object.assign({}, baseConfig, devOption)

  var compiler = webpack(webpackconfig)

  app.use(devMiddleWare(compiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }))

  app.use(hotMiddleWare(compiler))

  return app
}
