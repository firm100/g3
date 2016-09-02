"use strict";
var fse = require('fs-extra');
function readFileSync(filepath) {
    return fse.readFileSync(filepath, 'utf-8');
}
exports.readFileSync = readFileSync;
function readFile(filepath, callback) {
    fse.readFile(filepath, callback);
}
exports.readFile = readFile;
//# sourceMappingURL=index.js.map