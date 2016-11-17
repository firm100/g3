import * as path from 'path'
import * as models from '../../../models'
import * as lib from '../../../lib'

function readG3Config(appPath: string): models.G3Config {
  const g3ConfigPath = path.join(appPath, models.Const.FILE_G3_YML)
  const g3Config: models.G3Config = <models.G3Config>lib.readYML(g3ConfigPath)
  return g3Config
}

export function getG3Config(appPath: string, command: string): models.G3Config {
  appPath = path.resolve(appPath)

  let g3Config: models.G3Config = readG3Config(appPath)
  if (!g3Config) return null

  g3Config._name = path.basename(appPath)
  g3Config._appPath = appPath
  g3Config._g3Path = path.join(appPath, models.Const.DIR_DOT_G3)
  if (!g3Config.source) {
    g3Config.source = './src'
  }
  if (!g3Config.destination || g3Config.destination === '.' || g3Config.destination === './') {
    g3Config.destination = './build'
  }
  g3Config._sourcePath = path.join(g3Config._appPath, g3Config.source)
  g3Config._destinationPath = path.join(g3Config._appPath, g3Config.destination)

  g3Config._command = command
  g3Config._timeStamp = Math.floor(Date.now() / 1000)

  const defaultRouter = {
    history: 'browserHistory'
  }
  if (!g3Config.router) {
    g3Config.router = defaultRouter
  }
  if (!g3Config.router.history) g3Config.router.history = defaultRouter.history

  const defaultRedux = {
    store: ''
  }
  if (!g3Config.redux) {
    g3Config.redux = defaultRedux
  }

  const defaultRun = {
    port: 9393,
    noInfo: false
  }
  if (!g3Config.run) {
    g3Config.run = defaultRun
  }
  if (g3Config.run.port === undefined) g3Config.run.port = defaultRun.port
  if (g3Config.run.noInfo === undefined) g3Config.run.noInfo = defaultRun.noInfo

  const defaultBuild = {
    sourceMap: false,
    uglifyJs: true,
    path: './',
    publicPath: '/',
  }
  if (!g3Config.build) {
    g3Config.build = defaultBuild
  }
  if (g3Config.build.sourceMap === undefined) g3Config.build.sourceMap = defaultBuild.sourceMap
  if (g3Config.build.uglifyJs === undefined) g3Config.build.uglifyJs = defaultBuild.uglifyJs
  if (g3Config.build.path === undefined) g3Config.build.path = defaultBuild.path
  if (g3Config.build.publicPath === undefined) g3Config.build.publicPath = defaultBuild.publicPath

  g3Config._path = path.join(g3Config._appPath, g3Config.destination)

  return g3Config
}
