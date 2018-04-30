import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout'
import NotFound from './404'

import Home from './home'
// async component
import AsyncComponent from '../components/AsyncComponent'

const AsyncDemo = AsyncComponent(() => import('./asyncDemo/index.js'))

const App = () => {
  return (
    <Layout>
      <Switch>
        <Redirect exact from='/' to='/home' />
        <Route path='/home' component={Home} />
        <Route path='/async' component={AsyncDemo} />
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </Layout>
  )
}

export default App
