/* globals describe, it */
import { expect } from 'chai'
import replacePlaceholders from './replace-placeholders'

describe('replacePlaceholders', () => {
  it('replaces placeholder value', () => {
    const uri = '/get/entity/by/id/:id'
    const params = { id: 1234 }
    const expected = '/get/entity/by/id/1234'
    expect(replacePlaceholders(uri, params)).to.equal(expected)
  })
  it('replaces repeated placeholder values', () => {
    const uri = '/get/entity/by/id/:id/and/:id'
    const params = { id: 1234 }
    const expected = '/get/entity/by/id/1234/and/1234'
    expect(replacePlaceholders(uri, params)).to.equal(expected)
  })
  it('replaces multiple placeholder values', () => {
    const uri = '/get/entity/by/id/:id/and/name/:name'
    const params = { id: 1234, name: 'bob' }
    const expected = '/get/entity/by/id/1234/and/name/bob'
    expect(replacePlaceholders(uri, params)).to.equal(expected)
  })
})
