const express = require('express')
const expressJoi = require('@escook/express-joi')

const authController = require('../controllers/authController')
const { reg_schema, login_schema } = require('../schema/authSchema')

const router = express.Router()

// 检测用户名是否存在
router.get('/username/:username', authController.username)

// 注册
router.post('/register', expressJoi(reg_schema), authController.register)

// 登录
router.post('/login', expressJoi(login_schema), authController.login)

// 退出登录
router.get('/logout', authController.logout)

// 刷新token
router.get('/refresh', authController.refresh)


module.exports = router
