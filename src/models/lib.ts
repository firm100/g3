export class G3Config {
  _name: string
  _appPath: string
  _g3Path: string
  _sourcePath: string
  _destinationPath: string
  _path: string

  _command: string
  _timeStamp: number

  source: string
  destination: string

  router: {
    history: string
  }

  redux: {
    store: string
  }

  run: {
    port: number
    noInfo: boolean
  }

  build: {
    sourceMap: boolean
    uglifyJs: boolean
    path: string
    publicPath: string
  }
}

export class DirRoutes {
  path: string
  layout: string
  index: string
  redirect: string
  includes: Array<string>
  excludes: Array<string>
}

export type SourceDirMap = {[index: string]: SourceDir}

export class SourceDir {
  key: string
  path: string
  filenames: Array<string>
  dirnames: Array<string>
  components: Array<string>
  isExclude: boolean

  parent: SourceDir
  routes: DirRoutes
}
