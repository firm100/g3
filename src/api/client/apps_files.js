"use strict";
var Files = (function () {
    function Files(request) {
        this.request = request;
    }
    Files.prototype.delete = function (appPath, path, cb) {
        this.request.delete('/apps/' + appPath + '/files/' + path, null, cb);
    };
    Files.prototype.edit = function (appPath, path, content, cb) {
        this.request.put('/apps/' + appPath + '/files/' + path, {
            content: content
        }, cb);
    };
    Files.prototype.get = function (appPath, path, cb) {
        this.request.get('/apps/' + appPath + '/' + path, null, cb);
    };
    Files.prototype.list = function (appPath, path, cb) {
        if (!path || path == "/" || path == "." || path == "./") {
            this.request.get('/apps/' + appPath + '/files', null, cb);
        }
        else {
            this.request.get('/apps/' + appPath + '/files/' + path, null, cb);
        }
    };
    Files.prototype.checksum = function (owner, name, cb) {
        this.request.post('/apps/' + owner + "/" + name + '/files/actions/checksum', null, cb);
    };
    Files.prototype.getUploadUrl = function (appPath, location) {
        return this.request.getURL('/apps/' + appPath + '/files/actions/upload?location=' + location);
    };
    Files.prototype.getDownloadUrl = function (appPath) {
        return this.request.getURL('/apps/' + appPath + '/files/actions/download');
    };
    return Files;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Files;
//# sourceMappingURL=apps_files.js.map