"use strict";
var path = require('path');
var models = require('../../models');
var lib = require('../../lib');
var app = require('../../app');
function parse(appPath) {
    var g3Config = app.getG3Config(appPath, models.Const.COMMAND_PARSE);
    var serverJs = app.getParseServerJs(g3Config);
    lib.writeSync(path.join(g3Config._g3Path, 'cli', 'parse', 'server.js'), serverJs);
    var spawn = require('child_process').spawn;
    var child = spawn('node', [
        path.join(g3Config._appPath, './.g3/cli/parse/server.js')
    ], {
        cwd: g3Config._appPath
    });
    child.on('error', function (e) { console.log(e); });
    child.stdout.pipe(process.stdout);
}
exports.parse = parse;
//# sourceMappingURL=index.js.map