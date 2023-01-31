const db = require('../db/index')
const getTime = require('../utils/getTime')
const arrToTree = require('../utils/arrToTree')

exports.getNoteLabel = async (req, res) => {
  const sql_label = 'select * from bb_labels'
  const sql_label_item = 'select * from bb_labels_item'
  const labelList = await new Promise((resolve, reject) => {
    db.query(sql_label, (err, results) => {
      if (err) {
        return res.err(err)
      }
      resolve(results)
    })
  })
  const labelItemList = await new Promise((resolve, reject) => {
    db.query(sql_label_item, (err, results) => {
      if (err) {
        return res.err(err)
      }
      resolve(results)
    })
  })
  const data = arrToTree(labelList,labelItemList,'labelList')
  res.send({
    code: 20000,
    message: '获取笔记分类列表成功！',
    data
  })
}
exports.getNoteList = (req, res) => {
  const obj = req.body
  // 根据obj.label是否存在判断是否是根据标签查询
  const sql_note_list = `select note_id, title, summary, label, image_url, view_count, chat_count, create_date, update_date from bb_notes ` + (obj.label ? `where label='${obj.label}'`:'') + ' order by create_date desc'
  // 分页


  db.query(sql_note_list, (err, results) => {
    if (err) {
      return res.err(err)
    }
    res.send({
      code: 20000,
      message: '获取笔记列表成功！',
      data: {
        total: results.length,
        records: results
      }
    })
  })
}
exports.getNoteById = (req, res) => {
  const noteId = req.params.id
  const sql_note_item = 'select * from bb_notes where note_id=?'
  db.query(sql_note_item, noteId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.length !==1){
      return res.err('获取笔记详情失败！')
    }
    res.send({
      code: 20000,
      message: '获取笔记详情成功！',
      data: results[0]
    })
  })
}
exports.addNote = (req, res) => {
  const noteData = req.body
  const sql_insert_note = 'insert into bb_notes set ?'
  db.query(sql_insert_note, {title: noteData.title, summary: noteData.summary, label: noteData.label, image_url: noteData.image_url, view_count: 0, chat_count: 0, md_content: noteData.md_content, html_content: noteData.html_content, create_date: getTime(), update_date: getTime()}, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('新增笔记失败！')
    }
    res.send({
      code: 20000,
      message: '新增笔记成功！',
      data: results.insertId
    })
  })
}
exports.editNote = (req, res) => {
  const noteId = req.params.id
  const noteData = req.body
  noteData.update_date = getTime()
  const sql_edit_note = 'update bb_notes set ? where note_id=?'
  db.query(sql_edit_note, [noteData, noteId], (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('修改笔记失败！')
    }
    res.send({
      code: 20000,
      message: '修改笔记成功！'
    })
  })
}
exports.deleteNote = (req, res) => {
  const noteId = req.params.id
  const sql_delete_note = 'delete from bb_notes where note_id=?'
  db.query(sql_delete_note, noteId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('删除笔记失败！')
    }
    res.send({
      code: 20000,
      message: '删除笔记成功！'
    })
  })
}
exports.updateNoteViewCount = (req, res) => {
  const noteId = req.params.id
  const sql_note_list = 'update bb_notes set view_count=view_count+1 where note_id=?'
  db.query(sql_note_list, noteId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('更新浏览数失败！')
    }
    res.send({
      code: 20000,
      message: '更新浏览数成功！'
    })
  })
}
exports.getCommentByNoteId = (req, res) => {
  const noteId = req.params.id
  const sql_comment = 'select * from bb_note_comment where note_id=?'
  db.query(sql_comment, noteId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    const data = arrToTree(results)
    res.send({
      code: 20000,
      message: '获取笔记详情成功！',
      data
    })
  })
}
exports.addComment = (req, res) => {
  const commentData = req.body
  const sql_insert_comment = 'insert into bb_note_comment set ?'
  db.query(sql_insert_comment, {pid: commentData.pid, user_id: commentData.user_id, note_id: commentData.note_id, nickname: commentData.nickname, below_reply_id: commentData.below_reply_id, below_reply_name: commentData.below_reply_name, user_pic: commentData.user_pic, content: commentData.content, create_date: getTime()}, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('新增评论失败！')
    }
    res.send({
      code: 20000,
      message: '新增评论成功！'
    })
  })
}
exports.deleteComment = (req, res) => {
  const commentId = req.params.id
  const sql_delete_comment = 'delete from bb_note_comment where id=?'
  db.query(sql_delete_comment, commentId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('删除评论失败！')
    }
    res.send({
      code: 20000,
      message: '删除评论成功！'
    })
  })
}