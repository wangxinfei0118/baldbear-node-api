const { to } = require('await-to-js') // 利用to捕捉await中的错误
const messageService = require('../services/messageService')

exports.getMessage = async (req, res) => {
  const [err, messageList] = await to(messageService.getMessage())
  if (err) return res.err(err)
  res.send({ code: 20000, message: '获取留言列表成功！', data: messageList })
}

exports.addMessage = async (req, res) => {
  const [err] = await to(messageService.addMessage(req.body))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '新增留言成功！' })
}

exports.deleteMessage = async (req, res) => {
  const [err] = await to(messageService.deleteMessage(req.params.id, req.user.id, req.user.role))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '删除留言成功！' })
}
