"use strict";
var path = require("path");
var chokidar = require("chokidar");
var models = require("../../models");
var lib = require("../../lib");
var application = require("../");
function watch(config, sourceDirMap) {
    var watcher = chokidar.watch(config._appPath, {
        ignored: /\.git|node_modules|bower_components|\.sass\-cache|[\/\\]\./
    });
    var isReady = false;
    watcher
        .on('ready', function () {
        isReady = true;
    })
        .on('add', function (p) {
        if (!isReady)
            return;
        syncFile(config, sourceDirMap, p, 'add');
    })
        .on('change', function (p) {
        if (!isReady)
            return;
        syncFile(config, sourceDirMap, p, 'change');
    })
        .on('addDir', function (p) {
        if (!isReady)
            return;
        syncDir(config, sourceDirMap, p, 'addDir');
    })
        .on('unlinkDir', function (p) {
        if (!isReady)
            return;
        syncDir(config, sourceDirMap, p, 'unlinkDir');
    })
        .on('error', function (error) {
        console.log('Error happened', error);
    });
}
exports.watch = watch;
function syncFile(g3Config, sourceDirMap, filepath, event) {
    var ext = path.extname(filepath);
    var dirpath = path.dirname(filepath);
    var filename = path.basename(filepath);
    if (!lib.pathIn(g3Config._sourcePath, filepath))
        return;
    var sourceDir = application.getSourceDir(g3Config, dirpath, sourceDirMap);
    if (sourceDir) {
        if (event === 'add') {
            sourceDir.filenames.push(filename);
        }
        else if (event === 'unlink') {
            sourceDir.filenames.splice(sourceDir.filenames.indexOf(filename), 1);
        }
    }
    var g3Path = path.join(g3Config._g3Path, sourceDir.key, filename);
    if (event === 'unlink') {
        lib.removeSync(g3Path);
    }
    else {
        lib.copy(filepath, g3Path);
    }
    if (filename === models.Const.FILE_ROUTES_YML || filename === 'index.jsx' || filename === 'layout.jsx') {
        if (sourceDir) {
            var routesPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_ROUTES_JS);
            var routesContent = application.getRoutesJS(g3Config, sourceDir);
            lib.write(routesPath, routesContent);
        }
    }
}
function syncDir(g3Config, sourceDirMap, dirpath, event) {
    var parentDirPath = path.dirname(dirpath);
    var parentSourceDir = application.getSourceDir(g3Config, parentDirPath, sourceDirMap);
    if (!parentSourceDir)
        return;
    var dirname = path.basename(dirpath);
    var isExclude = false;
    if (parentSourceDir.routes.includes && parentSourceDir.routes.includes.indexOf(dirname.toLowerCase()) === -1) {
        isExclude = true;
    }
    else if (parentSourceDir.routes.excludes && parentSourceDir.routes.excludes.indexOf(dirname.toLowerCase()) !== -1) {
        isExclude = true;
    }
    if (event === 'unlinkDir') {
        parentSourceDir.dirnames.splice(parentSourceDir.dirnames.indexOf(dirname), 1);
        delete sourceDirMap[parentSourceDir.key + '/' + dirname];
    }
    else if (event === 'addDir') {
        parentSourceDir.dirnames.push(dirname);
        application.addSourceDir(g3Config, dirpath, parentSourceDir, isExclude, sourceDirMap);
    }
    var routesPathParent = path.join(g3Config._g3Path, parentSourceDir.key, models.Const.FILE_ROUTES_JS);
    var routesContentParent = application.getRoutesJS(g3Config, parentSourceDir);
    lib.writeSync(routesPathParent, routesContentParent);
}
//# sourceMappingURL=index.js.map