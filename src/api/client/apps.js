"use strict";
var apps_files_1 = require('./apps_files');
var apps_folders_1 = require('./apps_folders');
var Apps = (function () {
    function Apps(request) {
        this.request = request;
        this.files = new apps_files_1.default(this.request);
        this.folders = new apps_folders_1.default(this.request);
    }
    Apps.prototype.add = function (dirPath, origin, check, cb) {
        this.request.post('/apps', {
            dirPath: dirPath,
            origin: origin,
            check: check,
        }, cb);
    };
    Apps.prototype.create = function (name, description, tags, origin, _private, cb) {
        this.request.post('/apps', {
            name: name,
            description: description,
            tags: tags,
            origin: origin,
            private: _private
        }, cb);
    };
    Apps.prototype.delete = function (appPath, keepFiles, cb) {
        this.request.delete('/apps/' + appPath, {
            keepFiles: keepFiles
        }, cb);
    };
    Apps.prototype.edit = function (appPath, data, cb) {
        this.request.patch('/apps/' + appPath, data, cb);
    };
    Apps.prototype.get = function (appPath, cb) {
        this.request.get('/apps/' + appPath, null, cb);
    };
    Apps.prototype.list = function (cb) {
        this.request.get('/apps', null, cb);
    };
    Apps.prototype.publish = function (appPath, cb) {
        this.request.post('/apps/' + appPath + '/actions/publish', null, cb);
    };
    Apps.prototype.star = function (appPath, star, cb) {
        this.request.post('/apps/' + appPath + '/actions/star', {
            star: star
        }, cb);
    };
    Apps.prototype.sync = function (appPath, cb) {
        this.request.post('/apps/' + appPath + '/actions/sync', null, cb);
    };
    return Apps;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Apps;
//# sourceMappingURL=apps.js.map