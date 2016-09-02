import * as fse from 'fs-extra'

export function readFileSync(filepath: string): string {
  return fse.readFileSync(filepath, 'utf-8')
}

export function readFile(filepath: string, callback: (error: Error, data: NodeBuffer) => void) {
  fse.readFile(filepath, callback)
}
