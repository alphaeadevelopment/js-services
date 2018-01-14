import { forOwn, replace } from 'lodash'

const replacePlaceholders = (uri, params) => {
  let rv = uri
  forOwn(params, (v, k) => {
    rv = replace(rv, new RegExp(`:${k}`, 'g'), v)
  })
  return rv
}

export default replacePlaceholders
