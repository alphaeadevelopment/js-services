/* globals describe, it */
import { expect } from 'chai'
import moment from 'moment'

import dateService from './date-service'

describe('dateService', () => {
  describe('currentDate', () => {
    it('provides a Date object', () => {
      expect(dateService.currentDate().toDate()).to.be.instanceof(Date)
    })
  })
  describe('dateFromString', () => {
    it('converts YYYY-MM-DD', () => {
      const str = '2015-12-31'
      expect(dateService.dateFromString(str).toDate()).to.be.instanceof(Date)
      expect(dateService.dateFromString(str).year()).to.equal(2015)
      expect(dateService.dateFromString(str).month()).to.equal(11)
      expect(dateService.dateFromString(str).date()).to.equal(31)
    })
    it('converts YYYYMMDD', () => {
      const str = '20151231'
      expect(dateService.dateFromString(str).toDate()).to.be.instanceof(Date)
      expect(dateService.dateFromString(str).year()).to.equal(2015)
      expect(dateService.dateFromString(str).month()).to.equal(11)
      expect(dateService.dateFromString(str).date()).to.equal(31)
    })
    it('converts DD/MM/YYYY', () => {
      const str = '31/12/2015'
      const format = 'DD/MM/YYYY'
      expect(dateService.dateFromString(str, format).toDate()).to.be.instanceof(Date)
      expect(dateService.dateFromString(str, format).year()).to.equal(2015)
      expect(dateService.dateFromString(str, format).month()).to.equal(11)
      expect(dateService.dateFromString(str, format).date()).to.equal(31)
    })
  })
  describe('dateToString', () => {
    it('formats date object to YYYY-MM-DD', () => {
      const format = 'YYYY-MM-DD'
      const m = moment()
      const str = m.format(format)
      expect(dateService.dateToString(m.toDate(), format)).to.equal(str)
    })
    it('formats string YYYY-MM-DD to DD/MM/YYYY', () => {
      const format = 'DD/MM/YYYY'
      const str = '25/12/2016'
      expect(dateService.dateToString('2016-12-25', format)).to.equal(str)
    })
  })
  describe('daysSince', () => {
    it('returns 1 for yesterday, default string format', () => {
      const yday = moment().subtract(1, 'days').format()
      expect(dateService.daysSince(yday)).to.equal(1)
    })
    it('returns 1 for yesterday, DD/MM/YYYY format', () => {
      const dateFormat = 'DD/MM/YYYY'
      const yday = moment().subtract(1, 'days').format(dateFormat)
      expect(dateService.daysSince(yday, dateFormat)).to.equal(1)
    })
  })
})
