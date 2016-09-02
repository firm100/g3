"use strict";
var fse = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');
var _ = require('lodash');
var cp = require('child_process');
var remove = Promise.promisify(fse.remove);
var g3Cli = path.resolve('src', 'bin', 'index.js');
var babel = path.resolve('node_modules', '.bin', 'babel-node');
function g3(args, options) {
    if (args === void 0) { args = []; }
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        var stdout = '';
        var stderr = '';
        console.log(babel);
        console.log(_.concat(['--', g3Cli], args));
        var child = cp.spawn(babel, _.concat(['--', g3Cli], args), options);
        child.stdout.on('data', function (data) { stdout += data; });
        child.stderr.on('data', function (data) { stderr += data; });
        child.on('error', function (error) { return reject({ error: error, stderr: stderr, stdout: stdout }); });
        child.on('exit', function (code) {
            if (code === 0) {
                resolve({ code: code, stdout: stdout, stderr: stderr });
            }
            else {
                reject({ code: code, stdout: stdout, stderr: stderr });
            }
        });
    });
}
exports.g3 = g3;
function build(appPath) {
    return g3(['build'], { cwd: appPath });
}
exports.build = build;
//# sourceMappingURL=index.js.map