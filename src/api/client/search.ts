import * as http from '../http'
import * as models from '../../models'

export default class Search {
  private request: http.APIRequest

  constructor(request: http.APIRequest) {
    this.request = request
  }

  apps(query: string, tag: string, sort: string, order: string, cb?: (err: models.Error, res: {
    totalCount: number,
    items: Array<{
      app: models.App,
      user: models.User
    }>
  }) => void) {
    this.request.get('/search/apps', {
      query: query,
      tag: tag,
      sort: sort,
      order: order
    }, cb)
  }
}
