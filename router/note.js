const express = require('express')

const noteHandler = require('../router_handler/note')

const router = express.Router()

router.get('/label', noteHandler.getNoteLabel)
router.get('/note', noteHandler.getNoteList)
router.get('/note/:id', noteHandler.getNoteById)
router.post('/note', noteHandler.addNote)
router.put('/note/:id', noteHandler.editNote)
router.delete('/note/:id', noteHandler.deleteNote)
router.put('/viewCount/:id', noteHandler.updateNoteViewCount)
router.get('/comment/:id', noteHandler.getCommentByNoteId)
router.post('/comment', noteHandler.addComment)
router.delete('/comment/:id', noteHandler.deleteComment)

module.exports = router
