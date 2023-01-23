const express = require('express')
const cors = require('cors')
const joi = require('joi')
const expressJWT = require('express-jwt')

const config = require('./config')
const authRouter = require('./router/auth')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 封装处理错误中间件
app.use(function (req, res, next) {
  res.err = function (err, code = 20001) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/auth\//] }))
app.use('/auth', authRouter)



app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
