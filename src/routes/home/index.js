import React, { Component } from 'react'
import './index.css'
import 'antd/dist/antd.css'
import { Button, Col, Form, Input, message, Row, Cascader, Radio } from 'antd'
import QueueAnim from 'rc-queue-anim'
import verify from '../../utils/Verify'

const {TextArea} = Input
const RadioGroup = Radio.Group
const FormItem = Form.Item

const stayHourse = [{
  value: '公寓',
  label: '公寓'
}, {
  value: '宾馆一',
  label: '宾馆一'
}, {
  value: '宾馆二',
  label: '宾馆二'
}, {
  value: '自行住宿',
  label: '自行住宿'
}]

const Tshirts = [{
  value: 'S',
  label: 'S'
}, {
  value: 'M',
  label: 'M'
}, {
  value: 'XL',
  label: 'Xl'
}, {
  value: 'XXL',
  label: 'XXL'
}, {
  value: 'XXXL',
  label: 'XXXL'
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
      if (err) {}
      else {
        const body = {
          ...values,
          stu1_shirt: values.stu1_shirt[0],
          stu2_shirt: values.stu2_shirt[0],
          stu3_shirt: values.stu3_shirt[0],
          apartment_type: values.apartment_type[0]

        }
        // 处理发送的数据
        fetch('http://camp.andyhui.xin/teams', {
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
          if (json.code === 1000){
            message.success('报名成功')
            this.setState({submitted: true})
          }
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
            2018CCPC-Wannafly暑期算法训练营报名登记表
          </div>
          <div className='form-content-notice' key='form-content-notice'>
            <h2>
              2018 CCPC-Wannafly暑期算法训练营将于2018年8月2日至8月9日在东北大学秦皇岛分校举行，届时将由来自清华、北大、上交、复旦、北师大和中山大学等金牌选手进行专题集训
              面向具有一定算法基础的大学生和中学生竞赛选手，训练营完全免费，欢迎各位同学组队报名。本次训练营容量上限为300人，预计可以接收100支队伍报名。
            </h2>

            <br />
            <b>时间安排：</b>
            <h2>8月1日，报到；8月2日-9日，集训；8月10日离会。</h2>
            <br />
            <b>住宿安排：</b>
            <h2>考虑降低参训人员成本，本次训练营联系了学校周围的小型宾馆和社会化公寓提供住宿。
              <ul>
                <li>1、 公寓：4人间，50元/人·天。无早餐，无空调，带热水器，可淋浴，不开发票。</li>
                <li>2、 宾馆一：标间（×17）200元； 3人间（×14）270元；4人间（×6）320元。空调、淋浴，不含早餐，可开具发票。</li>
                <li>3、 宾馆二：标间（×20）300元； 3人间（×11）360元；家庭房（×14，大床+小床，可住3人）360元。带空调、淋浴，含早餐，可开具发票。</li>
              </ul>
            </h2>

            <br />
            <b>就餐安排：</b>
            <h2>等报名结束后联系公寓餐厅备餐。</h2>

            <br />
            <b style={{textAlign: 'center'}}>报名需如实填写以下信息</b>

          </div>
        </div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            label='队伍名称'
            {...formItemLayout}
            key='form-content-name'
            hasFeedback
          >
            {getFieldDecorator('team_name', {
              rules: [{
                // pattern: verify.chinese, message: '输入包含非中文字符！'
              }, {
                required: true, message: '请输入队伍名称'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='住宿选择'
            {...formItemLayout}
            key='form-content-sex'
            hasFeedback
          >
            {getFieldDecorator('apartment_type', {
              rules: [{required: true, message: '请选择住宿方式'}],
            })(
              <Cascader options={stayHourse} placeholder="" />
            )}
          </FormItem>
          <FormItem
            label='队员信息一'
            {...formItemLayout}
            key='form-content-stu1'
          />
          <FormItem
            label='姓名'
            {...formItemLayout}
          >
            {getFieldDecorator('stu1_name', {
              rules: [{
                required: true, message: '请输入姓名'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='性别'
            {...formItemLayout}
            key='form-content-department-stu1'

          >
            {getFieldDecorator('stu1_sex', {
              rules: [{required: true, message: '请选择性别'}],
            })(
              <RadioGroup>
                <Radio value='男'>男</Radio>
                <Radio value='女'>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label='学校或组织'
            {...formItemLayout}
            key='form-content-stuId-stu1'
            hasFeedback
          >
            {getFieldDecorator('stu1_school', {
              rules: [{required: true, message: '请输入学校或组织'}]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='年级'
            {...formItemLayout}
            key='form-content-grade-stu1'
            hasFeedback
          >
            {getFieldDecorator('stu1_grade', {
              rules: [{
                required: true, message: '请选择年级'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='邮箱'
            {...formItemLayout}
            key='form-content-email-stu1'
            hasFeedback
          >
            {getFieldDecorator('stu1_email', {
              rules: [{
                pattern: verify.mail, message: '输入的不是有效的邮箱！'
              }, {
                required: true, message: '请输入邮箱'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='手机号'
            {...formItemLayout}
            key="form-content-mobile-stu1"
            hasFeedback
          >
            {getFieldDecorator('stu1_mobile', {
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
            label='T恤尺码'
            {...formItemLayout}
            key='form-content-tshirts-stu1'
            hasFeedback
          >
            {getFieldDecorator('stu1_shirt', {
              rules: [{
                required: true, message: '请选择T恤尺码'
              }]
            })(
              <Cascader options={Tshirts} placeholder="" />
            )}
          </FormItem>
          <FormItem
            label='曾获奖项'
            {...formItemLayout}
            key="form-content-prize-stu1"
            hasFeedback
          >
            {getFieldDecorator('stu1_prize', {
              rules: [{
                required: true, message: '请输入获奖信息'
              }]
            })(
              <Input className='form-content-input' />,
            )}
          </FormItem>


          <FormItem
            label='队员信息二'
            {...formItemLayout}
            key='form-content-stu2'
          />
          <FormItem
            label='姓名'
            key='form-content-stu2-name'
            {...formItemLayout}
            hasFeedback

          >
            {getFieldDecorator('stu2_name', {
              rules: [{
                required: true, message: '请输入姓名'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='性别'
            {...formItemLayout}

            key='form-content-department-stu2'
          >
            {getFieldDecorator('stu2_sex', {
              rules: [{required: true, message: '请选择性别'}],
            })(
              <RadioGroup>
                <Radio value='男'>男</Radio>
                <Radio value='女'>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label='学校或组织'
            {...formItemLayout}
            hasFeedback

            key='form-content-stuId-stu2'
          >
            {getFieldDecorator('stu2_school', {
              rules: [{required: true, message: '请输入学校或组织'}]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='年级'
            {...formItemLayout}
            key='form-content-stu2-grade'
            hasFeedback

          >
            {getFieldDecorator('stu2_grade', {
              rules: [{
                required: true, message: '请选择年级'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='邮箱'
            key='form-content-stu2-email'
            {...formItemLayout}
            hasFeedback

          >
            {getFieldDecorator('stu2_email', {
              rules: [{
                pattern: verify.mail, message: '输入的不是有效的邮箱！'
              }, {
                required: true, message: '请输入邮箱'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='手机号'
            {...formItemLayout}
            key="form-content-mobile-stu2"
            hasFeedback
          >
            {getFieldDecorator('stu2_mobile', {
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
            label='T恤尺码'
            key='form-content-stu2-Tshirts'
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('stu2_shirt', {
              rules: [{
                required: true, message: '请选择T恤尺码'
              }]
            })(
              <Cascader options={Tshirts} placeholder="" />
            )}
          </FormItem>
          <FormItem
            label='曾获奖项'
            {...formItemLayout}
            key="form-content-prize-stu2"
            hasFeedback
          >
            {getFieldDecorator('stu2_prize', {
              rules: [{
                required: true, message: '请输入获奖信息'
              }]
            })(
              <Input className='form-content-input' />,
            )}
          </FormItem>


          <FormItem
            label='队员信息三'
            {...formItemLayout}
            key='form-content-sex-stu3'
          />
          <FormItem
            label='姓名'
            key='form-content-name-stu3'
            {...formItemLayout}
            hasFeedback

          >
            {getFieldDecorator('stu3_name', {
              rules: [{
                required: true, message: '请输入姓名'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='性别'
            {...formItemLayout}
            key='form-content-department-stu3'


          >
            {getFieldDecorator('stu3_sex', {
              rules: [{required: true, message: '请选择性别'}],
            })(
              <RadioGroup>
                <Radio value='男'>男</Radio>
                <Radio value='女'>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label='学校或组织'
            {...formItemLayout}
            key='form-content-stuId-stu3'
            hasFeedback

          >
            {getFieldDecorator('stu3_school', {
              rules: [{required: true, message: '请输入学校或组织'}]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='年级'
            {...formItemLayout}
            key='form-content-grade-stu3'
            hasFeedback

          >
            {getFieldDecorator('stu3_grade', {
              rules: [{
                required: true, message: '请选择年级'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='邮箱'
            {...formItemLayout}
            key='form-content-email-stu3'
            hasFeedback
          >
            {getFieldDecorator('stu3_email', {
              rules: [{
                pattern: verify.mail, message: '输入的不是有效的邮箱！'
              }, {
                required: true, message: '请输入邮箱'
              }]
            })(
              <Input className='form-content-input' />
            )}
          </FormItem>
          <FormItem
            label='手机号'
            {...formItemLayout}
            key="form-content-mobile-stu3"
            hasFeedback
          >
            {getFieldDecorator('stu3_mobile', {
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
            label='T恤尺码'
            {...formItemLayout}
            key='form-content-Tshirts-stu3'

          >
            {getFieldDecorator('stu3_shirt', {
              rules: [{
                required: true, message: '请选择T恤尺码'
              }]
            })(
              <Cascader options={Tshirts} placeholder="" />
            )}
          </FormItem>
          <FormItem
            label='曾获奖项'
            {...formItemLayout}
            key="form-content-prize-stu3"
          >
            {getFieldDecorator('stu3_prize', {
            })(
              <Input className='form-content-input' />,
            )}
          </FormItem>

          <FormItem
            label='备注'
            {...formItemLayout}
            key="form-content-introduce"
          >
            {getFieldDecorator('introduce')(
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
