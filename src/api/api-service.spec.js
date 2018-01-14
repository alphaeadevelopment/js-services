/* global describe, it, beforeEach */
import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
// eslint-disable-next-line global-require,import/no-webpack-loader-syntax
const inject = require('inject-loader!./api-service')

chai.use(sinonChai)

const JSON_MIME_TYPE = 'application/json'
const dummySuccessResponse = {
  status: 200,
  data: 'OK',
}
const fetchStub = sinon.stub()
const extractBodyStub = sinon.stub()

const ApiService = inject({
  'whatwg-fetch': fetchStub,
  './extract-body': extractBodyStub,
}).default
const apiBaseUri = '/base'
const testService = ({ getEndpoint, configuration } = {}) => (
  new ApiService({
    getEndpoint,
    configuration: configuration || { apiBaseUri },
  })
)


describe('api service', () => {
  describe('get()', () => {
    beforeEach(() => {
      fetchStub.reset()
      extractBodyStub.reset()
    })
    it('gets endpoint to use from endpoint provider', () => (
      new Promise((done, fail) => {
        fetchStub.returns(Promise.resolve(dummySuccessResponse))
        const uri = '/abc'
        const fullUri = `${apiBaseUri}${uri}`
        const getEndpoint = sinon.stub()
        getEndpoint.returns(fullUri)

        const service = testService({ getEndpoint })
        service.get(uri)
          .then(() => {
            expect(getEndpoint.calledWith(apiBaseUri, uri)).equals(true)
            expect(fetchStub.calledWith(fullUri)).equals(true)
            done()
          })
          .catch(e => fail(e))
      })
    ))
    it('calls fetch with method in options', () => (
      new Promise((done, fail) => {
        fetchStub.returns(Promise.resolve(dummySuccessResponse))
        const uri = '/abc'

        const service = testService()
        service.get(uri)
          .then(() => {
            expect(fetchStub.calledWith(sinon.match.string, sinon.match.has('method', 'GET'))).equals(true)
            done()
          })
          .catch(e => fail(e))
      })
    ))
    it('resolves to a promise of the result of extractBody method', () => (
      new Promise((done, fail) => {
        const uri = '/abc'
        const remoteResponse = ''
        fetchStub.returns(Promise.resolve(remoteResponse))
        extractBodyStub.returns(Promise.resolve(dummySuccessResponse))

        const service = new ApiService({
          configuration: { apiBaseUri },
        })
        service.get(uri)
          .then((r) => {
            expect(fetchStub.calledWith(sinon.match.string, sinon.match.has('method', 'GET'))).equals(true)
            expect(r).to.deep.equal(dummySuccessResponse)
            done()
          })
          .catch(e => fail(e))
      })
    ))
  })
  describe('post', () => {
    beforeEach(() => {
      fetchStub.reset()
      extractBodyStub.reset()
    })
    it('sends post with body', () => (
      new Promise((done, fail) => {
        fetchStub.returns(Promise.resolve(dummySuccessResponse))
        const service = new ApiService({
          configuration: { apiBaseUri },
        })
        const uri = '/post-uri'
        const body = { foo: 'bar' }
        const strBody = JSON.stringify(body)
        service.post(uri, body)
          .then(() => {
            expect(fetchStub.calledWith(
              sinon.match.string,
              sinon.match.has('method', 'POST')
                .and(sinon.match.has('body', strBody))
            )).equals(true)
            done()
          })
          .catch(e => fail(e))
      })
    ))
    it('sends headers Content-Type and Accept as json', () => (
      new Promise((done, fail) => {
        fetchStub.returns(Promise.resolve(dummySuccessResponse))
        const service = testService()
        const uri = '/post-uri'
        service.post(uri, '')
          .then(() => {
            expect(fetchStub.calledWith(
              sinon.match.string,
              sinon.match.has('headers',
                sinon.match.has('Accept', JSON_MIME_TYPE)
                  .and(sinon.match.has('Content-Type', JSON_MIME_TYPE))
              ),
            )).equals(true)
            done()
          })
          .catch(e => fail(e))
      })
    ))
  })
})
