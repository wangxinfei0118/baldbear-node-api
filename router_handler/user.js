const db = require('../db/index')

exports.getUserInfo = (req, res) => {
  const uid = req.params.uid
  const sql_userinfo = `select uid, username, nickname, email, phone, user_pic from bb_users where uid=?`
  db.query(sql_userinfo,uid,(err,results) => {
    if (err) {
      return res.err(err)
    }
    if (results.length !== 1) {
      return res.err('获取用户信息失败！')
    }
    res.send({
      code: 20000,
      message: '获取用户信息成功！',
      data: results[0],
    })
  })
}
