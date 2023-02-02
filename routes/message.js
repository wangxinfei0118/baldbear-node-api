const express = require('express')
const expressJoi = require('@escook/express-joi')

const messageController = require('../controllers/messageController')
const { message_schema } = require('../schema/message')

const router = express.Router()

router.get('/message', messageController.getMessage)
router.post('/message', expressJoi(message_schema), messageController.addMessage)
router.delete('/message/:id', messageController.deleteMessage)

module.exports = router
