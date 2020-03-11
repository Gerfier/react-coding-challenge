import React from 'react'
import { render, fireEvent, getByRole } from '@testing-library/react'
import Message from '../message'

describe('message', () => {
  const handleMessage = jest.fn();
  const props = {
    data: {    
      message: "fkhkjffkgfgskls kdhjhd."
    },
    msgClass: { backgroundColor: '#F56236' },
    handleMessage,
  }

  it('is visible', () => {
    const { container } = render(<Message {...props}/>)
    expect(container).toBeVisible()
  })

  it('displays button text', () => {
    const { container } = render(<Message {...props}/>)
    const button = container.querySelector('button')
    expect(button).toHaveTextContent("Clear")
  });

  it('handleMessage event handler triggers', () => {
    const { container } = render(<Message {...props}/>)   
    fireEvent.click(getByRole(container, 'button'));
    expect(handleMessage).toHaveBeenCalledTimes(1)
  });
})