const {camelToUnderline, underlineToCamel} = require("../utils/camelOrUnderline");

const convertVar = function (req, res, next) {
  // 将body中数据转为下划线形式
  req.body = camelToUnderline(req.body)
  let oldSend = res.send
  // 重写res.send 将data转为小驼峰形式
  res.send = function(body) {
    if (body.hasOwnProperty('data')){
      body.data = underlineToCamel(body.data)
    }
    res.send = oldSend
    return res.send(body)
  }
  next()
}
module.exports = convertVar