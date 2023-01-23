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

}

exports.login = (req, res) => {

}
