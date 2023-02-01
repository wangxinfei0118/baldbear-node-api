const fs = require('fs')
const path = require("path");
const baseUrl = process.env.NODE_ENV === 'dev' ? 'http://localhost:3008' : 'http://server.baldbear.cn'
exports.uploadImage = (req, res) => {
  if (!req.file){
    return res.err('上传图片失败！')
  }
  const fileUrl = baseUrl + req.file.path.split('baldbear-node-api')[1].replace(/\\/g,'/')
  res.send({
    code: 20000,
    message: '上传图片成功！',
    data: fileUrl
  })
}
exports.deleteImage = (req, res) => {
  const fileUrl = path.join(__dirname, '../static/uploads', req.query.fileUrl.split('uploads')[1])
  fs.unlink(fileUrl, (err) => {
    if (err) {
      return res.err(err)
    }
    res.send({
      code: 20000,
      message: '删除图片成功！',
    })
  });
}