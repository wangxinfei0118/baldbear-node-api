const fs = require('fs')

exports.uploadImage = (req, res) => {
  if (!req.file){
    res.err('上传图片失败！')
  }
  res.send({
    code: 20000,
    message: '上传图片成功！',
    data: req.file.path
  })
}
exports.deleteImage = (req, res) => {
  const fileUrl = req.query.fileUrl
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