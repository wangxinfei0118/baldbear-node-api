const express = require('express')
const multer = require('multer')
const path = require('path')

const fileController = require('../controllers/fileController')

const router = express.Router()

// 上传文件配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../static/uploads'))
  },
  filename: function (req, file, cb) {
    let timeStamp = new Date().getTime()
    cb(null, timeStamp + '.' + file.originalname.split('.')[1])
  }
})
const upload = multer({ storage: storage })

// 上传图片
router.post('/image/upload', upload.single('image'), fileController.uploadImage)
// 删除图片
router.delete('/image/delete', fileController.deleteImage)

module.exports = router
