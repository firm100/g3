"use strict";
var models = require('../../models');
var lib = require('../../lib');
var app = require('../../app');
var client_1 = require('./client');
var server_1 = require('./server');
function build(appPath) {
    var g3Config = app.getG3Config(appPath, models.Const.COMMAND_BUILD);
    if (!g3Config)
        return console.error('fatal: Not found G3 config file: g3.yml');
    console.log('copying files...');
    lib.removeSync(g3Config._g3Path);
    lib.removeSync(g3Config._destinationPath);
    if (g3Config.build.client) {
        client_1.buildClient(g3Config);
    }
    if (g3Config.build.server) {
        server_1.buildServer(g3Config);
    }
    console.log("G3 build successed");
}
exports.build = build;
//# sourceMappingURL=index.js.map