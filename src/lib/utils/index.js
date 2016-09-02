"use strict";
var _ = require('lodash');
var path = require('path');
var fse = require('fs-extra');
function urlJoin() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i - 0] = arguments[_i];
    }
    var str = path.join.apply(path, paths);
    var isExtendedLengthPath = /^\\\\\?\\/.test(str);
    var hasNonAscii = /[^\x00-\x80]+/.test(str);
    if (isExtendedLengthPath || hasNonAscii) {
        return str;
    }
    return str.replace(/\\/g, '/');
}
exports.urlJoin = urlJoin;
function isDirectory(filepath) {
    try {
        var stats = fse.lstatSync(filepath);
        return stats.isDirectory();
    }
    catch (err) {
        return false;
    }
}
exports.isDirectory = isDirectory;
function isFile(filepath) {
    try {
        var stats = fse.lstatSync(filepath);
        return stats.isFile();
    }
    catch (err) {
        return false;
    }
}
exports.isFile = isFile;
function isMarkdown(filepath) {
    if (_.endsWith(filepath, '.md')) {
        return true;
    }
    return false;
}
exports.isMarkdown = isMarkdown;
//# sourceMappingURL=index.js.map