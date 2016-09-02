import * as fse from 'fs-extra'

export function removeSync(dir: string) {
  try {
    fse.removeSync(dir)
  } catch (err) {
    console.error(err)
  }
}
