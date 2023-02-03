const db = require("../db");
const getTime = require("../utils/getTime");

exports.getLifeList = async () => {
  const sql_life = 'select * from bb_life'
  return await new Promise((resolve, reject) => {
    db.query(sql_life, (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}
exports.getLifeById = async (lifeId) => {
  const sql_life_item = 'select * from bb_life where id=?'
  return await new Promise((resolve, reject) => {
    db.query(sql_life_item, lifeId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.length !== 1) {
        reject('获取生活详情失败！')
      }
      resolve(results[0])
    })
  })
}
exports.addLife = async (lifeData) => {
  lifeData.create_date = lifeData.update_date = getTime()
  const sql_insert_life = 'insert into bb_life set ?'
  await new Promise((resolve, reject) => {
    db.query(sql_insert_life, lifeData, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('新增生活失败！')
      }
      resolve()
    })
  })
}
exports.editLife  = async (lifeId, lifeData) => {
  lifeData.update_date = getTime()
  const sql_edit_life = 'update bb_life set ? where id=?'
  await new Promise((resolve, reject) => {
    db.query(sql_edit_life, [lifeData, lifeId], (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('修改笔记失败！')
      }
      resolve()
    })
  })
}
exports.deleteLife = async (LifeId) => {
  const sql_delete_life = 'delete from bb_life where id=?'
  await new Promise((resolve, reject) => {
    db.query(sql_delete_life, LifeId, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      if (results.affectedRows !== 1) {
        reject('删除生活失败！')
      }
      resolve()
    })
  })
}