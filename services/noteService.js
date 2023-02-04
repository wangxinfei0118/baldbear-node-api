const db = require('../db')
const arrToTree = require('../utils/arrToTree')
const getTime = require('../utils/getTime')

exports.getNoteLabel = async () => {
  const sql_label = 'select * from bb_labels'
  const sql_label_item = 'select * from bb_labels_item'
  const labelList = await new Promise((resolve, reject) => {
    db.query(sql_label, (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
  const labelItemList = await new Promise((resolve, reject) => {
    db.query(sql_label_item, (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
  return arrToTree(labelList, labelItemList, 'labelList') // 转成树状结构
}

exports.getNoteList = async (queryObj) => {
  // 开始查询的index
  const start = (queryObj.current - 1) * queryObj.size
  // 查询笔记总数
  const sql_note_count = `select count(*) total from bb_notes ` + (queryObj.label ? `where label='${queryObj.label}'` : '')
  // 根据queryObj.label是否存在 判断是否是根据标签查询
  const sql_note_list =
    `select note_id, title, summary, label, image_url, view_count, chat_count, create_date, update_date from bb_notes ` +
    (queryObj.label ? `where label='${queryObj.label}'` : '') +
    ` order by create_date desc limit ${start},${queryObj.size}`
  const noteCount = new Promise((resolve, reject) => {
    db.query(sql_note_count, (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results[0])
    })
  })
  const noteList = new Promise((resolve, reject) => {
    db.query(sql_note_list, (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
  return await Promise.all([noteCount, noteList])
}

exports.getNoteById = async (noteId) => {
  const sql_note_item = 'select * from bb_notes where note_id=?'
  return await new Promise((resolve, reject) => {
    db.query(sql_note_item, noteId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.length !== 1) {
        reject('获取笔记详情失败！')
      }
      resolve(results[0])
    })
  })
}

exports.addNote = async (noteData) => {
  noteData.create_date = noteData.update_date = getTime()
  noteData.view_count = noteData.chat_count = 0
  const sql_insert_note = 'insert into bb_notes set ?'
  return await new Promise((resolve, reject) => {
    db.query(sql_insert_note, noteData, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('新增笔记失败！')
      }
      resolve(results.insertId)
    })
  })
}

exports.editNote = async (noteId, noteData) => {
  noteData.update_date = getTime()
  const sql_edit_note = 'update bb_notes set ? where note_id=?'
  await new Promise((resolve, reject) => {
    db.query(sql_edit_note, [noteData, noteId], (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('修改笔记失败！')
      }
      resolve()
    })
  })
}

exports.deleteNote = async (noteId) => {
  const sql_delete_note = 'delete from bb_notes where note_id=?'
  await new Promise((resolve, reject) => {
    db.query(sql_delete_note, noteId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('删除笔记失败！')
      }
      resolve()
    })
  })
}

exports.updateNoteViewCount = async (noteId) => {
  const sql_note_list = 'update bb_notes set view_count=view_count+1 where note_id=?'
  await new Promise((resolve, reject) => {
    db.query(sql_note_list, noteId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('更新浏览数失败！')
      }
      resolve()
    })
  })
}

exports.getCommentByNoteId = async (noteId) => {
  const sql_comment = 'select * from bb_note_comment where note_id=?'
  return await new Promise((resolve, reject) => {
    db.query(sql_comment, noteId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      const commentList = arrToTree(results)
      resolve(commentList)
    })
  })
}
exports.addComment = async (commentData) => {
  commentData.create_date = getTime()
  const sql_insert_comment = 'insert into bb_note_comment set ?'
  await new Promise((resolve, reject) => {
    db.query(sql_insert_comment, commentData, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('新增评论失败！')
      }
      resolve()
    })
  })
  const sql_add_comment_count = 'update bb_notes set chat_count=chat_count+1 where note_id=?'
  await new Promise((resolve, reject) => {
    db.query(sql_add_comment_count, commentData.note_id, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('更新评论数失败！')
      }
      resolve()
    })
  })
}

exports.deleteComment = async (commentId, uid, role) => {
  const sql_select_note = 'select note_id from bb_note_comment where id=?'
  const note_id = await new Promise((resolve, reject) => {
    db.query(sql_select_note, commentId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (uid !== results[0].user_id && role !== 1) {
        reject('暂无权限')
      }
      resolve(results[0].note_id)
    })
  })
  await new Promise((resolve, reject) => {
    const sql_delete_comment = 'delete from bb_note_comment where id=?'
    db.query(sql_delete_comment, commentId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('删除评论失败！')
      }
      resolve()
    })
  })
  await new Promise((resolve, reject) => {
    const sql_reduce_comment_count = 'update bb_notes set chat_count=chat_count-1 where note_id=?'
    db.query(sql_reduce_comment_count, note_id, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('更新评论数失败！')
      }
      resolve()
    })
  })
}
