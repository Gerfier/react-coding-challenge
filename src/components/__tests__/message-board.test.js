import React from 'react'
import { render } from '@testing-library/react'
import MessageBoard from '../message-board'

describe('message-board', () => {
  it('Board rendered', () => {
    const { container } = render(<MessageBoard />)
    expect(container).toBeVisible()
  })
})