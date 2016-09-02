"use strict";
var User = (function () {
    function User(request) {
        this.request = request;
    }
    User.prototype.get = function (cb) {
        this.request.get('/user', null, cb);
    };
    return User;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=user.js.map