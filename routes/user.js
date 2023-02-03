const express = require('express')
const expressJoi = require('@escook/express-joi')

const userController = require('../controllers/userController')
const { userinfo_schema, update_password_schema } = require('../schema/userSchema')

const router = express.Router()

router.get('/user/:uid', userController.getUserInfo)

router.put('/user/:uid', expressJoi(userinfo_schema), userController.updateUserInfo)

router.put('/password/:uid', expressJoi(update_password_schema), userController.updatePassword)

module.exports = router
