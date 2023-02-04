const express = require('express')
const expressJoi = require('@escook/express-joi')

const messageController = require('../controllers/messageController')
const { message_schema } = require('../schema/messageSchema')

const router = express.Router()

// 获取留言列表
router.get('/message', messageController.getMessage)
// 新增留言
router.post('/message', expressJoi(message_schema), messageController.addMessage)
// 删除留言
router.delete('/message/:id', messageController.deleteMessage)

module.exports = router
