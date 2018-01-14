import apiStubs from 'api-stubs'

import { forEach, isRegExp, isFunction, slice } from 'lodash'

const matchRegExp = (r, test, value) => {
  const res = r.exec(test)
  if (!res) return null

  const args = slice(res, 1)
  if (!isFunction(value)) return value
  return value(...args)
}
class DefaultStubProvider {

  constructor(stubs) {
    this.stubs = stubs || apiStubs
  }
  getStubData(uri) {
    let rv = null
    forEach(this.stubs, ({ path, value }) => {
      if (rv) return
      if (!isRegExp(path)) rv = (path === uri) ? value : null
      else {
        rv = matchRegExp(path, uri, value)
      }
    })
    if (rv) return rv
    return apiStubs[uri]
  }
}
export {
  DefaultStubProvider,
}
export default new DefaultStubProvider()
