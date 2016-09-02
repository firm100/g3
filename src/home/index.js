"use strict";
var path = require('path');
var _ = require('lodash');
var base64 = require('js-base64');
var models = require('../models');
var lib = require('../lib');
function homePath() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
exports.homePath = homePath;
function getConfig() {
    var configFilePath = path.join(homePath(), models.Const.HOME_DIR_NAME, models.Const.HOME_CONFIG_NAME);
    if (!lib.isFile(configFilePath)) {
        lib.writeSync(configFilePath, "{}");
    }
    var homeConfig = JSON.parse(lib.readFileSync(configFilePath));
    homeConfig.authConfig = decodeAuth(homeConfig.auth);
    return homeConfig;
}
exports.getConfig = getConfig;
function saveConfig(config) {
    var configFilePath = path.join(homePath(), models.Const.HOME_DIR_NAME, models.Const.HOME_CONFIG_NAME);
    var configToSave = _.assign({}, config);
    configToSave.auth = encodeAuth(config.authConfig);
    configToSave.authConfig = null;
    lib.writeSync(configFilePath, JSON.stringify(configToSave));
}
exports.saveConfig = saveConfig;
function logout(config) {
    config.authConfig = null;
    saveConfig(config);
}
exports.logout = logout;
function encodeAuth(authConfig) {
    if (!authConfig || !authConfig.username || !authConfig.password || !authConfig.accessToken)
        return "";
    var authStr = authConfig.username + "\n" + authConfig.password + "\n" + authConfig.accessToken;
    return base64.Base64.encode(authStr);
}
exports.encodeAuth = encodeAuth;
function decodeAuth(base64Str) {
    var authConfig = new models.HomeAuthConfig();
    if (!base64Str) {
        return authConfig;
    }
    var authStr = base64.Base64.decode(base64Str);
    if (!authStr) {
        return authConfig;
    }
    var arr = authStr.split('\n');
    if (arr.length !== 3) {
        return authConfig;
    }
    authConfig.username = _.trim(arr[0], "\x00");
    authConfig.password = _.trim(arr[1], "\x00");
    authConfig.accessToken = _.trim(arr[2], "\x00");
    return authConfig;
}
exports.decodeAuth = decodeAuth;
//# sourceMappingURL=index.js.map