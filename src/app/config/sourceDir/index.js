"use strict";
var path = require("path");
var models = require("../../../models");
var lib = require("../../../lib");
var routes_1 = require("../routes");
function getSourceDir(g3Config, dirpath, sourceDirMap) {
    var key = lib.pathRelative(g3Config._sourcePath, dirpath);
    return sourceDirMap[key];
}
exports.getSourceDir = getSourceDir;
function addSourceDir(g3Config, dirPath, parent, isExclude, sourceDirMap) {
    var list = lib.listSync(dirPath);
    var sourceDir = new models.SourceDir();
    sourceDir.key = lib.pathRelative(g3Config._sourcePath, dirPath);
    sourceDir.path = dirPath;
    sourceDir.filenames = list.filenames;
    sourceDir.dirnames = list.dirnames;
    sourceDir.components = lib.listComponentsSync(dirPath);
    sourceDir.parent = parent;
    sourceDir.isExclude = isExclude;
    lib.readDirRoutes(sourceDir);
    sourceDirMap[sourceDir.key] = sourceDir;
    if (!isExclude) {
        var routesPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_ROUTES_JS);
        var routesContent = routes_1.getRoutesJS(g3Config, sourceDir);
        lib.writeSync(routesPath, routesContent);
    }
    if (list.dirnames && list.dirnames.length > 0) {
        list.dirnames.forEach(function (dirname) {
            var dirIsExclude = false;
            if (sourceDir.routes.includes && sourceDir.routes.includes.indexOf(dirname.toLowerCase()) === -1) {
                dirIsExclude = true;
            }
            else if (sourceDir.routes.excludes && sourceDir.routes.excludes.indexOf(dirname.toLowerCase()) !== -1) {
                dirIsExclude = true;
            }
            var childpath = path.join(dirPath, dirname);
            addSourceDir(g3Config, childpath, sourceDir, dirIsExclude, sourceDirMap);
        });
    }
    return sourceDir;
}
exports.addSourceDir = addSourceDir;
//# sourceMappingURL=index.js.map