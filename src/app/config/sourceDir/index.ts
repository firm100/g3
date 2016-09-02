import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../../models'
import * as lib from '../../../lib'
import { getRoutesJS } from '../routes'

export function getSourceDir(g3Config: models.G3Config, dirpath: string, sourceDirMap: models.SourceDirMap): models.SourceDir {
  const key = lib.pathRelative(g3Config._sourcePath, dirpath)
  return sourceDirMap[key]
}

export function addSourceDir(g3Config: models.G3Config, dirPath: string, parent: models.SourceDir, isExclude: boolean, sourceDirMap: models.SourceDirMap): models.SourceDir {
  const list = lib.listSync(dirPath)

  const sourceDir = new models.SourceDir()
  sourceDir.key = lib.pathRelative(g3Config._sourcePath, dirPath)
  sourceDir.path = dirPath
  sourceDir.filenames = list.filenames
  sourceDir.dirnames = list.dirnames
  sourceDir.components = lib.listComponentsSync(dirPath)
  sourceDir.parent = parent
  sourceDir.isExclude = isExclude
  lib.readDirRoutes(sourceDir)

  sourceDirMap[sourceDir.key] = sourceDir

  if (!isExclude) {
    const routesPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_ROUTES_JS)
    const routesContent = getRoutesJS(g3Config, sourceDir)
    lib.writeSync(routesPath, routesContent)
  }

  if (list.dirnames && list.dirnames.length > 0) {
    list.dirnames.forEach((dirname: string) => {
      let dirIsExclude = false
      if (sourceDir.routes.includes && sourceDir.routes.includes.indexOf(dirname.toLowerCase()) === -1) {
        dirIsExclude = true
      } else if (sourceDir.routes.excludes && sourceDir.routes.excludes.indexOf(dirname.toLowerCase()) !== -1) {
        dirIsExclude = true
      }
      const childpath = path.join(dirPath, dirname)
      addSourceDir(g3Config, childpath, sourceDir, dirIsExclude, sourceDirMap)
    })
  }

  return sourceDir
}
