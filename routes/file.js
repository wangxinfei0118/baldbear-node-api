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

/**
 * @swagger
 * tags:
 *   name: File
 *   description: 文件上传
 */

/**
 * @swagger
 * /file/image/upload:
 *   post:
 *     tags:
 *       - File
 *     summary: 上传图片
 *     description: 上传图片 需要token
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                  type: string
 *                  format: binary
 *     responses:
 *       "200":
 *         description: 成功处理请求
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *                   description: fileUrl
 */

/**
 * @swagger
 * /file/image/delete:
 *   delete:
 *     tags:
 *       - File
 *     summary: 删除图片
 *     description: 删除图片 需要token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fileUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: file Url
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/Successful'
 */
