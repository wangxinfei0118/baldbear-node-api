const express = require('express')
const expressJoi = require('@escook/express-joi')

const lifeHandler = require('../router_handler/life')
const { life_schema } = require('../schema/life')

const router = express.Router()

router.get('/life', lifeHandler.getLifeList)
router.get('/life/:id', lifeHandler.getLifeById)
router.post('/life', expressJoi(life_schema), lifeHandler.addLife)
router.put('/life/:id', expressJoi(life_schema), lifeHandler.editLife)
router.delete('/life/:id', lifeHandler.deleteLife)


module.exports = router