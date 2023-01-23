const express = require('express')
const cors = require('cors')
const joi = require('joi')

const authRouter = require('./router/auth')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/auth', authRouter)



app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
