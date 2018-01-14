/* globals describe, it */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import docObject from './document'

describe('document', () => {
  it('provides document object', () => {
    expect(docObject).to.not.be.undefined
  })
})
