"use strict";
var path = require('path');
var chai = require('chai');
var _1 = require('../');
var expect = chai.expect;
describe('interation', function () {
    it('build', function (done) {
        var demoPath = path.resolve('src', 'test', 'demo');
        _1.build(demoPath);
        done();
    });
});
//# sourceMappingURL=build.js.map