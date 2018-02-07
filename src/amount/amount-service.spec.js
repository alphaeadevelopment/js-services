/* globals describe, it */
import { expect } from 'chai'

import AmountService from './amount-service'

describe('AmountService', () => {
  describe('format', () => {
    it('formats to 2 decimal places, round down', () => {
      expect(AmountService.format(3.1235)).to.equal('3.12')
    })
    it('formats to 2 decimal places, round up', () => {
      expect(AmountService.format(3.1289)).to.equal('3.13')
    })
  })
})
