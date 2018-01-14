/* eslint-disable arrow-body-style */
import Rx from 'rx'
import fetch from 'isomorphic-fetch'

import getRequestParameters from './get-request-parameters'
import isPassThroughError from './is-pass-through-error'
import toError from './to-error'
import isError from './is-error'
import passThroughError from './pass-through-error'
import configurationService from '../configuration'
import defaultEndpointProvider from './endpoint-provider.js'

const GET = 'GET'
const TIMEOUT = 'timeout'

const createRequest = (
  maxResponseTime, endpointProvider,
) => (uri, method, body) => { // eslint-disable-line no-unused-vars
  const requestUri = endpointProvider.getEndpointUri(configurationService.apiBaseUri, uri)
  const requestParameters = getRequestParameters()
  return Rx.Observable
    .fromPromise(fetch(requestUri, requestParameters))
    .timeout(maxResponseTime, Rx.Observable.throw({ TIMEOUT }))
    .toPromise()
    .then((r) => {
      if (!isPassThroughError(r.status)) {
        if (isError(r.status)) {
          return Promise.reject(toError(r))
        }
        return r
      }
      return passThroughError(r)
    })
    .then((r) => {
      // notify success handlers
      return r
    })
    .catch((e) => {
      // notify handlers
      return Promise.reject(e)
    })
}


class DummyClass {

}

export default DummyClass
