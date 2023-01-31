const joi = require('joi')

const nickname = joi.string().error(new Error('昵称不合法'))
const email = joi.string().email().error(new Error('邮箱格式不正确'))
const phone = joi.string().pattern(/^1[3-9]\d{9}$/).error(new Error('手机号码不正确'))
const password = joi.string().pattern(/^[\S]{6,18}$/).required().error(new Error('密码必须为6-18位字符'))
const avatar = joi.string().dataUri().required()

exports.userinfo_schema = {
  body: {
    nickname,
    email,
    phone
  }
}
exports.update_password_schema = {
  body: {
    old_pwd: password,
    new_pwd: joi.not(joi.ref('oldPwd')).concat(password).error(new Error('新密码不能和旧密码一样且必须为6-18位字符'))
  }
}
exports.update_avatar_schema = {
  body: {
    avatar
  }
}


