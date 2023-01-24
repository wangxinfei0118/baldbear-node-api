const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/index')
const config = require('../config')
const randomName = require('../utils/randomName')

exports.username = (req, res) => {
  const username = req.params.username
  const sql_username = `select * from bb_users where username=?`
  db.query(sql_username,username,(err,results) => {
    if (err) {
      return res.err(err)
    }
    if (results.length > 0) {
      return res.send({ code: 20000, message: '用户名已存在', data: username })
    }
    // 用户名可用
      res.send({ code: 20000, message: '用户名可用' })
  })
}


exports.register = (req, res) => {
  const regData = req.body
  // 查询该用户名是否存在
  const sql_username = `select * from bb_users where username=?`
  db.query(sql_username,regData.username,(err,results) => {
    if (err) {
      return res.err(err)
    }
    if (results.length > 0) {
      return res.err('用户名已存在！')
    }
    // 用户名可用
    // 对密码进行 bcrypt 加密
    regData.password = bcrypt.hashSync(regData.password, 10)
    // 生成随机昵称
    regData.nickname = randomName(8)
    // 插入注册信息
    const sql_insert = 'insert into bb_users set ?'
    db.query(sql_insert, { username: regData.username, password: regData.password, nickname: regData.nickname}, (err, results) => {
      if (err) {
        return res.err(err)
      }
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) {
        return res.err('注册用户失败，请稍后再试！')
      }
      res.send({ code: 20000, message: '注册成功！' })
    })
  })
}

exports.login = (req, res) => {
  const loginData = req.body
  const sql_login = `select * from bb_users where username=?`
  db.query(sql_login,loginData.username,(err,results) => {
    if (err) {
      return res.err(err)
    }
    if (results.length === 0) {
      return res.err('该用户名不存在')
    }
    const compareResult = bcrypt.compareSync(loginData.password, results[0].password)
    if (!compareResult) {
      return res.err('密码错误')
    }
    // 剔除password user_pic
    const tokenObj = { ...results[0], password: '', user_pic: '' }
    const accessToken = jwt.sign(tokenObj, config.jwtSecretKey, {
      expiresIn: '2h',
    })
    const refreshToken = jwt.sign({...tokenObj, 'refresh': true}, config.jwtSecretKey, {
      expiresIn: '10h',
    })
    const {password,...userinfo} = results[0]
    res.send({
      code: 20000,
      message: '登录成功！',
      data:{
        userInfo: userinfo,
        access_token: accessToken,
        refresh_token: refreshToken,
      }
    })
  })
}
