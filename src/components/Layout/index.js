/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import url from '../../../public/back.jpg'
import './index.less'

const LayoutContent = (props) => {
  return (
    <div className='App'>
      <div className='App-header'>
        {/*<img src='http://p2hfdzdsp.bkt.clouddn.com/acm.png' className='App-logo' alt='logo' />*/}
      </div>
      <div className='App-content'>
        <div className='App-form'>
        {props.children}
        </div>
      </div>
      <div className='App-footer' />

    </div>
  )
}

export default LayoutContent
