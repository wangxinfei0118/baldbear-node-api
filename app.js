const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))


app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
