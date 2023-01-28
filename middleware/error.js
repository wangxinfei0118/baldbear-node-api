const joi = require("joi");

const error = function (err, req, res, next) {
  // 表单验证失败
  if (err instanceof joi.ValidationError) return res.err('表单验证失败')
  // 身份认证失败
  if (err.name === 'UnauthorizedError') return res.err('身份认证失败，清重新登录',20401)
  // 未知错误
  res.err(err,20500)
}
module.exports = error