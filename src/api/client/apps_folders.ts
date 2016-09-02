import * as http from '../http'
import * as models from '../../models'

export default class Folders {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(appPath: string, path: string, cb?: (err: models.Error, res: {
    lastModified: string
  }) => void) {
    this.request.post('/apps/' + appPath + '/folders', {
      path: path
    }, cb)
  }

  delete(appPath: string, path: string, cb?: (err: models.Error, res: {
    lastModified: string
  }) => void) {
    this.request.delete('/apps/' + appPath + '/folders', {
      path: path
    }, cb)
  }
}
