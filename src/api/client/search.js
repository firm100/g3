"use strict";
var Search = (function () {
    function Search(request) {
        this.request = request;
    }
    Search.prototype.apps = function (query, tag, sort, order, cb) {
        this.request.get('/search/apps', {
            query: query,
            tag: tag,
            sort: sort,
            order: order
        }, cb);
    };
    return Search;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Search;
//# sourceMappingURL=search.js.map