"use strict";
var path = require("path");
var models = require("../../../models");
var lib = require("../../../lib");
function readG3Config(appPath) {
    var g3ConfigPath = path.join(appPath, models.Const.FILE_G3_YML);
    var g3Config = lib.readYML(g3ConfigPath);
    return g3Config;
}
function getG3Config(appPath, command) {
    appPath = path.resolve(appPath);
    var g3Config = readG3Config(appPath);
    if (!g3Config)
        return null;
    g3Config._name = path.basename(appPath);
    g3Config._appPath = appPath;
    g3Config._g3Path = path.join(appPath, models.Const.DIR_DOT_G3);
    if (!g3Config.source) {
        g3Config.source = './src';
    }
    if (!g3Config.cloudCode) {
        g3Config.cloudCode = './cloud';
    }
    if (!g3Config.destination || g3Config.destination === '.' || g3Config.destination === './') {
        g3Config.destination = './build';
    }
    g3Config._sourcePath = path.join(g3Config._appPath, g3Config.source);
    g3Config._destinationPath = path.join(g3Config._appPath, g3Config.destination);
    g3Config._command = command;
    g3Config._timeStamp = Math.floor(Date.now() / 1000);
    var defaultRouter = {
        history: 'browserHistory'
    };
    if (!g3Config.router) {
        g3Config.router = defaultRouter;
    }
    if (!g3Config.router.history)
        g3Config.router.history = defaultRouter.history;
    var defaultRedux = {
        store: ''
    };
    if (!g3Config.redux) {
        g3Config.redux = defaultRedux;
    }
    var defaultRun = {
        port: 9393,
        noInfo: false
    };
    if (!g3Config.run) {
        g3Config.run = defaultRun;
    }
    if (g3Config.run.port === undefined)
        g3Config.run.port = defaultRun.port;
    if (g3Config.run.noInfo === undefined)
        g3Config.run.noInfo = defaultRun.noInfo;
    var defaultBuild = {
        sourceMap: false,
        uglifyJs: true,
        path: './',
        publicPath: '/',
        client: true,
        server: false
    };
    if (!g3Config.build) {
        g3Config.build = defaultBuild;
    }
    if (g3Config.build.sourceMap === undefined)
        g3Config.build.sourceMap = defaultBuild.sourceMap;
    if (g3Config.build.uglifyJs === undefined)
        g3Config.build.uglifyJs = defaultBuild.uglifyJs;
    if (g3Config.build.path === undefined)
        g3Config.build.path = defaultBuild.path;
    if (g3Config.build.publicPath === undefined)
        g3Config.build.publicPath = defaultBuild.publicPath;
    if (g3Config.build.client === undefined)
        g3Config.build.client = defaultBuild.client;
    if (g3Config.build.server === undefined)
        g3Config.build.server = defaultBuild.server;
    var defaultParse = {
        port: 1337,
        appId: g3Config._name,
        masterKey: '7c2cf58b-828b-4fa9-b665-fe0e36941b94',
        dashboard: true,
        dashboardUser: 'admin',
        dashboardPass: 'admin888',
        databaseURI: 'mongodb://localhost:27017/dev'
    };
    if (!g3Config.parse) {
        g3Config.parse = defaultParse;
    }
    if (g3Config.parse.port === undefined)
        g3Config.parse.port = defaultParse.port;
    if (g3Config.parse.appId === undefined)
        g3Config.parse.appId = defaultParse.appId;
    if (g3Config.parse.masterKey === undefined)
        g3Config.parse.masterKey = defaultParse.masterKey;
    if (g3Config.parse.dashboard === undefined)
        g3Config.parse.dashboard = defaultParse.dashboard;
    if (g3Config.parse.dashboardUser === undefined)
        g3Config.parse.dashboardUser = defaultParse.dashboardUser;
    if (g3Config.parse.dashboardPass === undefined)
        g3Config.parse.dashboardPass = defaultParse.dashboardPass;
    if (g3Config.parse.databaseURI === undefined)
        g3Config.parse.databaseURI = defaultParse.databaseURI;
    if (g3Config.build.client && g3Config.build.server) {
        g3Config._clientPath = path.join(g3Config._appPath, g3Config.destination, "client");
        g3Config._serverPath = path.join(g3Config._appPath, g3Config.destination, "server");
    }
    else {
        g3Config._clientPath = path.join(g3Config._appPath, g3Config.destination);
        g3Config._serverPath = path.join(g3Config._appPath, g3Config.destination);
    }
    return g3Config;
}
exports.getG3Config = getG3Config;
//# sourceMappingURL=index.js.map