"use strict";
var path = require("path");
var _ = require("lodash");
var models = require("../../../models");
var lib = require("../../../lib");
function getLayouts(g3Config, sourceDir, dirPath, layouts) {
    if (sourceDir && sourceDir.routes.layout) {
        var layoutPath = path.join(sourceDir.path, sourceDir.routes.layout);
        var rel = lib.forwardSlash(path.relative(dirPath, layoutPath));
        layouts.splice(0, 0, rel);
        getLayouts(g3Config, sourceDir.parent, dirPath, layouts);
    }
}
function getRoutesJS(g3Config, sourceDir) {
    var dirPath = path.join(g3Config._g3Path, sourceDir.key);
    var routesJS = '';
    if (sourceDir.routes.path) {
        routesJS += "\n  path: '" + sourceDir.routes.path + "',\n  ";
    }
    if (sourceDir.routes.layout) {
        var layoutPath = path.join(sourceDir.path, sourceDir.routes.layout);
        var rel = lib.forwardSlash(path.relative(dirPath, layoutPath));
        routesJS += "\n  getComponent(nextState, cb) {\n    require.ensure([], (require) => {\n      cb(null, require('" + rel + "').default);\n    });\n  },\n  ";
    }
    if (sourceDir.routes.redirect) {
        var redirect = sourceDir.routes.redirect;
        if (redirect[0] !== '/') {
            redirect = lib.urlJoin(getRoutePath(sourceDir), redirect);
        }
        routesJS += "\n  indexRoute: {\n    onEnter: (nextState, replace) => replace('" + redirect + "')\n  },\n  ";
    }
    else {
        var rel = '';
        if (!sourceDir.routes.index) {
            if (sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.jsx') !== -1) {
                var indexPath = path.join(sourceDir.path, 'index');
                rel = lib.forwardSlash(path.relative(dirPath, indexPath));
            }
        }
        else {
            var indexPath = path.join(sourceDir.path, sourceDir.routes.index);
            rel = lib.forwardSlash(path.relative(dirPath, indexPath));
        }
        if (rel) {
            routesJS += "\n  getIndexRoute(location, cb) {\n    cb(null, {\n      getComponent(nextState, cb) {\n        require.ensure([], (require) => {\n          cb(null, require('" + rel + "').default);\n        });\n      }\n    });\n  },\n  ";
        }
    }
    var children = [];
    if (sourceDir.routes.includes && sourceDir.dirnames) {
        sourceDir.routes.includes.forEach(function (dirname) {
            if (sourceDir.dirnames.indexOf(dirname) !== -1) {
                children.push(dirname);
            }
        });
    }
    else {
        sourceDir.dirnames.forEach(function (dirname) {
            if (sourceDir.routes.excludes && sourceDir.routes.excludes.indexOf(dirname) !== -1) {
                return;
            }
            if (!_.startsWith(dirname, '__')) {
                children.push(dirname);
            }
        });
        sourceDir.dirnames.forEach(function (dirname) {
            if (sourceDir.routes.excludes && sourceDir.routes.excludes.indexOf(dirname) !== -1) {
                return;
            }
            if (_.startsWith(dirname, '__')) {
                children.push(dirname);
            }
        });
    }
    if (children.length > 0) {
        routesJS += "\n  getChildRoutes(location, cb) {\n    require.ensure([], (require) => {\n      cb(null, [" + children.map(function (child) {
            return "\n        require('./" + child + "/routes').default";
        }).join(',') + "\n      ]);\n    });\n  },\n  ";
    }
    return "export default {\n" + routesJS + "\n}";
}
exports.getRoutesJS = getRoutesJS;
function getRoutePath(sourceDir) {
    if (sourceDir.parent) {
        return lib.urlJoin(getRoutePath(sourceDir.parent), sourceDir.routes.path);
    }
    return sourceDir.routes.path;
}
exports.getRoutePath = getRoutePath;
//# sourceMappingURL=index.js.map