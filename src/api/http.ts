import * as _ from 'lodash'
import * as base64 from 'js-base64'
import * as models from '../models'
var fetch = require('node-fetch');

function base64Encode(text: string): string {
  return base64.Base64.encode(text)
}

function snakeToCamelcase(key) {
  return key.replace(/(_+[a-z0-9])/g, function(snip) {
    return snip.toUpperCase().replace("_", "")
  })
}

function camelToSnakecase(key) {
  return key.replace(/([A-Z0-9])/g, function(snip) {
    return "_" + snip.toLowerCase()
  })
}

export function parseSnake(responseText) {
  if (!responseText) {
    return {}
  }
  return JSON.parse(responseText.replace(/"([^"]*)"\s*:/g, snakeToCamelcase))
}

function stringify(obj: Object) {
  return JSON.stringify(obj).replace(/"([^"]*)"\s*:/g, camelToSnakecase)
}

export class APIRequest {
  constructor(public options: models.Options) {
    this.options.api = options.api
  }

  private _getURL(path: string, data: any, method: string, api: string) {
    var url = path.indexOf('//') >= 0 ? path : api + path
    url += ((/\?/).test(url) ? '&' : '?')
    // Fix #195 about XMLHttpRequest.send method and GET/HEAD request
    if (_.isObject(data) && _.indexOf(['GET', 'HEAD'], method) > -1) {
      url += '&' + _.map(data, function(v, k) {
        return k + '=' + v
      }).join('&')
    }
    return url + '&' + (new Date()).getTime()
  }

  private _request(method: string, path: string, data: Object, cb?: (err: models.Error, res: Object, status?: number) => void) {
    const url = this._getURL(path, data, method, this.options.api)
    const headers = {
      'Accept': 'application/vnd.get3w+json; version=1',
      'Content-Type': 'application/json;charset=UTF-8'
    }
    if ((this.options.token) || (this.options.username && this.options.password)) {
      var authorization = this.options.token ? 'Bearer ' + this.options.token : 'Basic ' + base64Encode(this.options.username + ':' + this.options.password)
      headers['Authorization'] = authorization
    }
    const body = data? stringify(data) : null

    fetch(url, { method: method, body: body, headers: headers })
  	.then((res) => {
      cb(null, parseSnake(res.json()), 200)
  	}).then(function(json) {
      var err = parseSnake(json)
      cb({ status: 400, message: err.message || models.ERestMethodUtils.errorCode(400) }, null, 400)
  	});
  }

  public getURL(path: string): string {
    return this._getURL(path, null, "get", this.options.api)
  }

  public get(path: string, data: Object, cb?: (err: models.Error, data: Object, status?: number) => void) {
    return this._request("GET", path, data, cb)
  }

  public post(path: string, data: Object, cb?: (err: models.Error, data: Object, status?: number) => void) {
    return this._request("POST", path, data, cb)
  }

  public patch(path: string, data: Object, cb?: (err: models.Error, data: Object, status?: number) => void) {
    return this._request("PATCH", path, data, cb)
  }

  public put(path: string, data: Object, cb?: (err: models.Error, data: Object, status?: number) => void) {
    return this._request("PUT", path, data, cb)
  }

  public delete(path: string, data: Object, cb?: (err: models.Error, data: Object, status?: number) => void) {
    return this._request("DELETE", path, data, cb)
  }
}
