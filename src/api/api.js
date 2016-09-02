"use strict";
var http = require('./http');
var user_1 = require('./client/user');
var users_1 = require('./client/users');
var apps_1 = require('./client/apps');
var search_1 = require('./client/search');
var API = (function () {
    function API(options) {
        this.options = options;
        var apiRequest = new http.APIRequest(options);
        this.user = new user_1.default(apiRequest);
        this.users = new users_1.default(apiRequest);
        this.apps = new apps_1.default(apiRequest);
        this.search = new search_1.default(apiRequest);
    }
    return API;
}());
exports.API = API;
//# sourceMappingURL=api.js.map