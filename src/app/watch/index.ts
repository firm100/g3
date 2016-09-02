import * as path from 'path'
import * as _ from 'lodash'
import * as chokidar from 'chokidar'

import * as models from '../../models'
import * as lib from '../../lib'
import * as application from '../'

export function watch (config: models.G3Config, sourceDirMap: models.SourceDirMap) {
  const watcher = chokidar.watch(config._appPath, {
    ignored: /\.git|node_modules|bower_components|\.sass\-cache|[\/\\]\./
  })
  let isReady = false

  watcher
  .on('ready', () => {
    isReady = true
  })
  .on('add', (p) => {
    if (!isReady) return
    syncFile(config, sourceDirMap, p, 'add')
  })
  .on('change', (p) => {
    if (!isReady) return
    syncFile(config, sourceDirMap, p, 'change')
  })
  // .on('unlink', (p) => {
  //   if (!isReady) return
  //   syncFile(config, sourceDirMap, p, 'unlink')
  // })
  .on('addDir', (p) => {
    if (!isReady) return
    syncDir(config, sourceDirMap, p, 'addDir')
  })
  .on('unlinkDir', (p) => {
    if (!isReady) return
    syncDir(config, sourceDirMap, p, 'unlinkDir')
  })
  .on('error', (error) =>  {
    console.log('Error happened', error);
  })
}

function syncFile(g3Config: models.G3Config, sourceDirMap: models.SourceDirMap, filepath: string, event: string) {
  const ext = path.extname(filepath)
  const dirpath = path.dirname(filepath)
  const filename = path.basename(filepath)
  if (!lib.pathIn(g3Config._sourcePath, filepath)) return

  const sourceDir = application.getSourceDir(g3Config, dirpath, sourceDirMap)
  if (sourceDir) {
    if (event === 'add') {
      sourceDir.filenames.push(filename)
    } else if (event === 'unlink') {
      sourceDir.filenames.splice(sourceDir.filenames.indexOf(filename), 1)
    }
  }

  const g3Path = path.join(g3Config._g3Path, sourceDir.key, filename)

  if (event === 'unlink') {
    lib.removeSync(g3Path)
  } else {
    lib.copy(filepath, g3Path)
  }

  if (filename === models.Const.FILE_ROUTES_YML || filename === 'index.jsx' || filename === 'layout.jsx') {
    if (sourceDir) {
      const routesPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_ROUTES_JS)
      const routesContent = application.getRoutesJS(g3Config, sourceDir)
      lib.write(routesPath, routesContent)
    }
  }
}

function syncDir(g3Config: models.G3Config, sourceDirMap: models.SourceDirMap, dirpath: string, event: string) {
  const parentDirPath = path.dirname(dirpath)
  const parentSourceDir: models.SourceDir = application.getSourceDir(g3Config, parentDirPath, sourceDirMap)
  if (!parentSourceDir) return

  const dirname = path.basename(dirpath)

  let isExclude = false
  if (parentSourceDir.routes.includes && parentSourceDir.routes.includes.indexOf(dirname.toLowerCase()) === -1) {
    isExclude = true
  } else if (parentSourceDir.routes.excludes && parentSourceDir.routes.excludes.indexOf(dirname.toLowerCase()) !== -1) {
    isExclude = true
  }

  if (event === 'unlinkDir') {
    parentSourceDir.dirnames.splice(parentSourceDir.dirnames.indexOf(dirname), 1)
    delete sourceDirMap[parentSourceDir.key + '/' + dirname]
  } else if (event === 'addDir') {
    parentSourceDir.dirnames.push(dirname)
    application.addSourceDir(g3Config, dirpath, parentSourceDir, isExclude, sourceDirMap)
  }

  const routesPathParent = path.join(g3Config._g3Path, parentSourceDir.key, models.Const.FILE_ROUTES_JS)
  const routesContentParent = application.getRoutesJS(g3Config, parentSourceDir)
  lib.writeSync(routesPathParent, routesContentParent)
}
