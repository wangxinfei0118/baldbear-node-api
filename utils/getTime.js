function getTime() {
  let date = new Date()
  let yy = date.getFullYear()
  let mm = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let hh = date.getHours()
  let mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
}
module.exports = getTime
