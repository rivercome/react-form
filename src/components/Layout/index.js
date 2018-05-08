/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

const LayoutContent = (props) => {
  return (
    <div className='App'>
      <div className='App-header'>
        <img src='http://p2hfdzdsp.bkt.clouddn.com/acm.png' className='App-logo' alt='logo' />
      </div>
      <div className='App-content'>
        {props.children}
      </div>
    </div>
  )
}

export default LayoutContent
