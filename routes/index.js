const express = require("express");
const expressJWT = require("express-jwt");

const config = require("../config");
const authRouter = require("./auth");
const userRouter = require("./user");
const noteRouter = require("./note");
const lifeRouter = require("./life");
const messageRouter = require("./message");
const fileRouter = require("./file");

const router = express.Router();

// JWT验证范围
router.use(expressJWT({ secret: config.jwtSecretKey }).unless({
  path: [
    /^\/auth\//,
    /^\/static\//,
    /\/viewCount\//,
    '/note/note/list',
    { url: /^\/note\//, methods: ['GET'] },
    { url: /^\/life\//, methods: ['GET'] },
    { url: /^\/message\//, methods: ['GET'] },
  ]
}))

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/note', noteRouter)
router.use('/life', lifeRouter)
router.use('/message', messageRouter)
router.use('/file', fileRouter)
router.use('/static/',express.static('./static/'))

module.exports = router