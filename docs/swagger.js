const path = require('path')
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')

//配置swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'baldbear个人博客接口api',
      version: '1.0.0'
    }
  },
  // 收集 swagger 注释
  apis: [path.join(__dirname, '../docs/*.yml'), path.join(__dirname, '../routes/*.js')]
}

const swaggerJson = function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
}
const swaggerSpec = swaggerDoc(options)

const swaggerInstall = function (app) {
  if (!app) {
    app = express()
  }
  // 开放相关接口，
  app.get('/swagger.json', swaggerJson)
  // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}
module.exports = swaggerInstall
