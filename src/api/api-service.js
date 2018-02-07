/* eslint-disable arrow-body-style */
import Rx from 'rx';
import fetch from 'fetch-everywhere';
import getRequestParameters from './get-request-parameters';
import isPassThroughError from './is-pass-through-error';
import toError from './to-error';
import isError from './is-error';
import passThroughError from './pass-through-error';
import configurationService from '../configuration';
import defaultGetEndpoint from './get-endpoint';
import extractBody from './extract-body';
import replacePlaceholders from './replace-placeholders';

const GET = 'GET';
const POST = 'POST';
const TIMEOUT = 'timeout';

const createRequest = (
  maxResponseTime, getEndpoint, configuration,
) => (uri, method, body) => { // eslint-disable-line no-unused-vars
  const requestUri = getEndpoint(configuration.apiBaseUri || '', uri);
  const options = ({ method });
  if (body) options.body = JSON.stringify(body);
  const requestParameters = getRequestParameters(options);
  return Rx.Observable
    .fromPromise(fetch(requestUri, requestParameters))
    .timeout(maxResponseTime, Rx.Observable.throw({ TIMEOUT }))
    .toPromise()
    .then((r) => {
      if (!isPassThroughError(r.status)) {
        if (isError(r.status)) {
          return Promise.reject(toError(r));
        }
        return extractBody(r);
      }
      return passThroughError(r);
    })
    .then((r) => {
      // notify success handlers
      return r;
    })
    .catch((e) => {
      // notify handlers
      return Promise.reject(e);
    });
};

export default class ApiService {
  constructor(options = {}) {
    this.maxResponseTime = options.maxResponseTime || 10000;
    this.getEndpoint = options.getEndpoint || defaultGetEndpoint;
    this.configuration = options.configuration;
  }

  getRequest() {
    return createRequest(
      this.maxResponseTime,
      this.getEndpoint,
      this.configuration || configurationService.getConfiguration(),
    );
  }

  get(uri, params = {}) {
    return this.getRequest()(replacePlaceholders(uri, params), GET);
  }

  post(uri, body) {
    return this.getRequest()(uri, POST, body);
  }
}
