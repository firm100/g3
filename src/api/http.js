"use strict";
var _ = require('lodash');
var base64 = require('js-base64');
var models = require('../models');
var fetch = require('node-fetch');
function base64Encode(text) {
    return base64.Base64.encode(text);
}
function snakeToCamelcase(key) {
    return key.replace(/(_+[a-z0-9])/g, function (snip) {
        return snip.toUpperCase().replace("_", "");
    });
}
function camelToSnakecase(key) {
    return key.replace(/([A-Z0-9])/g, function (snip) {
        return "_" + snip.toLowerCase();
    });
}
function parseSnake(responseText) {
    if (!responseText) {
        return {};
    }
    return JSON.parse(responseText.replace(/"([^"]*)"\s*:/g, snakeToCamelcase));
}
exports.parseSnake = parseSnake;
function stringify(obj) {
    return JSON.stringify(obj).replace(/"([^"]*)"\s*:/g, camelToSnakecase);
}
var APIRequest = (function () {
    function APIRequest(options) {
        this.options = options;
        this.options.api = options.api;
    }
    APIRequest.prototype._getURL = function (path, data, method, api) {
        var url = path.indexOf('//') >= 0 ? path : api + path;
        url += ((/\?/).test(url) ? '&' : '?');
        if (_.isObject(data) && _.indexOf(['GET', 'HEAD'], method) > -1) {
            url += '&' + _.map(data, function (v, k) {
                return k + '=' + v;
            }).join('&');
        }
        return url + '&' + (new Date()).getTime();
    };
    APIRequest.prototype._request = function (method, path, data, cb) {
        var url = this._getURL(path, data, method, this.options.api);
        var headers = {
            'Accept': 'application/vnd.get3w+json; version=1',
            'Content-Type': 'application/json;charset=UTF-8'
        };
        if ((this.options.token) || (this.options.username && this.options.password)) {
            var authorization = this.options.token ? 'Bearer ' + this.options.token : 'Basic ' + base64Encode(this.options.username + ':' + this.options.password);
            headers['Authorization'] = authorization;
        }
        var body = data ? stringify(data) : null;
        fetch(url, { method: method, body: body, headers: headers })
            .then(function (res) {
            cb(null, parseSnake(res.json()), 200);
        }).then(function (json) {
            var err = parseSnake(json);
            cb({ status: 400, message: err.message || models.ERestMethodUtils.errorCode(400) }, null, 400);
        });
    };
    APIRequest.prototype.getURL = function (path) {
        return this._getURL(path, null, "get", this.options.api);
    };
    APIRequest.prototype.get = function (path, data, cb) {
        return this._request("GET", path, data, cb);
    };
    APIRequest.prototype.post = function (path, data, cb) {
        return this._request("POST", path, data, cb);
    };
    APIRequest.prototype.patch = function (path, data, cb) {
        return this._request("PATCH", path, data, cb);
    };
    APIRequest.prototype.put = function (path, data, cb) {
        return this._request("PUT", path, data, cb);
    };
    APIRequest.prototype.delete = function (path, data, cb) {
        return this._request("DELETE", path, data, cb);
    };
    return APIRequest;
}());
exports.APIRequest = APIRequest;
//# sourceMappingURL=http.js.map