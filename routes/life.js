const express = require('express')
const expressJoi = require('@escook/express-joi')

const lifeController = require('../controllers/lifeController')
const { life_schema } = require('../schema/lifeSchema')

const router = express.Router()

// 获取日常生活列表
router.get('/life', lifeController.getLifeList)
// 根据id获取生活详情
router.get('/life/:id', lifeController.getLifeById)
// 新增日常生活
router.post('/life', expressJoi(life_schema), lifeController.addLife)
// 编辑
router.put('/life/:id', expressJoi(life_schema), lifeController.editLife)
// 删除
router.delete('/life/:id', lifeController.deleteLife)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Life
 *   description: 日常生活管理
 */

/**
 * @swagger
 * /life/life:
 *   get:
 *     tags:
 *       - Life
 *     summary: 获取日常生活列表
 *     description: 获取日常生活列表
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
 *                     $ref: '#/components/schemas/Life'
 *
 *   post:
 *     tags:
 *       - Life
 *     summary: 新增日常
 *     description: 新增日常 需要token且为管理员
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Life'
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /life/life/{id}:
 *   get:
 *     tags:
 *       - Life
 *     summary: 获取生活详情
 *     description: 根据生活id获取生活详情
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Life id
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
 *                   $ref: '#/components/schemas/Life'
 *
 *   put:
 *     tags:
 *       - Life
 *     summary: 编辑生活
 *     description: 编辑生活 需要token且为管理员
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Life id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Life'
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 *
 *   delete:
 *     tags:
 *       - Life
 *     summary: 删除生活
 *     description: 删除生活 需要token且为管理员
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Life id
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */
