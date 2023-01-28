function arrToTree(pa, ch, listName = 'children') {
  const treeArr = ch ? pa : []
  pa.forEach(item => {
    if (!ch){
      if (item.pid === -1) {
        treeArr.push(item)
      }
    }
    const chList = ch ? ch : pa
    const children = chList.filter(obj => obj.pid === item.id)
    if (children.length === 0) return
    item[listName] = children
  })
  return treeArr
}
module.exports = arrToTree