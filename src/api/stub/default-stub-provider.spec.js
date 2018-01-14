/* global describe, it */
/* eslint-disable no-console,no-unused-vars,no-unused-expressions */
import chai, { expect } from 'chai'
import sinon from 'sinon'

import { DefaultStubProvider } from './default-stub-provider'

chai.use(require('sinon-chai'))

const something = 'something'
const singleGroupFunc = v => v
const doubleGroupFunc = (a, b) => `${a}${b}`
const testStubs = [
  {
    path: /path\/to\/something\/?/,
    value: something,
  },
  {
    path: /regex\/path\/with\/group\/([a-z]+)$/,
    value: singleGroupFunc,
  },
  {
    path: /regex\/path\/with\/group\/(abc)\/and\/([0-9]+)$/,
    value: doubleGroupFunc,
  },
]

const stubProvider = new DefaultStubProvider(testStubs)

describe('DefaultStubProvider', () => {
  describe('RegExp url', () => {
    describe('with optional trailing slash', () => {
      it('resolves uri without trailing slash', () => {
        expect(stubProvider.getStubData('/path/to/something')).to.equal(something)
      })
      it('resolves uri with trailing slash', () => {
        expect(stubProvider.getStubData('/path/to/something/')).to.equal(something)
      })
    })
    describe('with single matching group', () => {
      it('calls function value with group match as parameter', () => {
        const expected = 'abc'
        expect(stubProvider.getStubData(`/regex/path/with/group/${expected}`)).to.equal(expected)
      })
    })
    describe('with two matching groups', () => {
      it('calls function value with both group matches as parameters', () => {
        const group1 = 'abc'
        const group2 = '123'
        const expected = `${group1}${group2}`
        expect(stubProvider.getStubData(`/regex/path/with/group/${group1}/and/${group2}`)).to.equal(expected)
      })
    })
  })
  describe('un-mapped uri', () => {
    it('resolve as undefined', () => {
      expect(stubProvider.getStubData('/this/uri/does/not/exist')).to.be.undefined
    })
  })
})
