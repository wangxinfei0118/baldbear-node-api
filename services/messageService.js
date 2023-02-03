const db = require("../db");
const arrToTree = require("../utils/arrToTree");
const getTime = require("../utils/getTime");

exports.getMessage = async () => {
  const sql_message = 'select * from bb_message'
  return await new Promise((resolve, reject) => {
    db.query(sql_message, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      const data = arrToTree(results)
      resolve(data)
    })
  })
}
exports.addMessage = async (messageData) => {
  const sql_insert_message = 'insert into bb_message set ?'
  await new Promise((resolve, reject) => {
    db.query(sql_insert_message, {pid: messageData.pid, user_id: messageData.user_id, nickname: messageData.nickname, below_reply_id: messageData.below_reply_id, below_reply_name: messageData.below_reply_name, user_pic: messageData.user_pic, content: messageData.content, create_date: getTime()}, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('新增留言失败！')
      }
      resolve()
    })
  })
}
exports.deleteMessage = async (messageId, uid, role) => {
  const sql_uid = 'select user_id from bb_message where id=?'
  const sql_delete_message = 'delete from bb_message where id=?'
  await new Promise((resolve, reject) => {
    db.query(sql_uid, messageId ,(err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (uid !== results[0].user_id && role !== 1) {
        reject('暂无权限')
      }
      resolve()
    })
  })
  await new Promise((resolve, reject) => {
    db.query(sql_delete_message, messageId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('删除留言失败！')
      }
      resolve()
    })
  })
}