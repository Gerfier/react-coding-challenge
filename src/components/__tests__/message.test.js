import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Message from '../message'

describe('message', () => {
  const handleMessage = jest.fn();
  const props = {
    data: {    
      message: "fkhkjffkgfgskls kdhjhd.",
      id: "73897",
      priority: 2,
    },
    msgClass: { backgroundColor: '#F56236' },
    handleMessage,
  }

  it('is visible', () => {
    const { container } = render(<Message {...props}/>)
    expect(container).toBeVisible()
  })

  it('displays button to remove message', () => {
    const { container } = render(<Message {...props}/>)
    const button = container.querySelector('button')
    expect(button).toBeVisible()
  });

  it('handleMessage event handler triggers', () => {
    const { container } = render(<Message {...props}/>)   
    fireEvent.click(container.querySelector('button'));
    expect(handleMessage).toHaveBeenCalledTimes(1)
  });
})