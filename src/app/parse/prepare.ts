import * as path from 'path'
import * as fse from 'fs-extra'
import * as _ from 'lodash'
import * as cp from 'child_process'

import * as models from '../../models'
import * as lib from '../../lib'

export function prepare(g3Config: models.G3Config) {
  const gitignorePath = path.join(g3Config._appPath, '.gitignore')
  if (!lib.isFile(gitignorePath)) {
    lib.writeSync(gitignorePath, `node_modules/
.g3/
`)
  }

  var pkg = require('../../resources/package.json')

  _.keys(pkg.dependencies).forEach((dep: string) => {
    if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
      console.log('Installing package ' + dep + '...')
      cp.execSync('npm install ' + dep + ' --save', {
        cwd: g3Config._appPath,
        stdio: ['ignore', 'ignore', 'pipe']
      })
    }
  })

  _.keys(pkg.devDependencies).forEach((devDep: string) => {
    if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', devDep))) {
      console.log('Installing package ' + devDep + '...')
      cp.execSync('npm install ' + devDep + ' --save-dev', {
        cwd: g3Config._appPath,
        stdio: ['ignore', 'ignore', 'pipe']
      })
    }
  })

  const packagePath = path.join(g3Config._appPath, 'package.json')
  if (lib.isFile(packagePath)) {
    var appPkg = require(packagePath)

    if (appPkg && appPkg.dependencies) {
      _.keys(appPkg.dependencies).forEach((dep: string) => {
        if (!lib.isDirectory(path.join(g3Config._appPath, 'node_modules', dep))) {
          console.log('Installing package ' + dep + '...')
          cp.execSync('npm install ' + dep, {
            cwd: g3Config._appPath,
            stdio: ['ignore', 'ignore', 'pipe']
          })
        }
      })
    }
  }
}
