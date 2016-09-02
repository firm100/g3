"use strict";
var path = require('path');
var fse = require('fs-extra');
var _ = require('lodash');
var yaml = require('js-yaml');
var models = require('../../models');
var lib = require('../');
function readYML(ymlPath) {
    var obj = null;
    try {
        if (lib.isFile(ymlPath)) {
            obj = yaml.safeLoad(fse.readFileSync(ymlPath, 'utf8'));
        }
    }
    catch (e) {
        console.log(e);
    }
    return obj;
}
exports.readYML = readYML;
function readDirRoutes(sourceDir) {
    try {
        var ymlpath = path.join(sourceDir.path, models.Const.FILE_ROUTES_YML);
        if (sourceDir.filenames.indexOf(models.Const.FILE_ROUTES_YML) != -1) {
            sourceDir.routes = yaml.safeLoad(fse.readFileSync(ymlpath, 'utf8'));
        }
    }
    catch (e) {
        console.log(e);
    }
    if (!sourceDir.routes) {
        sourceDir.routes = new models.DirRoutes();
    }
    if (sourceDir.routes.path === undefined) {
        if (sourceDir.key === '/') {
            if (sourceDir.dirnames.indexOf('__') !== -1) {
                sourceDir.routes.path = '';
            }
            else {
                sourceDir.routes.path = '/';
            }
        }
        else {
            var basename = path.basename(sourceDir.path).toLowerCase();
            if (basename === '__') {
                basename = '/';
            }
            else if (_.startsWith(basename, '__')) {
                basename = basename.replace('__', ':');
            }
            sourceDir.routes.path = basename;
        }
    }
    if (sourceDir.routes.layout === undefined) {
        if (sourceDir.filenames.indexOf(models.Const.FILE_LAYOUT + '.jsx') !== -1 || sourceDir.filenames.indexOf(models.Const.FILE_LAYOUT + '.html') !== -1) {
            sourceDir.routes.layout = './' + models.Const.FILE_LAYOUT + '.jsx';
        }
    }
    if (sourceDir.routes.excludes === undefined) {
        sourceDir.routes.excludes = [
            models.Const.DIR_COMPONENTS,
            models.Const.DIR_CONTAINERS,
            models.Const.DIR_LIB,
            models.Const.DIR_STYLES,
            models.Const.DIR_IMAGES,
        ];
    }
}
exports.readDirRoutes = readDirRoutes;
//# sourceMappingURL=yml.js.map