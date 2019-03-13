/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'

import App from '../components/homepage.js'

describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const app = mount(<App />)

    expect(app.find('h2').text()).toBe('Rupiah Denominations')
  })
})
