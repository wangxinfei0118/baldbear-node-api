const express = require('express')
const expressJoi = require('@escook/express-joi')

const noteController = require('../controllers/noteController')
const { note_schema } = require('../schema/note')

const router = express.Router()

router.get('/label', noteController.getNoteLabel)
router.post('/note/list', noteController.getNoteList)
router.get('/note/:id', noteHandler.getNoteById)
router.post('/note', expressJoi(note_schema), noteController.addNote)
router.put('/note/:id', expressJoi(note_schema), noteController.editNote)
router.delete('/note/:id', noteController.deleteNote)
router.put('/viewCount/:id', noteController.updateNoteViewCount)
router.get('/comment/:id', noteController.getCommentByNoteId)
router.post('/comment', noteController.addComment)
router.delete('/comment/:id', noteController.deleteComment)

module.exports = router
