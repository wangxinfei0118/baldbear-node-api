const express = require('express')
const expressJoi = require('@escook/express-joi')

const authHandler = require('../router_handler/auth')
const { reg_schema, login_schema } = require('../schema/auth')

const router = express.Router()

// 检测用户名是否存在
router.get('/username/:username', authHandler.username)

// 注册
router.post('/register', expressJoi(reg_schema), authHandler.register)

// 登录
router.post('/login', expressJoi(login_schema), authHandler.login)

// 刷新token
router.get('/refresh', authHandler.refresh)


module.exports = router
