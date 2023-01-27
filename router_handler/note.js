const db = require('../db/index')
const getTime = require('../utils/getTime')

exports.getNoteLabel = (req, res) => {
  const sql_label = 'select * from bb_labels'
  db.query(sql_label, (err, results) => {
    if (err) {
      return res.err(err)
    }
    res.send({
      code: 20000,
      message: '获取笔记分类列表成功！',
      data: results,
    })
  })
}
exports.getNoteList = (req, res) => {
  // 根据req.query.label判断是否是根据标签查询
  const sql_note_list = `select note_id, title, summary, label, image_url, view_count, chat_count, create_date, update_date from bb_notes ` + (req.query.label ? `where label='${req.query.label}'`:'') + ' order by create_date desc'
  // 分页


  db.query(sql_note_list, (err, results) => {
    if (err) {
      return res.err(err)
    }
    res.send({
      code: 20000,
      message: '获取笔记列表成功！',
      data: results,
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
  db.query(sql_insert_note, {title: noteData.title, summary: noteData.summary, label: noteData.label, image_url: noteData.imageUrl, mdContent: noteData.mdContent, htmlContent: noteData.htmlContent}, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('新增笔记失败！')
    }
    res.send({
      code: 20000,
      message: '新增笔记成功！'
    })
  })
}
exports.addNote = (req, res) => {
  const noteData = req.body
  const sql_insert_note = 'insert into bb_notes set ?'
  db.query(sql_insert_note, {title: noteData.title, summary: noteData.summary, label: noteData.label, image_url: noteData.imageUrl, mdContent: noteData.mdContent, htmlContent: noteData.htmlContent, create_date: getTime(), update_date: getTime()}, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('新增笔记失败！')
    }
    res.send({
      code: 20000,
      message: '新增笔记成功！'
    })
  })
}
exports.editNote = (req, res) => {
  const noteId = req.params.id
  const noteData = req.body
  const sql_edit_note = 'update bb_notes set title=? summary=? label=? image_url=? mdContent=? htmlContent=? update_date=? where note_id=?'
  db.query(sql_edit_note, [noteData.title, noteData.summary, noteData.label, noteData.imageUrl, noteData.mdContent, noteData.htmlContent, getTime(), noteId], (err, results) => {
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
    res.send({
      code: 20000,
      message: '获取笔记详情成功！',
      data: results
    })
  })
}
exports.addComment = (req, res) => {
  const commentData = req.body
  const sql_insert_comment = 'insert into bb_note_comment set ?'
  db.query(sql_insert_comment, {parent_id: commentData.parentId, user_id: commentData.userId, note_id: commentData.noteId, nickname: commentData.nickname, reply: commentData.reply, user_pic: commentData.userPic, content: commentData.content, create_date: getTime()}, (err, results) => {
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
  const sql_delete_comment = 'delete from bb_note_comment where note_id=?'
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