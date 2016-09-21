"use strict";
var path = require('path');
var models = require('../../models');
var lib = require('../../lib');
var app = require('../../app');
var build_1 = require('../build');
function serve(appPath) {
    var g3Config = app.getG3Config(appPath, models.Const.COMMAND_SERVE);
    if (!g3Config)
        return console.error('fatal: Not found G3 config file: g3.yml');
    if (!lib.isDirectory(g3Config._clientPath)) {
        build_1.build(appPath);
    }
    var port = g3Config.run.port || '9393';
    var serverJs = "/* node ./.g3/cli/serve/server.js */\nvar express = require('express');\n\nvar app = express();\napp.use(express.static('" + lib.osPath(g3Config._clientPath) + "'));\n\napp.listen(" + port + ", function() {\n  console.log('G3 Production server running at localhost:' + " + port + ");\n})";
    lib.writeSync(path.join(g3Config._g3Path, 'cli', 'serve', 'server.js'), serverJs);
    var spawn = require('child_process').spawn;
    var child = spawn('node', [
        path.join(g3Config._appPath, './.g3/cli/serve/server.js')
    ], {
        cwd: g3Config._appPath
    });
    child.on('error', function (e) { console.log(e); });
    child.stdout.pipe(process.stdout);
}
exports.serve = serve;
//# sourceMappingURL=index.js.map