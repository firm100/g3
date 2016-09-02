import * as fse from 'fs-extra'
import * as path from 'path'
//import cheerio from 'cheerio'
import * as Promise from 'bluebird'
import * as _ from 'lodash'
import * as cp from 'child_process'
const remove = Promise.promisify(fse.remove)
const g3Cli = path.resolve('src', 'bin', 'index.js')
const babel = path.resolve('node_modules', '.bin', 'babel-node')

export function g3 (args = [], options = {}) {
  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''
    console.log(babel)
    console.log(_.concat(['--', g3Cli], args))
    const child = cp.spawn(babel, _.concat(['--', g3Cli], args), options)
    child.stdout.on('data', data => { stdout += data })
    child.stderr.on('data', data => { stderr += data })
    child.on('error', error => reject({ error, stderr, stdout }))
    child.on('exit', code => {
      if (code === 0) {
        resolve({ code, stdout, stderr })
      } else {
        reject({ code, stdout, stderr })
      }
    })
  })
}

export function build (appPath) {
  return g3(['build'], {cwd: appPath})
}

// export function dom (filePath) {
//   const readFile = Promise.promisify(fse.readFile)
//   return readFile(filePath)
//     .then(html => cheerio.load(html))
// }
