"use strict";
var models = require("../../models");
var app = require("../../app");
var home = require("../../home");
var api = require("../../api");
function status(appPath) {
    var g3Config = app.getG3Config(appPath, models.Const.COMMAND_STATUS);
    if (!g3Config)
        return console.error('fatal: Not found G3 config file: g3.yml');
    var homeConfig = home.getConfig();
    var authConfig = homeConfig.authConfig;
    if (!authConfig.username || !authConfig.accessToken) {
        console.log("\nPlease login prior to status:\n");
        return;
    }
    console.log("\nYour Username:" + authConfig.username + "\n");
    var host = models.Const.API_HOST;
    var owner = authConfig.username;
    var name = g3Config._name;
    var client = api.getClient(authConfig.accessToken);
    client.apps.files.checksum(owner, name, function (err, res) {
        console.log(res.files);
    });
}
exports.status = status;
//# sourceMappingURL=index.js.map