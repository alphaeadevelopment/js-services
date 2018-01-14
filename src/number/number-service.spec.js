/* globals describe, it */
import { expect } from 'chai'

import numberService from './number-service'

describe('numberService', () => {
  describe('formatter(2) creates a function that, when called,', () => {
    const formatter = numberService.formatter(2)
    it('returns a string', () => {
      expect(typeof formatter(1.229)).to.equal('string')
    })
    it('formats a number to 2 decimal places, up', () => {
      expect(formatter(1.229)).to.equal('1.23')
    })
    it('formats a number to 2 decimal places, down', () => {
      expect(formatter(1.221)).to.equal('1.22')
    })
    it('formats a number to 2 decimal places, half-up', () => {
      expect(formatter(1.225)).to.equal('1.23')
    })
  })
  describe('formatNumber(n, 2)', () => {
    it('returns a string', () => {
      expect(typeof numberService.formatNumber(1.229, 2)).to.equal('string')
    })
    it('formats a number to 2 decimal places, up', () => {
      expect(numberService.formatNumber(1.229, 2)).to.equal('1.23')
    })
    it('formats a number to 2 decimal places, down', () => {
      expect(numberService.formatNumber(1.221, 2)).to.equal('1.22')
    })
    it('formats a number to 2 decimal places, half-up', () => {
      expect(numberService.formatNumber(1.225, 2)).to.equal('1.23')
    })
  })
  describe('round(n, d)', () => {
    it('rounds to 2 decimal places', () => {
      expect(numberService.round(1.223, 2)).to.equals(1.22)
    })
  })
})
