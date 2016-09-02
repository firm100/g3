import * as path from 'path'
import * as chai from 'chai'

import { g3, build } from '../'

var expect = chai.expect

describe('interation', function() {
  it('build', function(done) {
    const demoPath = path.resolve('src', 'test', 'demo')

    build(demoPath)

    done()
  })
})
