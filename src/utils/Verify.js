/**
 * Created by out_xu on 17/5/4.
 */

export default {
  mobile: /^1[3|4|5|7|8][0-9]\d{8}$/,
  password: /^\w{6,18}$/,
  mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  qq: /[1-9][0-9]{4,}/,
  number: /^[0-9]\d*$/,
  postCode: /^\d{6}$/,
  age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
  chinese: /[\u4E00-\u9FA5\uF900-\uFA2D]/,
  studentId: /^\d{7,8}$/,
  english: /^[A-Za-z0-9]+$/
}
