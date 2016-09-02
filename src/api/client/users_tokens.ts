import * as http from '../http'
import * as models from '../../models'

export default class Tokens {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  create(scopes: string, cb?: (err: models.Error, res: models.Token) => void) {
    this.request.post('/users/tokens', {
      scopes: scopes
    }, cb)
  }

  delete(accessToken: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/users/tokens/' + accessToken, null, cb)
  }

  get(scopes: string, cb?: (err: models.Error, res: models.Token) => void) {
    this.request.get('/users/tokens', {
      scopes: scopes
    }, cb)
  }

  list(cb?: (err: models.Error, res: Array<models.Token>) => void) {
    this.request.get('/users/tokens', null, cb)
  }

  regenerate(scopes: string, cb?: (err: models.Error, res: models.Token) => void) {
    this.request.post('/users/tokens/actions/regenerate', {
      scopes: scopes
    }, cb)
  }
}
