var path = require('path')
import * as models from '../../models'
import * as lib from '../../lib'
import * as app from '../../app'

export function parse(appPath) {
  const g3Config: models.G3Config = app.getG3Config(appPath, models.Const.COMMAND_PARSE)

  const serverJs = app.getParseServerJs(g3Config)
  lib.writeSync(path.join(g3Config._g3Path, 'cli', 'parse', 'server.js'), serverJs)

  const spawn = require('child_process').spawn;
  const child = spawn(
    'node',
    [
      path.join(g3Config._appPath, './.g3/cli/parse/server.js')
    ],
    {
      cwd: g3Config._appPath
    }
  );
  child.on('error', function(e){console.log(e)});
  child.stdout.pipe(process.stdout);
}
