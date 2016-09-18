import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import * as lib from '../../lib'
import * as application from '../'

export function parseSourceFiles(g3Config: models.G3Config): models.SourceDirMap {
  let sourceDirMap: models.SourceDirMap = {}
  if (!lib.isDirectory(g3Config._sourcePath)) return sourceDirMap

  lib.writeSync(path.join(g3Config._g3Path, models.Const.FILE_APP + '.jsx'), application.getAppJS(g3Config))
  
  if (!g3Config.redux.store && lib.isDirectory(path.join(g3Config._sourcePath, models.Const.DIR_LIB_REDUCERS))) {
    lib.writeSync(path.join(g3Config._g3Path, models.Const.FILE_STORE + '.js'), application.getStoreJS(g3Config))
  }

  application.addSourceDir(g3Config, g3Config._sourcePath, null, false, sourceDirMap)

  return sourceDirMap
}
