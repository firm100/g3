"use strict";
var path = require('path');
var chai = require('chai');
var lib = require('../');
var expect = chai.expect;
describe('copy', function () {
    it('publish', function (done) {
        var pagePath = path.resolve('./', 'package.json');
        var result = lib.readFileSync(pagePath);
        done();
    });
});
//# sourceMappingURL=index.spec.js.map