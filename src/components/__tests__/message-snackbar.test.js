import React from 'react'
import { render, fireEvent, getAllByText  } from '@testing-library/react'
import MessageSnackBar from '../message-snackbar'


describe('message-snackbar', () => {  
  const props = {
    messages: [{    
      id: "213cd213-367s-67s6-6556-5sd5bbfc6d6d",
      priority: 1,
      message: "fkhkjffkgfgskls kdhjhd."
    }],
    errorMsg: true,
    customize: {
      columnTitle: 'Error Type 1',
      msgStyle: { backgroundColor: '#F56236' }
    }
  }

  it('is visible', () => {  
    const { container } = render(<MessageSnackBar {...props}/>)
    expect(container).toBeVisible()
  })

  it('contains message', () => {  
    const { container } = render(<MessageSnackBar {...props}/>)
    const messageText = getAllByText(container, 'fkhkjffkgfgskls kdhjhd.');
    expect(messageText).toBeInTheDOM;
   });

   /**
    * Since I could not find a way to have access to the display function 
    * inside the component, I tested if the event gets detected in the window.
    */
  it('detects button click on snackbar', () => {
    const { container } = render(<MessageSnackBar {...props}/>) 
    window.addEventListener = jest.fn();
    const button = container.querySelector('button')    
    fireEvent.click(button);
    expect(window.addEventListener).toHaveBeenCalled();
  });
})