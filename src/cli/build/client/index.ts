import * as path from 'path'
import * as _ from 'lodash'
import * as cp from 'child_process'
import * as models from '../../../models'
import * as lib from '../../../lib'
import * as app from '../../../app'

export function buildClient(g3Config: models.G3Config) {
  lib.copyAllToClientPath(g3Config)

  if (!lib.pathExists(g3Config._sourcePath)) return

  const sourceDirMap: models.SourceDirMap = app.parse(g3Config)

  lib.writeBabelRC(g3Config)

  // const paths = []
  // _.mapKeys(sourceDirMap, (sourceDir: models.SourceDir, key: string) => {
  //   let routePath = _.trim(application.getRoutePath(sourceDir), '/')
  //   if (routePath.indexOf('*') === -1 && routePath.indexOf(':') === -1) {
  //     if (!routePath) {
  //       routePath = '/'
  //     } else {
  //       routePath = '/' + routePath + '/'
  //     }
  //     if (paths.indexOf(routePath) === -1) {
  //       paths.push(routePath)
  //     }
  //   }
  // })

  const entryPath = path.join(g3Config._g3Path, 'app.jsx')
  const rel = lib.forwardSlash(path.relative(g3Config._appPath, entryPath))

  let uglifyJs = g3Config.build.uglifyJs ? `,
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })` : ''

  let devtool = g3Config.build.sourceMap ? 'source-map' : 'eval'

  let webpackConfigJS = `/* node ./node_modules/webpack/bin/webpack.js --config ./.g3/cli/build/webpack.config.js */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlPath = '${path.resolve(g3Config._appPath, "./index.html")}';
module.exports = {
    entry: './${rel}',
    output: {
      path: '${path.resolve(g3Config._clientPath, g3Config.build.path)}',
      publicPath: '${g3Config.build.publicPath}',
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".jsx", ".js"]
    },
    resolveLoader: {
      root: '${path.resolve(g3Config._appPath, "node_modules")}'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          loader: "file-loader"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: htmlPath,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()${uglifyJs}
    ],
    bail: true,
    devtool: '${devtool}'
}`
  lib.writeSync(path.join(g3Config._g3Path, 'cli', 'build', 'webpack.config.js'), webpackConfigJS)

  console.log('webpack build assets to ' + path.join(g3Config._clientPath, g3Config.build.path))

  cp.execSync('node ./node_modules/webpack/bin/webpack.js --config ./.g3/cli/build/webpack.config.js', {
    cwd: g3Config._appPath,
    stdio: ['ignore', 'ignore', 'pipe']
  })

  const html = lib.readFileSync(path.resolve(g3Config._clientPath, g3Config.build.path, "./index.html"))

  _.mapKeys(sourceDirMap, function(sourceDir: models.SourceDir, key: string) {
    const routePath = app.getRoutePath(sourceDir)
    lib.writeHTML(g3Config, routePath, html)
  });
}