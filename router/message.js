const express = require('express')

const messageHandler = require('../router_handler/message')

const router = express.Router()

router.get('/message/', messageHandler.getMessage)
router.post('/message', messageHandler.addMessage)
router.delete('/message/:id', messageHandler.deleteMessage)

module.exports = router
