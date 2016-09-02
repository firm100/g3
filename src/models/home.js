"use strict";
var const_1 = require('./const');
var HomeAuthConfig = (function () {
    function HomeAuthConfig() {
    }
    return HomeAuthConfig;
}());
exports.HomeAuthConfig = HomeAuthConfig;
var HomeConfig = (function () {
    function HomeConfig() {
    }
    return HomeConfig;
}());
exports.HomeConfig = HomeConfig;
var App = (function () {
    function App() {
    }
    return App;
}());
exports.App = App;
var File = (function () {
    function File(isDir, path, name, size) {
        this.isDir = isDir;
        this.path = path;
        this.name = name;
        this.size = size;
    }
    return File;
}());
exports.File = File;
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Token = (function () {
    function Token() {
    }
    return Token;
}());
exports.Token = Token;
var Upload = (function () {
    function Upload() {
    }
    return Upload;
}());
exports.Upload = Upload;
(function (ERestMethod) {
    ERestMethod[ERestMethod["GET"] = 0] = "GET";
    ERestMethod[ERestMethod["POST"] = 1] = "POST";
    ERestMethod[ERestMethod["PUT"] = 2] = "PUT";
    ERestMethod[ERestMethod["DELETE"] = 3] = "DELETE";
    ERestMethod[ERestMethod["PATCH"] = 4] = "PATCH";
})(exports.ERestMethod || (exports.ERestMethod = {}));
var ERestMethod = exports.ERestMethod;
var ERestMethodUtils = (function () {
    function ERestMethodUtils() {
    }
    ERestMethodUtils.getValue = function (method) {
        if (method === ERestMethod.GET) {
            return "GET";
        }
        else if (method === ERestMethod.POST) {
            return "POST";
        }
        else if (method === ERestMethod.PUT) {
            return "PUT";
        }
        else if (method === ERestMethod.DELETE) {
            return "DELETE";
        }
        else if (method === ERestMethod.PATCH) {
            return "PATCH";
        }
        return "POST";
    };
    ERestMethodUtils.equals = function (methodStr, method) {
        return (ERestMethodUtils.getValue(method) === methodStr);
    };
    ERestMethodUtils.errorCode = function (status) {
        switch (status) {
            case const_1.Const.STATUS_BAD_REQUEST:
                return 'Bad Request';
            case const_1.Const.STATUS_UNAUTHORIZED:
                return 'Unauthorized';
            case const_1.Const.STATUS_PAYMENT_REQUIRED:
                return 'Payment Required';
            case const_1.Const.STATUS_FORBIDDEN:
                return 'Forbidden';
            case const_1.Const.STATUS_NOT_FOUND:
                return 'Not Found';
            case const_1.Const.STATUS_METHOD_NOT_ALLOWED:
                return 'Method Not Allowed';
            case const_1.Const.STATUS_NOT_ACCEPTABLE:
                return 'Not Acceptable';
            case const_1.Const.STATUS_PROXY_AUTHENTICATION_REQUIRED:
                return 'Proxy Authentication Required';
            case const_1.Const.STATUS_REQUEST_TIMEOUT:
                return 'Request Timeout';
            case const_1.Const.STATUS_CONFLICT:
                return 'Conflict';
            case const_1.Const.STATUS_GONE:
                return 'Gone';
            case const_1.Const.STATUS_LENGTH_REQUIRED:
                return 'Length Required';
            case const_1.Const.STATUS_INTERNAL_SERVER_ERROR:
                return 'Internal Server Error';
        }
        return 'Unknown Error';
    };
    return ERestMethodUtils;
}());
exports.ERestMethodUtils = ERestMethodUtils;
//# sourceMappingURL=home.js.map