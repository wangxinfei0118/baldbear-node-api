const db = require("../db");
const bcrypt = require("bcryptjs");
const randomName = require("../utils/randomName");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.username = async (username) => {
  const sql_username = `select * from bb_users where username=?`
  await new Promise((resolve, reject) => {
    db.query(sql_username, username,(err,results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.length > 0) {
        reject('用户名已存在！')
      }
      resolve()
    })
  })
}
exports.register = async (regData) => {
  // 对密码进行 bcrypt 加密
  regData.password = bcrypt.hashSync(regData.password, 10)
  // 生成随机昵称
  regData.nickname = randomName(8)
  // 插入注册信息
  const sql_insert = 'insert into bb_users set ?'
  await new Promise((resolve, reject) => {
    db.query(sql_insert, { username: regData.username, password: regData.password, nickname: regData.nickname, role: 0}, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('注册用户失败，请稍后再试！')
      }
    })
  })
}
exports.login = async (loginData) => {
  const sql_login = `select * from bb_users where username=?`
  return await new Promise((resolve, reject) => {
    db.query(sql_login,loginData.username,(err,results) => {
      if (err) {
        reject(err)
        return;
      }
      if (results.length === 0) {
        reject('该用户名不存在')
        return;
      }
      const compareResult = bcrypt.compareSync(loginData.password, results[0].password)
      if (!compareResult) {
        reject('密码错误')
        return
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
      resolve({accessToken, refreshToken, userinfo})
    })
  })
}
exports.refresh =  async (refreshToken) => {
  const payload = await new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.jwtSecretKey,(err, payload) =>{
      if (err){
        reject(err)
        return
      }
      if (!payload.refresh){
        reject('refreshToken不合法')
      }
      resolve(payload)
    })
  })
  const sql_login = `select * from bb_users where username=?`
  return await new Promise((resolve, reject) => {
    db.query(sql_login,payload.username,(err,results) => {
      if (err){
        reject(err)
        return
      }
      const tokenObj = { ...results[0], password: '', user_pic: '' }
      const accessToken = jwt.sign(tokenObj, config.jwtSecretKey, {
        expiresIn: '2h',
      })
      const {password,...userinfo} = results[0]
      resolve({accessToken, userinfo})
    })
  })
}