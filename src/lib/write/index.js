"use strict";
var path = require("path");
var _ = require("lodash");
var fse = require("fs-extra");
var lib = require("../");
function writeSync(p, chunk) {
    fse.outputFileSync(p, chunk);
}
exports.writeSync = writeSync;
function write(p, chunk) {
    fse.outputFile(p, chunk);
}
exports.write = write;
function writeHTML(g3Config, routePath, html) {
    if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1)
        return;
    var rootFilepath = path.join(g3Config._appPath, routePath, "index.html");
    var filepath = path.join(g3Config._path, routePath, "index.html");
    var publicPath = _.trimEnd(g3Config.build.publicPath, '/');
    writeSync(filepath, html);
}
exports.writeHTML = writeHTML;
function writeBabelRC(g3Config) {
    var babelRC = "{\n    \"presets\": [\"es2015\", \"stage-0\", \"react\"]\n}";
    lib.writeSync(path.join(g3Config._appPath, '.babelrc'), babelRC);
}
exports.writeBabelRC = writeBabelRC;
//# sourceMappingURL=index.js.map