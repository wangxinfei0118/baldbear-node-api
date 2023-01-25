const express = require('express')
const expressJoi = require('@escook/express-joi')

const userHandler = require('../router_handler/user')
const { userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

const router = express.Router()

router.get('/user/:uid', userHandler.getUserInfo)

router.put('/user/:uid', expressJoi(userinfo_schema), userHandler.updateUserInfo)

router.put('/password/:uid', expressJoi(update_password_schema), userHandler.updatePassword)

router.put('/avatar/:uid', expressJoi(update_avatar_schema), userHandler.updateAvatar)

module.exports = router
