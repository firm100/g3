import * as http from '../http'
import * as models from '../../models'
import Tokens from './users_tokens'

export default class Users {
  private request: http.APIRequest
  public tokens: Tokens

  constructor(request: http.APIRequest) {
    this.request = request
    this.tokens = new Tokens(this.request)
  }

  delete(password: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.delete('/users', {
      password: password
    }, cb)
  }

  edit(data: Object, cb?: (err: models.Error, res: models.User) => void) {
    this.request.patch('/users', data, cb)
  }

  login(account: string, password: string, cb?: (err: models.Error, res: {
    user: models.User
    accessToken: string
  }) => void) {
    this.request.post('/users/actions/login', {
      account: account,
      password: password
    }, cb)
  }

  logout(cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/users/actions/logout', null, cb)
  }

  passwordForgot(email: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/users/actions/password_forgot', {
      email: email
    }, cb)
  }

  passwordReset(currentPassword: string, newPassword: string, cb?: (err: models.Error, res: {}) => void) {
    this.request.post('/users/actions/password_reset', {
      currentPassword: currentPassword,
      newPassword: newPassword
    }, cb)
  }

  signup(username: string, email: string, password: string, cb?: (err: models.Error, res: {
    user: models.User
    accessToken: string
  }) => void) {
    this.request.post('/users', {
      username: username,
      email: email,
      password: password
    }, cb)
  }
}
