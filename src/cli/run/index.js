"use strict";
var path = require("path");
var models = require("../../models");
var lib = require("../../lib");
var app = require("../../app");
var serve_1 = require("../serve");
function run(appPath) {
    var g3Config = app.getG3Config(appPath, models.Const.COMMAND_RUN);
    if (!g3Config)
        return console.error('fatal: Not found G3 config file: g3.yml');
    if (!lib.pathExists(g3Config._sourcePath))
        return serve_1.serve(appPath);
    var sourceDirMap = app.parse(g3Config);
    app.watch(g3Config, sourceDirMap);
    var port = g3Config.run.port || '9393';
    lib.writeBabelRC(g3Config);
    var entryPath = path.join(g3Config._g3Path, 'app.jsx');
    var rel = lib.forwardSlash(path.relative(g3Config._appPath, entryPath));
    var webpackConfigJS = "/* node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config ./.g3/cli/run/webpack.config.js */\nvar path = require('path');\nvar webpack = require('webpack');\nvar HtmlWebpackPlugin = require('html-webpack-plugin');\nvar htmlPath = '" + lib.osPath(path.resolve(g3Config._appPath, "./index.html")) + "';\nmodule.exports = {\n  entry: [\n    'webpack-dev-server/client?http://0.0.0.0:" + port + "',\n    'webpack/hot/only-dev-server',\n    \"./" + rel + "\"\n  ],\n  output: {\n    path: '" + lib.osPath(g3Config._appPath) + "',\n    publicPath: \"/\",\n    filename: \"bundle.js\"\n  },\n  resolve: {\n    extensions: [\"\", \".webpack.js\", \".web.js\", \".jsx\", \".js\"]\n  },\n  resolveLoader: {\n    root: '" + lib.osPath(path.resolve(g3Config._appPath, "node_modules")) + "'\n  },\n  module: {\n    loaders: [\n      {\n        test: /.jsx?$/,\n        exclude: /(node_modules|bower_components)/,\n        loaders: ['react-hot', 'babel']\n      },\n      {\n        test: /.css$/,\n        loader: \"style-loader!css-loader\"\n      },\n      {\n        test: /.(png|jpg|jpeg|svg|gif)$/,\n        loader: \"file-loader\"\n      }\n    ]\n  },\n  devServer: {\n    contentBase: '" + lib.osPath(g3Config._appPath) + "',\n    port: " + port + ",\n    noInfo: " + g3Config.run.noInfo + ",\n    stats: { colors: true },\n    historyApiFallback: true,\n    hot: true\n  },\n  plugins: [\n    new HtmlWebpackPlugin({\n      inject: true,\n      template: htmlPath,\n    }),\n    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\"development\"' }),\n    new webpack.HotModuleReplacementPlugin()\n  ],\n  devtool: \"sourcemap\",\n  debug: true\n}";
    lib.writeSync(path.join(g3Config._g3Path, 'cli', 'run', 'webpack.config.js'), webpackConfigJS);
    var spawn = require('child_process').spawn;
    var child = spawn('node', [
        path.join(g3Config._appPath, 'node_modules/webpack-dev-server/bin/webpack-dev-server.js'),
        '--config',
        './.g3/cli/run/webpack.config.js'
    ], {
        cwd: g3Config._appPath
    });
    child.on('error', function (e) { console.log(e); });
    child.stdout.pipe(process.stdout);
    console.log("G3 running on port", port);
}
exports.run = run;
//# sourceMappingURL=index.js.map