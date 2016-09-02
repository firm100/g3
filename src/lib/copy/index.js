"use strict";
var path = require('path');
var fse = require('fs-extra');
var lib = require('../');
function copySync(src, dest) {
    fse.copySync(src, dest);
}
exports.copySync = copySync;
function copy(src, dest, callback) {
    fse.copy(src, dest, callback);
}
exports.copy = copy;
function copyAllToClientPath(g3Config) {
    var rootPath = g3Config._appPath;
    var files = [];
    var directories = [];
    fse.readdirSync(rootPath).forEach(function (p) {
        if (lib.isFile(path.join(rootPath, p))) {
            files.push(p);
        }
        else if (lib.isDirectory(path.join(rootPath, p))) {
            directories.push(p);
        }
    });
    files.forEach(function (file) {
        var filePath = path.join(rootPath, file);
        if (file[0] === '.'
            || file === 'g3.yml'
            || file === 'index.html'
            || file === 'package.json'
            || file === 'webpack.config.dev.js'
            || file === 'webpack.config.prod.js')
            return;
        copySync(filePath, path.join(g3Config._clientPath, file));
    });
    directories.forEach(function (dir) {
        var dirPath = path.join(rootPath, dir);
        if (dir[0] === '.'
            || dir === '__tests__'
            || dir === 'node_modules'
            || lib.pathEquals(g3Config._appPath, dirPath)
            || lib.pathEquals(g3Config._sourcePath, dirPath)
            || lib.pathEquals(path.join(g3Config._appPath, g3Config.cloudCode), dirPath)
            || lib.pathEquals(g3Config._destinationPath, dirPath)
            || lib.pathEquals(g3Config._g3Path, dirPath))
            return;
        copySync(dirPath, path.join(g3Config._clientPath, dir));
    });
}
exports.copyAllToClientPath = copyAllToClientPath;
function copyAllToServerPath(g3Config) {
    var rootPath = path.join(g3Config._appPath, g3Config.cloudCode);
    var files = [];
    var directories = [];
    fse.readdirSync(rootPath).forEach(function (p) {
        if (lib.isFile(path.join(rootPath, p))) {
            files.push(p);
        }
        else if (lib.isDirectory(path.join(rootPath, p))) {
            directories.push(p);
        }
    });
    files.forEach(function (file) {
        if (file[0] === '.')
            return;
        var filePath = path.join(rootPath, file);
        copySync(filePath, path.join(g3Config._serverPath, g3Config.cloudCode, file));
    });
    directories.forEach(function (dir) {
        if (dir[0] === '.')
            return;
        var dirPath = path.join(rootPath, dir);
        copySync(dirPath, path.join(g3Config._serverPath, g3Config.cloudCode, dir));
    });
}
exports.copyAllToServerPath = copyAllToServerPath;
//# sourceMappingURL=index.js.map