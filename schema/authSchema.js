const joi = require('joi')

/**
 * string() 数据必须是字符串类型
 * number() 数据必须为数字类型
 * alphanum() 数据只能包含[a-zA-Z0-9]的字符
 * max(length) 最大长度
 * min(length) 最小长度
 * required() 数据是必填项，不能为null或undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * email() 验证邮箱
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(4).max(20).required().error(new Error('用户名必须为4-20位数字、字母或组合'))
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,18}$/)
  .required()
  .error(new Error('密码必须为6-18位字符'))
// 重复密码的验证规则
const repassword = joi.string().required().valid(joi.ref('password ')).error(new Error('两次密码不一致！'))

exports.username_schema = {
  params: {
    username
  }
}

exports.reg_schema = {
  body: {
    username,
    password,
    repassword
  }
}
exports.login_schema = {
  body: {
    username,
    password
  }
}
