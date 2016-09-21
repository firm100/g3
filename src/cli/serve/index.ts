import * as path from 'path'
import * as _ from 'lodash'
import * as models from '../../models'
import * as lib from '../../lib'
import * as app from '../../app'
import { build } from '../build'

export function serve(appPath) {
  const g3Config: models.G3Config = app.getG3Config(appPath, models.Const.COMMAND_SERVE)
  if (!g3Config) return console.error('fatal: Not found G3 config file: g3.yml')
  
  if (!lib.isDirectory(g3Config._clientPath)) {
    build(appPath)
  }

  const port = g3Config.run.port || '9393'

  const serverJs = `/* node ./.g3/cli/serve/server.js */
var express = require('express');

var app = express();
app.use(express.static('${lib.osPath(g3Config._clientPath)}'));

app.listen(${port}, function() {
  console.log('G3 Production server running at localhost:' + ${port});
})`
  lib.writeSync(path.join(g3Config._g3Path, 'cli', 'serve', 'server.js'), serverJs)

  const spawn = require('child_process').spawn;
  const child = spawn(
    'node',
    [
      path.join(g3Config._appPath, './.g3/cli/serve/server.js')
    ],
    {
      cwd: g3Config._appPath
    }
  );
  child.on('error', function(e){console.log(e)});
  child.stdout.pipe(process.stdout);
}
