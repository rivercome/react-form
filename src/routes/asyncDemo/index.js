import React, { Component } from 'react'
import { Input, Button, message } from 'antd'

class AsyncDemo extends Component {
  constructor (){
    super()
    this.state = {
      value: ''
    }
    this.handlSubmit = this.handlSubmit.bind(this)
  }

  getSecret(e) {
    this.setState({value: e.target.value})
  }
  handlSubmit() {
    // console.log(this.state)
    if (this.state.value === 'neuqAcm111') {
      const link = 'neuqAcm111'
      window.location.href = 'http://camp.andyhui.xin/student/export?password=neuqAcm111'
     }
    else {
      message.error('密码错误')
    }
  }
  render () {

    return (
      <div>
        <Input addonBefore="密码" style={{width: '83%'}} onChange={(e) => {this.getSecret(e)}} />
        <Button style={{width: '8%'}} onClick={this.handlSubmit}>提交</Button>
      </div>
    )
  }
}

export default AsyncDemo
