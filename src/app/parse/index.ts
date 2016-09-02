import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../../models'
import {prepare} from './prepare'
import {parseSourceFiles} from './parseSourceFiles'

export function parse(g3Config: models.G3Config): models.SourceDirMap {
  prepare(g3Config)
  return parseSourceFiles(g3Config)
}
