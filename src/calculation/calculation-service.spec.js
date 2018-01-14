/* globals describe, it */
import { expect } from 'chai'
import calculationService from './calculation-service'

describe('calculationService.', () => {
  describe('sumValues', () => {
    it('totals the values', () => {
      const weights = {
        b: 2,
        a: 5,
      }
      const expected = 7
      expect(calculationService.sumValues(weights)).to.deep.equal(expected)
    })
  })
  describe('weightedAverage', () => {
    it('creates function that gives the weighted average of given values', () => {
      const values = {
        a: 2,
        b: 3,
      }
      const weights = {
        a: 1,
        b: 5,
      }
      const expected = ((2 * 1) + (3 * 5)) / 6
      const weightedAverageFunc = calculationService.weightedAverage(weights)
      expect(typeof weightedAverageFunc).to.equals('function')
      expect(weightedAverageFunc(values)).to.deep.equal(expected)
    })
  })
  describe('weighted', () => {
    it('creates function that applies given weights to values', () => {
      const values = {
        a: 2,
        b: 3,
      }
      const weights = {
        a: 1.2,
        b: 2,
      }
      const expected = {
        a: 2.4,
        b: 6,
      }
      const weightedValues = calculationService.weighted(weights)
      expect(typeof weightedValues).to.equal('function')
      expect(weightedValues(values)).to.deep.equal(expected)
    })
    it('defaults to weight of 1', () => {
      const values = {
        a: 2,
        b: 3,
      }
      const weights = {
        b: 2,
      }
      const expected = {
        a: 2,
        b: 6,
      }
      expect(calculationService.weighted(weights)(values)).to.deep.equal(expected)
    })
  })
  describe('range', () => {
    const ranger = calculationService.range(0, 100)
    describe('0-100', () => {
      it('returns 0 for 0', () => {
        expect(ranger(0)).to.equal(0)
      })
      it('returns 0 for -0.01', () => {
        expect(ranger(-0.01)).to.equal(0)
      })
      it('returns 1 for 100', () => {
        expect(ranger(100)).to.equal(1)
      })
      it('returns 1 for 100', () => {
        expect(ranger(100.01)).to.equal(1)
      })
    })
    const invRanger = calculationService.range(100, 0)
    describe('100-0', () => {
      it('returns 1 for 0', () => {
        expect(invRanger(0)).to.equal(1)
      })
      it('returns 1 for -0.01', () => {
        expect(invRanger(-0.01)).to.equal(1)
      })
      it('returns 0 for 100', () => {
        expect(invRanger(100)).to.equal(0)
      })
      it('returns 0 for 100.01', () => {
        expect(invRanger(100.01)).to.equal(0)
      })
    })
    const nonZeroRanger = calculationService.range(5, 10)
    describe('5-10', () => {
      it('returns 0 for 5', () => {
        expect(nonZeroRanger(5)).to.equal(0)
      })
      it('returns 1 for 10', () => {
        expect(nonZeroRanger(10)).to.equal(1)
      })
      it('returns 0 for 4.99', () => {
        expect(nonZeroRanger(4.99)).to.equal(0)
      })
      it('returns 1 for 10.01', () => {
        expect(nonZeroRanger(10.01)).to.equal(1)
      })
    })
  })
})
