const { to } = require('await-to-js')
const noteService = require('../services/noteService')

exports.getNoteLabel = async (req, res) => {
  const [err, labelList] = await to(noteService.getNoteLabel())
  if (err) return res.err(err)
  res.send({ code: 20000, message: '获取笔记分类列表成功！', data: labelList })
}

exports.getNoteList = async (req, res) => {
  const [err, results] = await to(noteService.getNoteList(req.body))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '获取笔记列表成功！', data: { total: results[0].total, records: results[1] } })
}

exports.getNoteById = async (req, res) => {
  const [err, noteDetail] = await to(noteService.getNoteById(req.params.id))
  if (err) return res.err(err, 50002)
  res.send({ code: 20000, message: '获取笔记详情成功！', data: noteDetail })
}

exports.addNote = async (req, res) => {
  if (req.user.role !== 1) return res.err('暂无权限')
  const [err, noteId] = await to(noteService.addNote(req.body))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '新增笔记成功！', data: noteId })
}

exports.editNote = async (req, res) => {
  if (req.user.role !== 1) return res.err('暂无权限')
  const [err, noteId] = await to(noteService.editNote(req.params.id, req.body))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '修改笔记成功！', data: noteId })
}

exports.deleteNote = async (req, res) => {
  if (req.user.role !== 1) return res.err('暂无权限')
  const [err] = await to(noteService.deleteNote(req.params.id))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '删除笔记成功！' })
}

exports.updateNoteViewCount = async (req, res) => {
  const [err] = await to(noteService.updateNoteViewCount(req.params.id))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '更新浏览数成功！' })
}

exports.getCommentByNoteId = async (req, res) => {
  const [err, commentList] = await to(noteService.getCommentByNoteId(req.params.id))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '获取笔记评论成功！', data: commentList })
}

exports.addComment = async (req, res) => {
  const [err] = await to(noteService.addComment(req.body))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '新增评论成功！' })
}

exports.deleteComment = async (req, res) => {
  const [err] = await to(noteService.deleteComment(req.params.id, req.user.uid, req.user.role))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '删除评论成功！' })
}
