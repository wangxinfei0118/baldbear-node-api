const underlineToCamel = (data) => {
  if (typeof data != 'object' || !data) return data
  if (Array.isArray(data)) {
    return data.map(item => underlineToCamel(item))
  }

  const newData = {}
  for (let key in data) {
    let newKey = key.replace(/_([a-z])/g, (p, m) => m.toUpperCase())
    newData[newKey] = underlineToCamel(data[key])
  }
  return newData
}
const camelToUnderline  = (data) => {
  if (typeof data != 'object' || !data) return data
  if (Array.isArray(data)) {
    return data.map(item => camelToUnderline(item))
  }

  const newData = {}
  for (let key in data) {
    let newKey = key.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`)
    newData[newKey] = camelToUnderline(data[key])
  }
  return newData
}
module.exports = {underlineToCamel, camelToUnderline}