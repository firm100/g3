"use strict";
var api_1 = require('./api');
function getClient(accessToken) {
    var options = {
        token: accessToken
    };
    var client = new api_1.API(options);
    return client;
}
exports.getClient = getClient;
//# sourceMappingURL=index.js.map