"use strict";
var Folders = (function () {
    function Folders(request) {
        this.request = request;
    }
    Folders.prototype.create = function (appPath, path, cb) {
        this.request.post('/apps/' + appPath + '/folders', {
            path: path
        }, cb);
    };
    Folders.prototype.delete = function (appPath, path, cb) {
        this.request.delete('/apps/' + appPath + '/folders', {
            path: path
        }, cb);
    };
    return Folders;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Folders;
//# sourceMappingURL=apps_folders.js.map