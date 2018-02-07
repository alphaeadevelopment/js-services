/* global describe, it */
/* eslint-disable no-console */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import StubApiService from './stub-api-service'

chai.use(require('sinon-chai'))

const stubbedUri = '/dummy/data'
const unstubbedUri = '/no/dummy/data'
const dummyResponse = { response: 'dummy' }
const realResponse = { response: 'real' }
const stubApiResponse = Promise.resolve(realResponse)

class DummyStubProvider {
  getStubData(uri) {
    return (uri === stubbedUri) ? dummyResponse : null
  }
}
const dummyStubProvider = new DummyStubProvider()


class NullService {
  constructor(stub) {
    this.stub = stub
  }
  getRequest() {
    return this.stub
  }
}

describe('stub api service', () => {
  it('returns dummy data in promise when available', () => (
    new Promise((done, fail) => {
      const nullService = new NullService()
      const spy = sinon.spy(nullService, 'getRequest')
      const stubApiService = new StubApiService(nullService, dummyStubProvider)

      stubApiService.get(stubbedUri)
        .then((response) => {
          expect(response).to.equal(dummyResponse)
          expect(spy).to.not.have.been.calledOnce // eslint-disable-line no-unused-expressions
          done()
        })
        .catch(e => fail(e))
    })
  ))
  it('invokes real service when no dummy data available', (done) => {
    const stub = sinon.stub()
    const realService = new NullService(stub)
    stub.returns(stubApiResponse)
    const stubApiService = new StubApiService(realService, dummyStubProvider)

    // realService.getRequest()
    stubApiService.get(unstubbedUri).then((response) => {
      expect(stub).to.have.been.calledOnce // eslint-disable-line no-unused-expressions
      expect(response).to.equal(realResponse)
      done()
    })
  })
  it('get() invokes get on real service', () => (
    new Promise((done, fail) => {
      const stub = sinon.stub()
      const realService = new NullService(stub)
      stub.returns(stubApiResponse)
      const stubApiService = new StubApiService(realService, dummyStubProvider)

      // realService.getRequest()
      stubApiService.get(unstubbedUri)
        .then(() => {
          expect(stub.calledWith(unstubbedUri, 'GET', sinon.match.any)).equals(true)
          done()
        })
        .catch(e => fail(e))
    })
  ))
  it('post() invokes post on real service with body', () => (
    new Promise((done, fail) => {
      const stub = sinon.stub()
      const realService = new NullService(stub)
      stub.returns(stubApiResponse)
      const stubApiService = new StubApiService(realService, dummyStubProvider)
      const body = { foo: 'bar' }
      // realService.getRequest()
      stubApiService.post(unstubbedUri, body)
        .then(() => {
          expect(stub.calledWith(unstubbedUri, 'POST', body)).equals(true)
          done()
        })
        .catch(e => fail(e))
    })
  ))
})
