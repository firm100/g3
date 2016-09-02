import * as path from 'path'
import * as _ from 'lodash'
import * as base64 from 'js-base64'

import * as models from '../models'
import * as lib from '../lib'

export function homePath(): string {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

export function getConfig(): models.HomeConfig {
	const configFilePath = path.join(homePath(), models.Const.HOME_DIR_NAME, models.Const.HOME_CONFIG_NAME)
  if (!lib.isFile(configFilePath)) {
    lib.writeSync(configFilePath, "{}")
  }
  const homeConfig: models.HomeConfig = JSON.parse(lib.readFileSync(configFilePath))
  homeConfig.authConfig = decodeAuth(homeConfig.auth)

  return homeConfig
}

// saveConfig encodes and writes out all the authorization information to
// the given writer
export function saveConfig(config: models.HomeConfig) {
  const configFilePath = path.join(homePath(), models.Const.HOME_DIR_NAME, models.Const.HOME_CONFIG_NAME)

  const configToSave: models.HomeConfig = _.assign({}, config)
  configToSave.auth = encodeAuth(config.authConfig)
  configToSave.authConfig = null

	lib.writeSync(configFilePath, JSON.stringify(configToSave))
}

// logout user authorization
export function logout(config: models.HomeConfig) {
	config.authConfig = null
	saveConfig(config)
}

// encodeAuth creates a base64 encoded string to containing authorization information
export function encodeAuth(authConfig: models.HomeAuthConfig): string {
  if (!authConfig || !authConfig.username || !authConfig.password || !authConfig.accessToken) return ""
	const authStr = authConfig.username + "\n" + authConfig.password + "\n" + authConfig.accessToken
  return base64.Base64.encode(authStr)
}

// decodeAuth decodes a base64 encoded string and returns username and password
export function decodeAuth(base64Str: string): models.HomeAuthConfig {
  const authConfig = new models.HomeAuthConfig()
	if (!base64Str) {
		return authConfig
	}
	const authStr = base64.Base64.decode(base64Str)
	if (!authStr) {
		return authConfig
	}

	const arr = authStr.split('\n')
	if (arr.length !== 3) {
		return authConfig
	}

	authConfig.username = _.trim(arr[0], "\x00")
	authConfig.password = _.trim(arr[1], "\x00")
	authConfig.accessToken = _.trim(arr[2], "\x00")

  return authConfig
}
