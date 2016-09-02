import * as models from '../models'
import {API} from './api'

export function getClient(accessToken: string): API {
  const options: models.Options = {
    token: accessToken
  }
  const client = new API(options)
  return client
}
