const { to } = require('await-to-js') // 利用to捕捉await中的错误
const userService = require('../services/userService')

exports.getUserInfo = async (req, res) => {
  // token与查询的uid不相符
  if (req.user.uid != req.params.uid) {
    return res.err('暂无权限')
  }
  const [err, userInfo] = await to(userService.getUserInfo(req.params.uid))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '获取用户信息成功！', data: userInfo })
}

exports.updateUserInfo = async (req, res) => {
  if (req.user.uid != req.params.uid) {
    return res.err('暂无权限')
  }
  const [err] = await to(userService.updateUserInfo(req.body, req.params.uid))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '修改用户信息成功！' })
}

exports.updatePassword = async (req, res) => {
  if (req.user.uid != req.params.uid) {
    return res.err('暂无权限')
  }
  const { old_pwd, new_pwd } = req.body
  const [err] = await to(userService.updatePassword(req.params.uid, old_pwd, new_pwd))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '修改密码成功！' })
}
