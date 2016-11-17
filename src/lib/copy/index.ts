import * as path from 'path'
import * as fse from 'fs-extra'

import * as lib from '../'
import * as models from '../../models'

export function copySync(src: string, dest: string) {
  fse.copySync(src, dest)
}

export function copy(src: string, dest: string, callback?: (err: Error) => void) {
  fse.copy(src, dest, callback)
}

export function copyAllToPath(g3Config: models.G3Config) {
  const rootPath = g3Config._appPath
  const files = []
  const directories = []
  fse.readdirSync(rootPath).forEach((p: string) => {
    if (lib.isFile(path.join(rootPath, p))) {
      files.push(p)
    } else if (lib.isDirectory(path.join(rootPath, p))) {
      directories.push(p)
    }
  })

  files.forEach((file: string) => {
    const filePath = path.join(rootPath, file)
    if (file[0] === '.'
      || file === 'g3.yml'
      || file === 'index.html'
      || file === 'package.json'
      || file === 'webpack.config.dev.js'
      || file === 'webpack.config.prod.js') return

    copySync(filePath, path.join(g3Config._path, file))
  })
  directories.forEach((dir: string) => {
    const dirPath = path.join(rootPath, dir)

    if (dir[0] === '.'
      || dir === '__tests__'
      || dir === 'node_modules'
      || lib.pathEquals(g3Config._appPath, dirPath)
      || lib.pathEquals(g3Config._sourcePath, dirPath)
      || lib.pathEquals(g3Config._destinationPath, dirPath)
      || lib.pathEquals(g3Config._g3Path, dirPath)
    ) return

    copySync(dirPath, path.join(g3Config._path, dir))
  })
}
