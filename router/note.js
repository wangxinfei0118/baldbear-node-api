const express = require('express')
const expressJoi = require('@escook/express-joi')

const noteHandler = require('../router_handler/note')
const { note_schema } = require('../schema/note')

const router = express.Router()

router.get('/label', noteHandler.getNoteLabel)
router.post('/note/list', noteHandler.getNoteList)
router.get('/note/:id', noteHandler.getNoteById)
router.post('/note', expressJoi(note_schema), noteHandler.addNote)
router.put('/note/:id', expressJoi(note_schema), noteHandler.editNote)
router.delete('/note/:id', noteHandler.deleteNote)
router.put('/viewCount/:id', noteHandler.updateNoteViewCount)
router.get('/comment/:id', noteHandler.getCommentByNoteId)
router.post('/comment', noteHandler.addComment)
router.delete('/comment/:id', noteHandler.deleteComment)

module.exports = router
