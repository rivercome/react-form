/**
 * Created by out_xu on 16/12/20.
 */
import { message } from 'antd'

const codeMap = {
  10001: '表单认证错误'

}

/**
 * To deal with request error
 * @param code
 */
export default (code) => {
  if (codeMap[code]) {
    message.error(codeMap[code])
  } else {
    message.error('未知错误')
  }
}
