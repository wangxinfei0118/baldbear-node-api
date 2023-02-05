const express = require('express')
const expressJoi = require('@escook/express-joi')

const userController = require('../controllers/userController')
const { userinfo_schema, update_password_schema } = require('../schema/userSchema')
const xssFilter = require('../middleware/xssFilter')

const router = express.Router()

// 根据用户id获取用户详情
router.get('/user/:uid', userController.getUserInfo)
// 修改用户信息
router.put('/user/:uid', expressJoi(userinfo_schema), xssFilter, userController.updateUserInfo)
// 修改密码
router.put('/password/:uid', expressJoi(update_password_schema), userController.updatePassword)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 用户信息管理
 */

/**
 * @swagger
 * /user/user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: 获取用户详情
 *     description: 根据用户id获取用户详情 需要token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User id
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
 *                   $ref: '#/components/schemas/User'
 *
 *   put:
 *     tags:
 *       - User
 *     summary: 修改用户信息
 *     description: 根据用户id修改用户信息 需要token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *             properties:
 *               nickname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               userPic:
 *                  type: string
 *                  description: 用户头像
 *             example:
 *               nickname: fakename
 *               email: fake@example.com
 *               phone: 12345678900
 *               userPic: http://localhost:3008/static/uploads/1675240793946.jpeg
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /user/password/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: 修改密码
 *     description: 修改密码 需要token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *             properties:
 *               oldPwd:
 *                 type: string
 *                 minLength: 6
 *               newPwd:
 *                 type: string
 *                 minLength: 6
 *                 description: 密码至少6位，且不能与旧密码相同
 *             example:
 *               oldPwd: 123456
 *               newPwd: 123456789
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */
