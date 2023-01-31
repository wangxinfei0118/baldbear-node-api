const joi = require('joi')

const pid = joi.number().required().error(new Error('pid不能为空'))
const user_id = joi.number().required().error(new Error('userId不能为空'))
const nickname = joi.string().required().error(new Error('nickname不能为空'))
const user_pic = joi.string().uri().error(new Error('图片url格式不正确'))
const content = joi.string().required().error(new Error('内容不能为空'))


exports.message_schema = {
  body: {
    pid,
    user_id,
    nickname,
    user_pic,
    content
  }
}

