"use strict";
var path = require("path");
var _ = require("lodash");
var fse = require("fs-extra");
var slash = require("slash");
function osPath(p) {
    p = slash(p || '');
    if (process && process.platform === 'win32') {
        p = p.replace(/\//g, '\\\\');
    }
    return p;
}
exports.osPath = osPath;
function pathRelative(from, to) {
    return '/' + _.trim(path.relative(from, to).toLowerCase().replace(/\\/g, '/'), '/');
}
exports.pathRelative = pathRelative;
function pathParent(key) {
    return pathJoin(key, '..');
}
exports.pathParent = pathParent;
function pathEquals(path1, path2) {
    return path.relative(path1, path2) === '';
}
exports.pathEquals = pathEquals;
function pathIn(upPath, currentPath) {
    var rel = _.trim(path.relative(upPath, currentPath).replace(/\\/g, '/'), '/');
    return !_.startsWith(rel, '../');
}
exports.pathIn = pathIn;
function pathExists(path1) {
    return fse.existsSync(path1);
}
exports.pathExists = pathExists;
function pathJoin() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i - 0] = arguments[_i];
    }
    return '/' + _.trim(path.join.apply(path, paths).toLowerCase().replace(/\\/g, '/'), '/');
}
exports.pathJoin = pathJoin;
function forwardSlash(p) {
    return (p || '').replace(/\\/g, '/');
}
exports.forwardSlash = forwardSlash;
function listComponentsSync(dirpath) {
    var components = [];
    var componentsPath = path.join(dirpath, 'components');
    if (fse.existsSync(componentsPath)) {
        var arr = fse.readdirSync(componentsPath) || [];
        arr.forEach(function (name) {
            var componentName = path.basename(name, path.extname(name));
            if (components.indexOf(componentName) === -1) {
                components.push(componentName);
            }
        });
    }
    return components;
}
exports.listComponentsSync = listComponentsSync;
function listSync(dirpath) {
    var dirnames = [];
    var filenames = [];
    var arr = fse.readdirSync(dirpath) || [];
    arr.forEach(function (name) {
        var p = path.join(dirpath, name);
        if (fse.statSync(p).isDirectory()) {
            dirnames.push(name);
        }
        else {
            filenames.push(name);
        }
    });
    return {
        dirnames: dirnames,
        filenames: filenames
    };
}
exports.listSync = listSync;
function getPrefix() {
    var prefix;
    if (process && process.platform === 'win32') {
        prefix = process.env.APPDATA
            ? path.join(process.env.APPDATA, 'npm')
            : path.dirname(process.execPath);
    }
    else {
        prefix = path.dirname(path.dirname(process.execPath));
        if (process.env.DESTDIR) {
            prefix = path.join(process.env.DESTDIR, prefix);
        }
    }
    return prefix;
}
exports.getPrefix = getPrefix;
//# sourceMappingURL=index.js.map