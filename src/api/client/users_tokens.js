"use strict";
var Tokens = (function () {
    function Tokens(request) {
        this.request = request;
    }
    Tokens.prototype.create = function (scopes, cb) {
        this.request.post('/users/tokens', {
            scopes: scopes
        }, cb);
    };
    Tokens.prototype.delete = function (accessToken, cb) {
        this.request.delete('/users/tokens/' + accessToken, null, cb);
    };
    Tokens.prototype.get = function (scopes, cb) {
        this.request.get('/users/tokens', {
            scopes: scopes
        }, cb);
    };
    Tokens.prototype.list = function (cb) {
        this.request.get('/users/tokens', null, cb);
    };
    Tokens.prototype.regenerate = function (scopes, cb) {
        this.request.post('/users/tokens/actions/regenerate', {
            scopes: scopes
        }, cb);
    };
    return Tokens;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tokens;
//# sourceMappingURL=users_tokens.js.map