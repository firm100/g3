"use strict";
var path = require('path');
var _ = require('lodash');
var cp = require('child_process');
var lib = require('../../lib');
function prepare(g3Config) {
    var gitignorePath = path.join(g3Config._appPath, '.gitignore');
    if (!lib.isFile(gitignorePath)) {
        lib.writeSync(gitignorePath, "node_modules/\n.g3/\n");
    }
    var pkg = require('../../resources/package.json');
    _.keys(pkg.dependencies).forEach(function (dep) {
        if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
            console.log('Installing package ' + dep + '...');
            cp.execSync('npm install ' + dep + ' --save', {
                cwd: g3Config._appPath,
                stdio: ['ignore', 'ignore', 'pipe']
            });
        }
    });
    _.keys(pkg.devDependencies).forEach(function (devDep) {
        if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', devDep))) {
            console.log('Installing package ' + devDep + '...');
            cp.execSync('npm install ' + devDep + ' --save-dev', {
                cwd: g3Config._appPath,
                stdio: ['ignore', 'ignore', 'pipe']
            });
        }
    });
    var packagePath = path.join(g3Config._appPath, 'package.json');
    if (lib.isFile(packagePath)) {
        var appPkg = require(packagePath);
        if (appPkg && appPkg.dependencies) {
            _.keys(appPkg.dependencies).forEach(function (dep) {
                if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
                    console.log('Installing package ' + dep + '...');
                    cp.execSync('npm install ' + dep, {
                        cwd: g3Config._appPath,
                        stdio: ['ignore', 'ignore', 'pipe']
                    });
                }
            });
        }
    }
}
exports.prepare = prepare;
//# sourceMappingURL=prepare.js.map