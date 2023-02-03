const express = require('express')
const expressJoi = require('@escook/express-joi')

const noteController = require('../controllers/noteController')
const { note_schema, comment_schema } = require('../schema/noteSchema')

const router = express.Router()

router.get('/label', noteController.getNoteLabel)
router.post('/note/list', noteController.getNoteList)
router.get('/note/:id', noteController.getNoteById)
router.post('/note', expressJoi(note_schema), noteController.addNote)
router.put('/note/:id', expressJoi(note_schema), noteController.editNote)
router.delete('/note/:id', noteController.deleteNote)
router.put('/viewCount/:id', noteController.updateNoteViewCount)
router.get('/comment/:id', noteController.getCommentByNoteId)
router.post('/comment', expressJoi(comment_schema), noteController.addComment)
router.delete('/comment/:id', noteController.deleteComment)

module.exports = router
