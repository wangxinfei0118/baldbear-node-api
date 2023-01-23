const bcrypt = require('bcryptjs')
const db = require('../db/index')



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
    // 插入注册信息
    const sql_insert = 'insert into bb_users set ?'
    db.query(sql_insert, { username: regData.username, password: regData.password }, (err, results) => {
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

}
