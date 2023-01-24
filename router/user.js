const express = require('express')

const userHandler = require('../router_handler/user')

const router = express.Router()

router.get('/user/:uid', userHandler.getUserInfo)

module.exports = router
