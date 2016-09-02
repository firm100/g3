"use strict";
var prepare_1 = require('./prepare');
var parseSourceFiles_1 = require('./parseSourceFiles');
function parse(g3Config) {
    prepare_1.prepare(g3Config);
    return parseSourceFiles_1.parseSourceFiles(g3Config);
}
exports.parse = parse;
//# sourceMappingURL=index.js.map