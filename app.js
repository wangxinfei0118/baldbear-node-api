const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')

const config = require('./config')
const convertVar = require('./middleware/convertVar')
const error = require('./middleware/error')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')
const lifeRouter = require('./routes/life')
const messageRouter = require('./routes/message')
const fileRouter = require('./routes/file')


const app = express()

// 封装res.err
app.use(function (req, res, next) {
  res.err = function (err, code = 50000) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(convertVar)

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({
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
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/note', noteRouter)
app.use('/life', lifeRouter)
app.use('/message', messageRouter)
app.use('/file', fileRouter)
app.use('/static/',express.static('./static/'))


// 错误级别中间件
app.use(error)

app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
