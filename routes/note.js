const express = require('express')
const expressJoi = require('@escook/express-joi')

const noteController = require('../controllers/noteController')
const { note_schema, comment_schema } = require('../schema/noteSchema')

const router = express.Router()

// 获取标签列表
router.get('/label', noteController.getNoteLabel)
// 分页获取笔记列表
router.post('/note/list', noteController.getNoteList)
// 根据id获取笔记详情
router.get('/note/:id', noteController.getNoteById)
// 新增笔记
router.post('/note', expressJoi(note_schema), noteController.addNote)
// 编辑笔记
router.put('/note/:id', expressJoi(note_schema), noteController.editNote)
// 删除笔记
router.delete('/note/:id', noteController.deleteNote)
// 更新浏览量
router.put('/viewCount/:id', noteController.updateNoteViewCount)
// 根据笔记id获取评论列表
router.get('/comment/:id', noteController.getCommentByNoteId)
// 新增评论
router.post('/comment', expressJoi(comment_schema), noteController.addComment)
// 删除评论
router.delete('/comment/:id', noteController.deleteComment)

module.exports = router
