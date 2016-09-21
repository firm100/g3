import * as path from 'path'
import * as _ from 'lodash'
import * as cp from 'child_process'
import * as models from '../../models'
import * as lib from '../../lib'
import * as app from '../../app'
import {buildClient} from './client'
import {buildServer} from './server'

export function build(appPath) {
  const g3Config: models.G3Config = app.getG3Config(appPath, models.Const.COMMAND_BUILD)
  if (!g3Config) return console.error('fatal: Not found G3 config file: g3.yml')

  console.log('copying files...')
  lib.removeSync(g3Config._g3Path)
  lib.removeSync(g3Config._destinationPath)

  if (g3Config.build.client) {
    buildClient(g3Config)
  }
  if (g3Config.build.server) {
    buildServer(g3Config)
  }

  console.log("G3 build successed");
}
