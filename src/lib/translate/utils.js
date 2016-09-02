"use strict";
var models = require('../../models');
function toComponentName(name) {
    if (models.Const.DEFAULT_TAG_NAMES_LOWER.indexOf(name.toLowerCase()) !== -1) {
        return models.Const.DEFAULT_TAG_NAMES[models.Const.DEFAULT_TAG_NAMES_LOWER.indexOf(name.toLowerCase())];
    }
    return name.toUpperCase();
}
exports.toComponentName = toComponentName;
//# sourceMappingURL=utils.js.map