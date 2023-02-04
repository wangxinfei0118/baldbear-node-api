const express = require('express')
const cors = require('cors')

const convertVar = require('./middleware/convertVar')
const error = require('./middleware/error')
const routes = require('./routes')
const swaggerInstall = require('./docs/swagger')

const app = express()
swaggerInstall(app)
// 封装res.err
app.use(function (req, res, next) {
  res.err = function (err, code = 50000) {
    res.send({
      code,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use(cors())
app.use(express.urlencoded({ extended: false })) // 解析键值对 application/x-www-form-urlencoded
app.use(express.json()) // 解析json数据格式
app.use(convertVar) // 转换小驼峰为下划线

app.use('/', routes)

// 错误级别中间件
app.use(error)

app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
