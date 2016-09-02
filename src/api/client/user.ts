import * as http from '../http'
import * as models from '../../models'

export default class User {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  get(cb?: (err: models.Error, res: models.User) => void) {
    this.request.get('/user', null, cb)
  }
}
