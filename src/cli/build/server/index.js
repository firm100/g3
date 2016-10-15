"use strict";
var path = require("path");
var lib = require("../../../lib");
var app = require("../../../app");
function buildServer(g3Config) {
    lib.copyAllToServerPath(g3Config);
    lib.writeSync(path.join(g3Config._serverPath, 'server.js'), app.getParseServerJs(g3Config));
    lib.copySync(path.join(g3Config._appPath, 'package.json'), path.join(g3Config._serverPath, 'package.json'));
    lib.writeSync(path.join(g3Config._serverPath, 'Dockerfile'), app.getParseServerDockerfile(g3Config));
}
exports.buildServer = buildServer;
//# sourceMappingURL=index.js.map