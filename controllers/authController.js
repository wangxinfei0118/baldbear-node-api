const { to } = require("await-to-js");
const authService = require("../services/authService");

exports.username = async (req, res) => {
  const [ err ] = await to(authService.username(req.params.username))
  if (err){
    return res.err(err)
  }
  res.send({
    code: 20000,
    message: '用户名可用！',
  })
}
exports.register = async (req, res) => {
  const [ err ] = await to(authService.register(req.body))
  if (err){
    return res.err(err)
  }
  res.send({
    code: 20000,
    message: '注册成功！',
  })
}
exports.login = async (req, res) => {
  const [ err, loginInfo] = await to(authService.login(req.body))
  if (err){
    return res.err(err)
  }
  res.send({
    code: 20000,
    message: '登录成功！',
    data:{
      userInfo: loginInfo.userinfo,
      access_token: loginInfo.accessToken,
      refresh_token: loginInfo.refreshToken,
    }
  })
}
exports.logout =  (req, res) => {
  res.send({
    code: 20000,
    message: '退出成功！',
  })
}
exports.refresh =  async (req, res) => {
  const refreshToken = req.query.refreshToken
  const [ err, refreshInfo] = await to(authService.refresh(refreshToken))
  if (err){
    return res.err(err)
  }
  res.send({
    code: 20000,
    message: '刷新成功！',
    data:{
      userInfo: refreshInfo.userinfo,
      access_token: refreshInfo.accessToken,
      refresh_token: refreshToken,
    }
  })
}