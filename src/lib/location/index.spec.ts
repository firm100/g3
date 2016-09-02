import * as path from 'path'
import * as chai from 'chai'

import * as lib from '../'

var expect = chai.expect

describe('lib.location', function() {
  it('readdirSync', function(done) {
    const pagePath = path.resolve('./src/lib')
    const list = lib.listSync(pagePath)
    chai.assert.isAtLeast(list.dirnames.length, 1, 'dirs');
    chai.assert.isAtLeast(list.filenames.length, 3, 'files');

    done()
  })
})
