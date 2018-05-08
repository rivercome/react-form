import React, { Component } from 'react'
import './index.css'
import 'antd/dist/antd.css'
import { Button, Col, Form, Input, message, Row } from 'antd'
import QueueAnim from 'rc-queue-anim'
import verify from '../../utils/Verify'

const FormItem = Form.Item;

@Form.create()
class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({loading: true})
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) { console.log(err) }
      else {
        const body = {
          ...values,
          // department: values.major[0],
          // major: values.major[1]
        }
        // 处理发送的数据
        fetch('url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then((res) => {
          return res.json()
        }).then((json) => {
          // 也可以直接对返回的res数据操作,看后端给的啥数据格式
          message.success('success')
          this.setState({submitted: true})
        }).catch((e) => {
          console.log(e.message)
        })
      }
    })
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000)
  }

  handleReset (e) {
    e.preventDefault()
    this.setState({loading: false})
    this.props.form.resetFields()
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12}
      }
    }
    return (
      <QueueAnim
        component='Form'
        type='top'
        className='main-content'
        delay={300}
        duration={600}
      >
        <div className='form-content-header' key='form-content-header'>
          <div className='form-content-header-title'>
            <br />
            校内选拔赛
          </div>
        </div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            label='队伍中文名称'
            {...formItemLayout}
            key='form-content-team-name_ch'
            hasFeedbacky
          >
            {getFieldDecorator('team_name_zh', {
              rules: [{

              }, {
                required: true, message: '请输入队伍中文名称'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='队伍英文名称'
            {...formItemLayout}
            key='form-content-team-english-name'
            hasFeedbacky
          >
            {getFieldDecorator('team_name_en', {
              rules: [{

              }, {
                required: true, message: '请输入队伍英文名称'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='队长姓名'
            {...formItemLayout}
            key='form-content-leader-name'
            hasFeedbacky
          >
            {getFieldDecorator('stu1_name', {
              rules: [{
                pattern: verify.chinese, message: '输入包含非中文字符！'
              }, {
                required: true, message: '请输入队长姓名'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='队员1姓名'
            {...formItemLayout}
            key='form-content-leader-name-1'
            hasFeedbacky
          >
            {getFieldDecorator('stu2_name', {
              rules: [{
                pattern: verify.chinese, message: '输入包含非中文字符！'
              }, {
                required: true, message: '请输入队员1姓名'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='队员2姓名'
            {...formItemLayout}
            key='form-content-leader-name-2'
            hasFeedbacky
          >
            {getFieldDecorator('stu3_name', {
              rules: [{
                pattern: verify.chinese, message: '输入包含非中文字符！'
              }, {
                required: true, message: '请输入队员2姓名'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>

          <FormItem
            key="form-content-footer"
            onSubmit={this.handleSubmit}
          >
            <Row gutter={16} type='flex'>
              <Col className='left-content' xs={{span: 24}} sm={{span: 12, offset: 6}}>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='form-button-1'
                  loading={this.state.loading}
                  disabled={this.state.submitted}
                >
                  {this.state.submitted ? '提交成功' : '点击提交'}
                </Button>
                <Button
                  type="ghost"
                  onClick={this.handleReset}
                  className='form-button-2'
                  style={{marginLeft: 110}}
                >
                  重置
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </QueueAnim>
    )
  }
}

export default HomePage
