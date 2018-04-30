# 基于React和Ant-design的表单

## 脚手架
来源于[ouxu](https://github.com/ouxu/NEUQer-FE-Kit)中
React-Router4

## UI库

采用[Ant-design](https://ant.design/index-cn)

主要使用[form组件](https://ant.design/components/form-cn/),事例
```
 <FormItem
  label='姓名'      //表单前部显示的文字
  {...formItemLayout}
  key="form-content-leader-name"   //多个组件定义不同key值
  hasFeedback
      >
    {getFieldDecorator('headers', {   //headers为后端传输数据的所需的headers
        rules: [{
        pattern: verify.chinese, message: '输入包含非中文字符！'
        }, {
        required: true, message: '请输入姓名'
        }]
        })(
            <Input className='form-content-input'/>,
        )}
</FormItem>
```

## 动画效果

使用[rc-queue-anim](https://www.npmjs.com/package/rc-queue-anim)
官方事例
```
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import ReactDom from 'react-dom';
 
ReactDom.render(
  <QueueAnim>
    <div key="1">enter in queue</div>
    <div key="2">enter in queue</div>
    <div key="3">enter in queue</div>
  </QueueAnim>
, mountNode);
```

ES6写法

```
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import ReactDom from 'react-dom';
 
class APP extends React.Component {

render(){
  return(
  <QueueAnim>
    <div key="1">enter in queue</div>
    <div key="2">enter in queue</div>
    <div key="3">enter in queue</div>
  </QueueAnim>
  )}
}
export default APP
```
## 常用工具（utils文件夹下）

Options.js--包括学校所有学院及专业
Verify.js--包括表单验证中常见正则表达式
request--封装了axios方法