const db = require("../db");
const getTime = require("../utils/getTime");
const arrToTree = require("../utils/arrToTree");

exports.getMessage = (req, res) => {
  const sql_message = 'select * from bb_message'
  db.query(sql_message, (err, results) => {
    if (err) {
      return res.err(err)
    }
    const data = arrToTree(results)
    res.send({
      code: 20000,
      message: '获取留言列表成功！',
      data
    })
  })
}
exports.addMessage = (req, res) => {
  const messageData = req.body
  const sql_insert_message = 'insert into bb_message set ?'
  db.query(sql_insert_message, {pid: messageData.pid, user_id: messageData.user_id, nickname: messageData.nickname, reply: messageData.reply, user_pic: messageData.user_pic, content: messageData.content, create_date: getTime()}, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('新增留言失败！')
    }
    res.send({
      code: 20000,
      message: '新增留言成功！'
    })
  })
}
exports.deleteMessage = (req, res) => {
  const messageId = req.params.id
  const sql_delete_message = 'delete from bb_message where id=?'
  db.query(sql_delete_message, messageId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('删除留言失败！')
    }
    res.send({
      code: 20000,
      message: '删除留言成功！'
    })
  })
}