"use strict";
var path = require('path');
var chai = require('chai');
var lib = require('../');
var expect = chai.expect;
describe('lib.location', function () {
    it('readdirSync', function (done) {
        var pagePath = path.resolve('./src/lib');
        var list = lib.listSync(pagePath);
        chai.assert.isAtLeast(list.dirnames.length, 1, 'dirs');
        chai.assert.isAtLeast(list.filenames.length, 3, 'files');
        done();
    });
});
//# sourceMappingURL=index.spec.js.map