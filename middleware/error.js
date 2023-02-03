const joi = require("joi");

/**
 * 20000 成功处理请求
 * 401000 身份认证失败 无token
 * 401001 用户无权限进行操作
 * 50000 业务自定义错误
 * 50001 表单验证失败
 */

const error = function (err, req, res, next) {
  // 表单验证失败
  if (err instanceof joi.ValidationError) return res.err('表单验证失败',50001)
  // 身份认证失败
  if (err.name === 'UnauthorizedError') return res.err('身份认证失败，清重新登录',40100)
  res.err(err)
}
module.exports = error