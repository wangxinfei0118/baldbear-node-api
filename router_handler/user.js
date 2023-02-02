const db = require('../db/index')
const bcrypt = require('bcryptjs')

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
exports.updateUserInfo = (req, res) => {
  const uid = req.params.uid
  const userinfo = req.body
  const sql_update_userinfo = `update bb_users set ? where uid=?`
  db.query(sql_update_userinfo,[userinfo, uid],(err,results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('修改用户信息失败！')
    }
    res.send({
      code: 20000,
      message: '修改用户信息成功！',
    })
  })
}
exports.updatePassword = (req, res) => {
  const uid = req.params.uid
  const {old_pwd, new_pwd} = req.body
  const sql_select_userinfo = `select * from bb_users where uid=?`
  db.query(sql_select_userinfo, uid, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.length !== 1) {
      return res.err('用户不存在！')
    }
    // 判断旧密码是否正确
    const compareResult = bcrypt.compareSync(old_pwd, results[0].password)
    if (!compareResult) {
      return res.err('原密码错误！')
    }
    const sql_update_password = `update bb_users set password=? where uid=?`
    const newPassword = bcrypt.hashSync(new_pwd, 10)
    db.query(sql_update_password, [newPassword, uid], (err, results) => {
      if (err) {
        return res.err(err)
      }
      if (results.affectedRows !== 1) {
        return res.err('更新密码失败！')
      }
      res.send({
        code: 20000,
        message: '更新密码成功！',
      })
    })
  })
}

