import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import * as lib from '../'

export function writeSync(p: string, chunk: any) {
  fse.outputFileSync(p, chunk)
}

export function write(p: string, chunk: any) {
  fse.outputFile(p, chunk)
}

export function writeHTML(g3Config: models.G3Config, routePath: string, html: string) {
  if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1) return
  const rootFilepath = path.join(g3Config._appPath, routePath, "index.html")
  const filepath = path.join(g3Config._clientPath, routePath, "index.html")
  const publicPath = _.trimEnd(g3Config.build.publicPath, '/')
  writeSync(filepath, html)
}

export function writeBabelRC(g3Config: models.G3Config) {
  const babelRC = `{
    "presets": ["es2015", "stage-0", "react"]
}`
  lib.writeSync(path.join(g3Config._appPath, '.babelrc'), babelRC)
}
