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
