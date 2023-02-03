const db = require("../db");
const bcrypt = require("bcryptjs");

exports.getUserInfo = async (uid) => {
  const sql_userinfo = `select uid, username, nickname, email, phone, user_pic from bb_users where uid=?`
  return await new Promise((resolve, reject) => {
    db.query(sql_userinfo,uid,(err,results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.length !== 1) {
        reject('获取用户信息失败！')
      }
      resolve(results[0])
    })
  })
}
exports.updateUserInfo = async (userinfo, uid) => {
  const sql_update_userinfo = `update bb_users set ? where uid=?`
  await new Promise((resolve, reject) => {
    db.query(sql_update_userinfo,[userinfo, uid],(err,results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('修改用户信息失败！')
      }
      resolve()
    })
  })
}
exports.updatePassword = async (uid, old_pwd, new_pwd) => {
  const sql_select_userinfo = `select * from bb_users where uid=?`
  await new Promise((resolve, reject) => {
    db.query(sql_select_userinfo, uid, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.length !== 1) {
        reject('用户不存在！')
        return
      }
      // 判断旧密码是否正确
      const compareResult = bcrypt.compareSync(old_pwd, results[0].password)
      if (!compareResult) {
        reject('原密码错误！')
      }
      resolve()
    })
  })
  await new Promise((resolve, reject) => {
    const sql_update_password = `update bb_users set password=? where uid=?`
    const newPassword = bcrypt.hashSync(new_pwd, 10)
    db.query(sql_update_password, [newPassword, uid], (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('更新密码失败！')
      }
      resolve()
    })
  })
}