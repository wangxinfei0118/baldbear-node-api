const express = require('express')
const expressJoi = require('@escook/express-joi')

const messageController = require('../controllers/messageController')
const { message_schema } = require('../schema/messageSchema')
const xssFilter = require('../middleware/xssFilter')

const router = express.Router()

// 获取留言列表
router.get('/message', messageController.getMessage)
// 新增留言
router.post('/message', expressJoi(message_schema), xssFilter, messageController.addMessage)
// 删除留言
router.delete('/message/:id', messageController.deleteMessage)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: 留言管理
 */

/**
 * @swagger
 * /message/message:
 *   get:
 *     tags:
 *       - Message
 *     summary: 获取留言列表
 *     description: 获取留言列表
 *     responses:
 *       "200":
 *         description: 成功处理请求
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *
 *   post:
 *     tags:
 *       - Message
 *     summary: 新增留言
 *     description: 新增留言 需要token
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /message/message/{id}:
 *   delete:
 *     tags:
 *       - Message
 *     summary: 删除留言
 *     description: 删除留言 需要token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Message id
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */
