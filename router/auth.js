const express = require('express')
const expressJoi = require('@escook/express-joi')

const { reg_schema, login_schema } = require('../schema/auth')

const router = express.Router()

// 检测用户名是否存在
router.get('/username/:username', function () {

})

// 注册
router.post('/register', expressJoi(reg_schema), function () {

})

// 登录
router.post('/login', expressJoi(login_schema), function () {

})

module.exports = router
