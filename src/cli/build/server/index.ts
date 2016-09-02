import * as path from 'path'
import * as _ from 'lodash'
import * as cp from 'child_process'
import * as models from '../../../models'
import * as lib from '../../../lib'
import * as app from '../../../app'

export function buildServer(g3Config: models.G3Config) {
  lib.copyAllToServerPath(g3Config)

  lib.writeSync(path.join(g3Config._serverPath, 'server.js'), app.getParseServerJs(g3Config))
  lib.copySync(path.join(g3Config._appPath, 'package.json'), path.join(g3Config._serverPath, 'package.json'))
  lib.writeSync(path.join(g3Config._serverPath, 'Dockerfile'), app.getParseServerDockerfile(g3Config))
}
