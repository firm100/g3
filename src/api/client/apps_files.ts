import * as http from '../http'
import * as models from '../../models'

export default class Files {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  delete(appPath: string, path: string, cb?: (err: models.Error, res: {
    lastModified: string
  }) => void) {
    this.request.delete('/apps/' + appPath + '/files/' + path, null, cb)
  }

  edit(appPath: string, path: string, content: string, cb: (err: models.Error, res: {
    lastModified: string
  }) => void) {
    this.request.put('/apps/' + appPath + '/files/' + path, {
      content: content
    }, cb)
  }

  get(appPath: string, path: string, cb: (err: models.Error, res: {
    content: string
  }) => void) {
    this.request.get('/apps/' + appPath + '/' + path, null, cb)
  }

  list(appPath: string, path: string, cb?: (err: models.Error, res: Array<models.File>) => void) {
    if (!path || path == "/" || path == "." || path == "./") {
      this.request.get('/apps/' + appPath + '/files', null, cb)
    }else{
      this.request.get('/apps/' + appPath + '/files/' + path, null, cb)
    }
  }

  // checksum get path and checksum map of all files
  checksum(owner: string, name: string, cb?: (err: models.Error, res: {
    files: {[index: string]: string}
  }) => void) {
    this.request.post('/apps/' + owner + "/" + name + '/files/actions/checksum', null, cb)
  }

  getUploadUrl(appPath: string, location: string): string {
    return this.request.getURL('/apps/' + appPath + '/files/actions/upload?location=' + location)
  }

  getDownloadUrl(appPath: string): string {
    return this.request.getURL('/apps/' + appPath + '/files/actions/download')
  }
}
