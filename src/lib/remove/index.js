"use strict";
var fse = require("fs-extra");
function removeSync(dir) {
    try {
        fse.removeSync(dir);
    }
    catch (err) {
        console.error(err);
    }
}
exports.removeSync = removeSync;
//# sourceMappingURL=index.js.map