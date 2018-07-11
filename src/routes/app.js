import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout'
import NotFound from './404'

import Home from './home'
import AsyncDemo from './asyncDemo/index'
// const AsyncDemo = AsyncComponent(() => import('./asyncDemo/index.js'))

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/export' component={AsyncDemo} />
        <Route path='/' component={Home} />
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </Layout>
  )
}

export default App
