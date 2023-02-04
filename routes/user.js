const express = require('express')
const expressJoi = require('@escook/express-joi')

const userController = require('../controllers/userController')
const { userinfo_schema, update_password_schema } = require('../schema/userSchema')

const router = express.Router()

// 根据用户id获取用户详情
router.get('/user/:uid', userController.getUserInfo)
// 修改用户信息
router.put('/user/:uid', expressJoi(userinfo_schema), userController.updateUserInfo)
// 修改密码
router.put('/password/:uid', expressJoi(update_password_schema), userController.updatePassword)

module.exports = router
