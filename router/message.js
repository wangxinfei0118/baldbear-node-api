const express = require('express')
const expressJoi = require('@escook/express-joi')

const messageHandler = require('../router_handler/message')
const { message_schema } = require('../schema/message')

const router = express.Router()

router.get('/message', messageHandler.getMessage)
router.post('/message', expressJoi(message_schema), messageHandler.addMessage)
router.delete('/message/:id', messageHandler.deleteMessage)

module.exports = router
