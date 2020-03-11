import React from 'react'
import { render, fireEvent, getAllByText, getByText } from '@testing-library/react'
import MessageList from '../message-list'


describe('message-list', () => {
  const props = {
    messages: [{    
      id: "213cd213-367s-67s6-6556-5sd5bbfc6d6d",
      priority: 3,
      message: "lklknklnkldnld bmbmbe."
    },
    {    
      id: "213dhj13-0000-0101-s0s0-379dhbfc6o4i",
      priority: 3,
      message: "ididgiduhdyd dhdhdhd."
    }],
    msgCustomize: {
      columnTitle: 'Info Type 3',
      msgStyle: { backgroundColor: '#88FCA3' }
    },
    handleMessage: null,
  }

  it('is visible', () => {  
    const { container } = render(<MessageList {...props}/>)
    expect(container).toBeVisible()
  })

  it('contains list title', () => {  
    const { container } = render(<MessageList {...props}/>)
    const listTitle = getAllByText(container, 'Info Type 3');
    expect(listTitle).toBeInTheDOM;
   });

   it('keeps track of counter', () => {
    const { container } = render(<MessageList {...props}/>)   
    const counterElement = getByText(container, 'Count', { exact: false} )
    expect(counterElement).toHaveTextContent('Count 2');
  });
})