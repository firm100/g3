import * as path from 'path'
import * as _ from 'lodash'
import * as models from '../../models'
import * as lib from '../../lib'
import * as app from '../../app'
import { serve } from '../serve'

export function run(appPath) {
  const g3Config: models.G3Config = app.getG3Config(appPath, models.Const.COMMAND_RUN)
  if (!g3Config) return console.error('fatal: Not found G3 config file: g3.yml')

  if (!lib.pathExists(g3Config._sourcePath)) return serve(appPath)

  const sourceDirMap: models.SourceDirMap = app.parse(g3Config)

  app.watch(g3Config, sourceDirMap)

  var port = g3Config.run.port || '9393'

  lib.writeBabelRC(g3Config)

  const entryPath = path.join(g3Config._g3Path, 'app.jsx')
  const rel = lib.forwardSlash(path.relative(g3Config._appPath, entryPath))

  const webpackConfigJS = `/* node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config ./.g3/cli/run/webpack.config.js */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlPath = '${lib.osPath(path.resolve(g3Config._appPath, "./index.html"))}';
module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:${port}',
    'webpack/hot/only-dev-server',
    "./${rel}"
  ],
  output: {
    path: '${lib.osPath(g3Config._appPath)}',
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".jsx", ".js"]
  },
  resolveLoader: {
    root: '${lib.osPath(path.resolve(g3Config._appPath, "node_modules"))}'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel']
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
  devServer: {
    contentBase: '${lib.osPath(g3Config._appPath)}',
    port: ${port},
    noInfo: ${g3Config.run.noInfo},
    stats: { colors: true },
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: htmlPath,
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "sourcemap",
  debug: true
}`
  lib.writeSync(path.join(g3Config._g3Path, 'cli', 'run', 'webpack.config.js'), webpackConfigJS)

  const spawn = require('child_process').spawn;
  const child = spawn(
    'node',
    [
      path.join(g3Config._appPath, 'node_modules/webpack-dev-server/bin/webpack-dev-server.js'),
      '--config',
      './.g3/cli/run/webpack.config.js'
    ],
    {
      cwd: g3Config._appPath
    }
  );
  child.on('error', function(e){console.log(e)});
  child.stdout.pipe(process.stdout);
  console.log("G3 running on port", port);
}
