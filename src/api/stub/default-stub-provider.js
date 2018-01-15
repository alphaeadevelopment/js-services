// eslint-disable-next-line import/no-extraneous-dependencies,import/extensions,import/no-unresolved
import apiStubs from 'api-stubs';

import { forEach, isRegExp, isFunction, slice } from 'lodash';

const resolveValue = (value, args = [], body, method) => { // eslint-disable-line no-unused-vars
  if (!isFunction(value)) return value;
  return value.call(null, args, body, method);
};

const matchRegExp = (r, test, value, body, method) => {
  const res = r.exec(test);
  if (!res) return null;

  const args = slice(res, 1);
  return resolveValue(value, args, body, method);
};
class DefaultStubProvider {
  constructor(stubs) {
    this.stubs = stubs || apiStubs;
  }
  getStubData(uri, method, body) {
    let rv = null;
    forEach(this.stubs, (stub) => {
      if (rv) return;
      if (stub.method !== undefined && stub.method !== method) return;
      if (!isRegExp(stub.path)) rv = (stub.path === uri) ? resolveValue(stub.value, [], body, method) : null;
      else {
        rv = matchRegExp(stub.path, uri, stub.value, body, method);
      }
    });
    if (rv) return rv;
    return apiStubs[uri];
  }
}
export {
  DefaultStubProvider,
};
export default new DefaultStubProvider();
