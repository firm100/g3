"use strict";
var users_tokens_1 = require('./users_tokens');
var Users = (function () {
    function Users(request) {
        this.request = request;
        this.tokens = new users_tokens_1.default(this.request);
    }
    Users.prototype.delete = function (password, cb) {
        this.request.delete('/users', {
            password: password
        }, cb);
    };
    Users.prototype.edit = function (data, cb) {
        this.request.patch('/users', data, cb);
    };
    Users.prototype.login = function (account, password, cb) {
        this.request.post('/users/actions/login', {
            account: account,
            password: password
        }, cb);
    };
    Users.prototype.logout = function (cb) {
        this.request.post('/users/actions/logout', null, cb);
    };
    Users.prototype.passwordForgot = function (email, cb) {
        this.request.post('/users/actions/password_forgot', {
            email: email
        }, cb);
    };
    Users.prototype.passwordReset = function (currentPassword, newPassword, cb) {
        this.request.post('/users/actions/password_reset', {
            currentPassword: currentPassword,
            newPassword: newPassword
        }, cb);
    };
    Users.prototype.signup = function (username, email, password, cb) {
        this.request.post('/users', {
            username: username,
            email: email,
            password: password
        }, cb);
    };
    return Users;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Users;
//# sourceMappingURL=users.js.map