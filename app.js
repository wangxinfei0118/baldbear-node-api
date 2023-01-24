const express = require('express')
const cors = require('cors')
const joi = require('joi')
const expressJWT = require('express-jwt')

const config = require('./config')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')

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
app.use('/user', userRouter)


// 捕获非自定义错误
app.use(function (err, req, res, next) {
  // 表单验证失败
  if (err instanceof joi.ValidationError) return res.err('表单验证失败')
  // 身份认证失败
  if (err.name === 'UnauthorizedError') return res.err('身份认证失败，清重新登录',20401)
  // 未知错误
  res.err(err,20500)
})

app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
