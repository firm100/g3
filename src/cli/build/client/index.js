"use strict";
var path = require('path');
var _ = require('lodash');
var cp = require('child_process');
var lib = require('../../../lib');
var app = require('../../../app');
function buildClient(g3Config) {
    lib.copyAllToClientPath(g3Config);
    if (!lib.pathExists(g3Config._sourcePath))
        return;
    var sourceDirMap = app.parse(g3Config);
    lib.writeBabelRC(g3Config);
    var entryPath = path.join(g3Config._g3Path, 'app.jsx');
    var rel = lib.forwardSlash(path.relative(g3Config._appPath, entryPath));
    var uglifyJs = g3Config.build.uglifyJs ? ",\n      new webpack.optimize.UglifyJsPlugin({\n        compress: {\n          warnings: false\n        }\n      })" : '';
    var devtool = g3Config.build.sourceMap ? 'source-map' : 'eval';
    var webpackConfigJS = "/* node ./node_modules/webpack/bin/webpack.js --config ./.g3/cli/build/webpack.config.js */\nvar path = require('path');\nvar webpack = require('webpack');\nvar HtmlWebpackPlugin = require('html-webpack-plugin');\nvar htmlPath = '" + lib.osPath(path.resolve(g3Config._appPath, "./index.html")) + "';\nmodule.exports = {\n    entry: './" + rel + "',\n    output: {\n      path: '" + lib.osPath(path.resolve(g3Config._clientPath, g3Config.build.path)) + "',\n      publicPath: '" + g3Config.build.publicPath + "',\n      filename: '[name].[chunkhash:8].js',\n      chunkFilename: '[name].[chunkhash:8].chunk.js',\n    },\n    resolve: {\n      extensions: [\"\", \".webpack.js\", \".web.js\", \".jsx\", \".js\"]\n    },\n    resolveLoader: {\n      root: '" + lib.osPath(path.resolve(g3Config._appPath, "node_modules")) + "'\n    },\n    module: {\n      loaders: [\n        {\n          test: /.jsx?$/,\n          exclude: /(node_modules|bower_components)/,\n          loader: \"babel-loader\"\n        },\n        {\n          test: /.css$/,\n          loader: \"style-loader!css-loader\"\n        },\n        {\n          test: /.(png|jpg|jpeg|svg|gif)$/,\n          loader: \"file-loader\"\n        }\n      ]\n    },\n    plugins: [\n      new HtmlWebpackPlugin({\n        inject: true,\n        template: htmlPath,\n        minify: {\n          removeComments: true,\n          collapseWhitespace: true,\n          removeRedundantAttributes: true,\n          useShortDoctype: true,\n          removeEmptyAttributes: true,\n          removeStyleLinkTypeAttributes: true,\n          keepClosingSlash: true,\n          minifyJS: true,\n          minifyCSS: true,\n          minifyURLs: true\n        }\n      }),\n      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\"production\"' }),\n      new webpack.optimize.OccurrenceOrderPlugin(),\n      new webpack.optimize.DedupePlugin()" + uglifyJs + "\n    ],\n    bail: true,\n    devtool: '" + devtool + "'\n}";
    lib.writeSync(path.join(g3Config._g3Path, 'cli', 'build', 'webpack.config.js'), webpackConfigJS);
    console.log('webpack build assets to ' + path.join(g3Config._clientPath, g3Config.build.path));
    cp.execSync('node ./node_modules/webpack/bin/webpack.js --config ./.g3/cli/build/webpack.config.js', {
        cwd: g3Config._appPath,
        stdio: ['ignore', 'ignore', 'pipe']
    });
    var html = lib.readFileSync(path.resolve(g3Config._clientPath, g3Config.build.path, "./index.html"));
    _.mapKeys(sourceDirMap, function (sourceDir, key) {
        var routeHTML = html;
        var routePath = app.getRoutePath(sourceDir);
        var rootPath = path.resolve(g3Config._sourcePath, sourceDir.path, "./root.html");
        if (lib.isFile(rootPath)) {
            var rootHTML = lib.readFileSync(rootPath);
            routeHTML = routeHTML.replace('<div id="root"></div>', '<div id="root">' + rootHTML + '</div>');
        }
        lib.writeHTML(g3Config, routePath, routeHTML);
    });
}
exports.buildClient = buildClient;
//# sourceMappingURL=index.js.map