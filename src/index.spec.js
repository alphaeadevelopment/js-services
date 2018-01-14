/* globals describe, it */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import { calculation } from './index'

describe('js-service', () => {
  it('provides calculation service', () => {
    expect(calculation).to.not.be.undefined
  })
})
