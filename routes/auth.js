const express = require('express')
const expressJoi = require('@escook/express-joi')

const authController = require('../controllers/authController')
const { reg_schema, login_schema, username_schema } = require('../schema/authSchema')

const router = express.Router()

// 检测用户名是否存在
router.get('/username/:username', expressJoi(username_schema), authController.username)
// 注册
router.post('/register', expressJoi(reg_schema), authController.register)
// 登录
router.post('/login', expressJoi(login_schema), authController.login)
// 退出登录
router.get('/logout', authController.logout)
// 刷新登陆状态
router.get('/refresh', authController.refresh)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 用户权限管理
 */

/**
 * @swagger
 * /auth/username/:username:
 *   get:
 *     tags:
 *       - Auth
 *     summary: 查询用户名是否可以
 *     description: 查询用户名是否可以
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: 用户名
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 注册
 *     description: 注册新用户
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - repassword
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: 密码不能小于六位
 *               repassword:
 *                 type: string
 *                 minLength: 6
 *                 description: 两次密码必须一致
 *             example:
 *               title: test
 *               password: fakepassword123
 *               repassword: fakepassword123
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 登录
 *     description: 登录
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                  type: string
 *               password:
 *                  type: string
 *                  minLength: 6
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
 *                   type: object
 *                   properties:
 *                     userinfo:
 *                         $ref: '#/components/schemas/User'
 *                     accessToken:
 *                         $ref: '#/components/schemas/Token'
 *                     refreshToken:
 *                         $ref: '#/components/schemas/Token'
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     summary: 退出登录
 *     description: 退出登录
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     tags:
 *       - Auth
 *     summary: 刷新登陆状态
 *     description: 使用refreshToken 刷新登陆状态
 *     parameters:
 *       - in: query
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: refresh Token
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
 *                   type: object
 *                   properties:
 *                     userinfo:
 *                         $ref: '#/components/schemas/User'
 *                     accessToken:
 *                         $ref: '#/components/schemas/Token'
 *                     refreshToken:
 *                         $ref: '#/components/schemas/Token'
 */
