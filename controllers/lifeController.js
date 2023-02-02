const db = require('../db/index')
const getTime = require('../utils/getTime')

exports.getLifeList = (req, res) => {
  const sql_life = 'select * from bb_life'
  db.query(sql_life, (err, results) => {
    if (err) {
      return res.err(err)
    }
    res.send({
      code: 20000,
      message: '获取生活列表成功！',
      data: {
        total: results.length,
        records: results
      }
    })
  })
}
exports.getLifeById = (req, res) => {
  const lifeId = req.params.id
  const sql_life_item = 'select * from bb_life where id=?'
  db.query(sql_life_item, lifeId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.length !== 1) {
      return res.err('获取生活详情失败！')
    }
    res.send({
      code: 20000,
      message: '获取生活详情成功！',
      data: results[0],
    })
  })
}
exports.addLife = (req, res) => {
  if (req.user.role !== 1){
    return res.err('暂无权限')
  }
  const lifeData = req.body
  const sql_insert_life = 'insert into bb_life set ?'
  db.query(sql_insert_life, {title: lifeData.title, html_content: lifeData.html_content, create_date: getTime(), update_date: getTime()}, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('新增生活失败！')
    }
    res.send({
      code: 20000,
      message: '新增生活成功！',
    })
  })
}
exports.editLife  = (req, res) => {
  if (req.user.role !== 1){
    return res.err('暂无权限')
  }
  const lifeId = req.params.id
  const lifeData = req.body
  lifeData.update_date = getTime()
  const sql_edit_life = 'update bb_life set ? where id=?'
  db.query(sql_edit_life, [lifeData, lifeId], (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('修改笔记失败！')
    }
    res.send({
      code: 20000,
      message: '修改笔记成功！'
    })
  })
}
exports.deleteLife = (req, res) => {
  if (req.user.role !== 1){
    return res.err('暂无权限')
  }
  const LifeId = req.params.id
  const sql_delete_life = 'delete from bb_life where id=?'
  db.query(sql_delete_life, LifeId, (err, results) => {
    if (err) {
      return res.err(err)
    }
    if (results.affectedRows !== 1) {
      return res.err('删除生活失败！')
    }
    res.send({
      code: 20000,
      message: '删除生活成功！'
    })
  })
}