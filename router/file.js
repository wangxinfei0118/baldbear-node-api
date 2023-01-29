const express = require('express')
const multer = require('multer')
const path = require('path')

const fileHandler = require('../router_handler/file')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../static/uploads'));
  },
  filename: function (req, file, cb) {
    let timeStamp = new Date().getTime()
    cb(null, timeStamp + '.' + file.originalname.split(".")[1]);
  }
})
const upload = multer({ storage: storage })

router.post('/image/upload', upload.single('image'), fileHandler.uploadImage )
router.delete('/image/delete', fileHandler.deleteImage)

module.exports = router
