const express = require('express')

const lifeHandler = require('../router_handler/life')

const router = express.Router()

router.get('/life', lifeHandler.getLifeList)
router.get('/life/:id', lifeHandler.getLifeById)
router.post('/life', lifeHandler.addLife)
router.put('/life/:id', lifeHandler.editLife)
router.delete('/life/:id', lifeHandler.deleteLife)


module.exports = router