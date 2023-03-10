# baldbear-node-api

[![baldbear](https://img.shields.io/badge/%E7%A7%83%E5%A4%B4%E7%86%8A-%40baldbear-brightgreen)](http://baldbear.cn/)[![node](https://img.shields.io/badge/node-v14.19.0-blue)](https://nodejs.org/)[![npm](https://img.shields.io/badge/npm-v6.14.16-blue)](https://www.npmjs.com/)[![express](https://img.shields.io/badge/express-%5E4.17.1-blue)](https://expressjs.com/)[![mysql](https://img.shields.io/badge/mysql-v5.7-blue)](https://www.mysql.com/)

该项目是基于Node.js+Express+Mysql实现的RESTFUL API前后端分离个人博客接口，接口包括：登录注册，用户信息，笔记管理，日常管理，评论管理，留言管理等，并实现权限验证，状态刷新，数据分页，条件筛选，swagger等功能

[博客在线地址](http://baldbear.cn)   [项目前端仓库](https://github.com/wangxinfei0118/baldbear-blog) 

## 项目特点

- [JWT](https://github.com/auth0/node-jsonwebtoken)进行权限验证，refreshToken进行token刷新
- 对password进行bcrypt加密
- [cors](https://github.com/expressjs/cors)进行跨域资源请求
- 异步编程，使用async/await进行整体代码重构
- 使用[Joi](https://github.com/hapijs/joi) 和[express-joi](https://www.npmjs.com/package/@escook/express-joi) 验证请求数据
- 封装异常处理函数，进行全局异常处理
- 使用[cross-env](https://github.com/kentcdodds/cross-env#readme)管理环境变量
- 文件上传与静态资源访问
- 封装xss过滤中间件，预防xss注入
- 自定义变量命名转换与错误处理中间件
- 数据的分页查询与条件查询
- 使用 swagger-jsdoc 和 [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)生成api文档
- 使用[PM2](https://pm2.keymetrics.io/)对生成环境下的进程进行管理

## 快速开始

克隆项目：

```bash
git clone https://github.com/wangxinfei0118/baldbear-node-api.git
```

安装依赖：

```bash
cd baldbear-node-api
npm install
```

创建并配置数据库：

```bash
# 登录数据库
mysql -uroot -p密码
# 创建并进入 baldbear 数据库
create database baldbear
use baldbear
# 导入sql文件
source ./db/baldbear.sql

# 注意在启动前要在./db/index.js下配置数据库信息
```

启动项目：

```bash
# 运行服务
npm run dev

# 接口地址：http://localhost:3008
```

生产环境：

```bash
npm start
# 或
pm2 start ecosystem.config.js
```

## 目录结构

```
├─controllers                           # 请求、响应处理 
├─db                                  	# mysql数据库配置文件
├─middleware                            # 自定义中间件
├─routes                                # 接口路由
├─schema                                # 请求数据验证规则
├─services                              # 业务处理
├─static                                # 静态资源/上传文件
├─utils                                 # 工具函数
│  app.js                             # 入口文件
│  config.js                          # 全局变量及配置
│  ecosystem.config.js                # pm2配置文件
│  package.json                       # npm包管理文件
```

## 技术栈

- Node.js
- Express
- Mysql
- JSON Web Token(JWT)
- Joi
- Bcryptjs
- PM2

## 功能模块

- 登录/登出
- 注册
- 权限验证
- 用户信息
- 笔记管理
- 日常管理
- 评论管理
- 留言管理
- 文件上传

## API文档

要查看可用 API 及其规范的列表，请启动项目并在浏览器中打开。此文档页面是使用在路由文件中作为注释编写的 [swagger](https://swagger.io/) 自动生成的。

访问`http://localhost:3008/docs`

或 [点击查看在线接口文档](http://api.baldbear.cn/docs/) 