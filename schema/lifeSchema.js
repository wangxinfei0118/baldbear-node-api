const joi = require('joi')

const title = joi.string().required().error(new Error('标题不能为空'))
const md_content = joi.string().required().error(new Error('mdContent不能为空'))
const html_content = joi.string().required().error(new Error('内容不能为空'))


exports.life_schema = {
  body: {
    title,
    md_content,
    html_content,
  }
}

