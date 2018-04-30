import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './routes/app'

import './reset.css'

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <App />
  </Router>
), document.getElementById('root'))
