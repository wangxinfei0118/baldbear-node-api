const joi = require('joi')

const title = joi.string().required().error(new Error('标题不能为空'))
const summary = joi.string().required().error(new Error('摘要不能为空'))
const label = joi.string().required().error(new Error('标签不能为空'))
const image_url = joi.string().uri().required().error(new Error('图片url格式不正确'))
const md_content = joi.string().required().error(new Error('mdContent不能为空'))
const html_content = joi.string().required().error(new Error('htmlContent不能为空'))

const pid = joi.number().required().error(new Error('pid不能为空'))
const user_id = joi.number().required().error(new Error('userId不能为空'))
const note_id = joi.number().required().error(new Error('noteId不能为空'))
const below_reply_id = joi.number()
const below_reply_name = joi.string()
const nickname = joi.string().required().error(new Error('nickname不能为空'))
const user_pic = joi.string().uri().error(new Error('图片url格式不正确'))
const content = joi.string().required().error(new Error('内容不能为空'))

exports.note_schema = {
  body: {
    title,
    summary,
    label,
    image_url,
    md_content,
    html_content
  }
}

exports.comment_schema = {
  body: {
    pid,
    user_id,
    note_id,
    nickname,
    below_reply_id,
    below_reply_name,
    user_pic,
    content
  }
}