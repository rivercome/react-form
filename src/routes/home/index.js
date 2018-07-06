import React, { Component } from 'react'
import './index.css'
import 'antd/dist/antd.css'
import { Button, Col, Form, Input, message, Row, Cascader, Radio } from 'antd'
import QueueAnim from 'rc-queue-anim'
import verify from '../../utils/Verify'
import departOptions from '../../utils/Options'

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const gradeOptions = [{
  value: '2017',
  label: '2017',
},
  {
    value: '2016',
    label: '2016',
  },
  {
    value: '2015',
    label: '2015',
  }
]
const currentOption = [{
  value: '2018年下',
  label: '2018年下'
}]
const courseOptions = [{
  value: '算法与程序设计基础实训',
  label: '算法与程序设计基础实训'
}, {
  value: '工程创新实践实训',
  label: '工程创新实践实训'
}]
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
          current_year: '2018年下',
          department: values.major[0],
          major: values.major[1],
          course: values.course[0],
          grade: values.grade[0],
        }
        // 处理发送的数据
        fetch('http://syb.andyhui.xin/student/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then((res) => {
          return res.json()
        }).then((json) => {
          // 也可以直接对返回的res数据操作,看后端给的啥数据格式
          console.log(json)
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
            实验班报名
          </div>
        </div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            label='姓名'
            {...formItemLayout}
            key='form-content-name'
            hasFeedbacky
          >
            {getFieldDecorator('name', {
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
            label='性别'
            {...formItemLayout}
            key='form-content-sex'
          >
            {getFieldDecorator('sex', {
              rules: [{required: true, message: '请选择参赛组别'}],
            })(
              <RadioGroup>
                <Radio value='男'>男</Radio>
                <Radio value='女'>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label='年级'
            {...formItemLayout}
          >
            {getFieldDecorator('grade', {
              rules: [{
                required: true, message: '请选择年级'
              }]
            })(
              <Cascader options={gradeOptions} placement="bottomCenter" placeholder="请选择年级"  />
            )}
          </FormItem>
          <FormItem
            label='学号'
            {...formItemLayout}
            key='form-content-stuId'
          >
            {getFieldDecorator('stu_num', {
              rules: [{required: true, message: '请输入学号'}],
            })(
              <Input className='form-content-input' />,
            )}
          </FormItem>
          <FormItem
            label='学院'
            {...formItemLayout}
            key='form-content-department'
          >
            {getFieldDecorator('major', {
              rules: [{required: true, message: '请输入学院'}],
            })(
              <Cascader options={departOptions} placement="bottomCenter" placeholder="请选择学院" />
            )}
          </FormItem>
          <FormItem
            label='选修课程'
            {...formItemLayout}
          >
            {getFieldDecorator('course', {
              rules: [{
                required: true, message: '请选择课程'
              }]
            })(
              <Cascader options={courseOptions} placement="bottomCenter" placeholder="请选择课程"  />
            )}
          </FormItem>
          <FormItem
            label='手机号'
            {...formItemLayout}
            key="form-content-mobile"
            hasFeedback
          >
            {getFieldDecorator('mobile', {
              rules: [{
                pattern: verify.mobile, message: '输入的不是有效的手机号码！'
              }, {
                required: true, message: '请输入手机号码'
              }]
            })(
              <Input className='form-content-input' />,
            )}
          </FormItem>
          <FormItem
            label='自我介绍'
            {...formItemLayout}
            key="form-content-introduce"
            hasFeedback
          >
            {getFieldDecorator('introduce', {
              rules: [{
                required: true, message: '请输入自我介绍'
              }]
            })(
              <TextArea rows={4} />
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
                  className='form-button'
                  loading={this.state.loading}
                  disabled={this.state.submitted}
                >
                  {this.state.submitted ? '提交成功' : '点击提交'}
                </Button>
                <Button
                  type="ghost"
                  onClick={this.handleReset}
                  className='form-button'
                  style={{marginLeft: 18}}
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
