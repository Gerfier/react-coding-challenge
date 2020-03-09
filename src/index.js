import React from 'react'
import ReactDOM from 'react-dom'
import MessageBoard from './components/message-board'

const NewApp = require('./components/message-board').default

function renderApp(App) {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp(MessageBoard)

if (module.hot) {
  module.hot.accept('./components/message-board', () => {
    renderApp(NewApp)
  })
}
