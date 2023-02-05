const express = require('express')
const expressJoi = require('@escook/express-joi')

const noteController = require('../controllers/noteController')
const { note_schema, comment_schema } = require('../schema/noteSchema')
const xssFilter = require('../middleware/xssFilter')

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
router.post('/comment', expressJoi(comment_schema), xssFilter, noteController.addComment)
// 删除评论
router.delete('/comment/:id', noteController.deleteComment)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Note
 *   description: 笔记管理
 */

/**
 * @swagger
 * /note/label:
 *   get:
 *     tags:
 *       - Note
 *     summary: 获取标签列表
 *     description: 获取标签列表
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
 *                     type: object
 */

/**
 * @swagger
 * /note/note/list:
 *   post:
 *     tags:
 *       - Note
 *     summary: 分页获取笔记列表
 *     description: 分页获取笔记列表
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - current
 *               - size
 *             properties:
 *               current:
 *                 type: number
 *               size:
 *                 type: number
 *               label:
 *                 type: string
 *             example:
 *               current: 1
 *               size: 8
 *               label: 测试
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
 *                     $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * /note/note:
 *   post:
 *     tags:
 *       - Note
 *     summary: 新增笔记
 *     description: 新增笔记 需要token且为管理员
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
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
 *                     $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * /note/note/{id}:
 *   get:
 *     tags:
 *       - Note
 *     summary: 获取笔记详情
 *     description: 根据id获取笔记详情
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Note id
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
 *                   $ref: '#/components/schemas/Note'
 *
 *   put:
 *     tags:
 *       - Note
 *     summary: 编辑笔记
 *     description: 编辑笔记 需要token且为管理员
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Note id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 *
 *   delete:
 *     tags:
 *       - Note
 *     summary: 删除笔记
 *     description: 删除笔记 需要token且为管理员
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Note id
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /note/viewCount/{id}:
 *   put:
 *     tags:
 *       - Note
 *     summary: 更新浏览量
 *     description: 更新浏览量
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Note id
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /note/comment:
 *   post:
 *     tags:
 *       - Note
 *     summary: 新增评论
 *     description: 新增评论 需要token
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pid
 *               - userId
 *               - noteId
 *               - nickname
 *               - content
 *               - userPic
 *             properties:
 *               pid:
 *                 type: number
 *               userId:
 *                 type: number
 *               noteId:
 *                 type: number
 *               nickname:
 *                 type: string
 *               belowReplyId:
 *                  type: number
 *                  description: 子回复下的二级回复id
 *               belowReplyName:
 *                  type: string
 *                  description: 子回复下的二级被回复name
 *               content:
 *                  type: string
 *               userPic:
 *                  type: string
 *             example:
 *               pid: -1
 *               userId: 1
 *               noteId: 1
 *               content: 回复
 *               nickname: fake name
 *               belowReplyId: 1
 *               belowReplyName: fake name1
 *               userPic: http://localhost:3008/static/uploads/1675240793946.jpeg
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /note/comment/{id}:
 *   get:
 *     tags:
 *       - Note
 *     summary: 根据笔记id获取评论列表
 *     description: 根据笔记id获取评论列表
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Note id
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
 *                     type: object
 *
 *   delete:
 *     tags:
 *       - Note
 *     summary: 删除评论
 *     description: 删除评论 需要token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Note id
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */
