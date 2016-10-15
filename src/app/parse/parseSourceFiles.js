"use strict";
var path = require("path");
var models = require("../../models");
var lib = require("../../lib");
var application = require("../");
function parseSourceFiles(g3Config) {
    var sourceDirMap = {};
    if (!lib.isDirectory(g3Config._sourcePath))
        return sourceDirMap;
    lib.writeSync(path.join(g3Config._g3Path, models.Const.FILE_APP + '.jsx'), application.getAppJS(g3Config));
    if (!g3Config.redux.store && lib.isDirectory(path.join(g3Config._sourcePath, models.Const.DIR_LIB_REDUCERS))) {
        lib.writeSync(path.join(g3Config._g3Path, models.Const.FILE_STORE + '.js'), application.getStoreJS(g3Config));
    }
    application.addSourceDir(g3Config, g3Config._sourcePath, null, false, sourceDirMap);
    return sourceDirMap;
}
exports.parseSourceFiles = parseSourceFiles;
//# sourceMappingURL=parseSourceFiles.js.map