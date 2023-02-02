const express = require('express')
const expressJoi = require('@escook/express-joi')

const lifeController= require('../controllers/lifeController')
const { life_schema } = require('../schema/life')

const router = express.Router()

router.get('/life', lifeController.getLifeList)
router.get('/life/:id', lifeController.getLifeById)
router.post('/life', expressJoi(life_schema), lifeController.addLife)
router.put('/life/:id', expressJoi(life_schema), lifeController.editLife)
router.delete('/life/:id', lifeController.deleteLife)


module.exports = router