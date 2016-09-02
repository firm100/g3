import * as _ from 'lodash'
import * as path from 'path'
import * as fse from 'fs-extra'

export function urlJoin(...paths: string[]) {
  const str = path.join(...paths)
	var isExtendedLengthPath = /^\\\\\?\\/.test(str);
	var hasNonAscii = /[^\x00-\x80]+/.test(str);

	if (isExtendedLengthPath || hasNonAscii) {
		return str;
	}

	return str.replace(/\\/g, '/');
}

export function isDirectory(filepath: string): boolean {
  try {
    const stats: fse.Stats = fse.lstatSync(filepath)
    return stats.isDirectory()
  } catch(err) {
    return false
  }
}

export function isFile(filepath: string): boolean {
  try {
    const stats: fse.Stats = fse.lstatSync(filepath)
    return stats.isFile()
  } catch(err) {
    return false
  }
}

export function isMarkdown(filepath: string): boolean {
  if (_.endsWith(filepath, '.md')) {
    return true
  }
  return false
}
