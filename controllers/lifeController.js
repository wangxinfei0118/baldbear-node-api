const { to } = require('await-to-js')
const lifeService = require('../services/lifeService')

exports.getLifeList = async (req, res) => {
  const [err, lifeList] = await to(lifeService.getLifeList())
  if (err) return res.err(err)
  res.send({ code: 20000, message: '获取生活列表成功！', data: { total: lifeList.length, records: lifeList } })
}

exports.getLifeById = async (req, res) => {
  const [err, lifeDetail] = await to(lifeService.getLifeById(req.params.id))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '获取生活详情成功！', data: lifeDetail })
}

exports.addLife = async (req, res) => {
  if (req.user.role !== 1) return res.err('暂无权限')
  const [err] = await to(lifeService.addLife(req.body))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '新增生活成功！' })
}

exports.editLife = async (req, res) => {
  if (req.user.role !== 1) return res.err('暂无权限')
  const [err] = await to(lifeService.editLife(req.params.id, req.body))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '修改生活成功！' })
}

exports.deleteLife = async (req, res) => {
  if (req.user.role !== 1) return res.err('暂无权限')
  const [err] = await to(lifeService.deleteLife(req.params.id))
  if (err) return res.err(err)
  res.send({ code: 20000, message: '删除生活成功！' })
}
