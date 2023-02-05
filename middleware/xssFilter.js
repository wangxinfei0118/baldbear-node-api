const xss = require('xss')

const xssFilter = (req, res, next) => {
  if (req.params) req.params = filter(req.params)
  if (req.query) req.query = filter(req.query)
  if (req.body) req.body = filter(req.body)
  next()
}
// const whiteList = {
//   img: ['src'],
//   a: ['href', 'title', 'target'],
//   font: ['color', 'size']
// }

const filter = (content, map = new WeakMap()) => {
  if (typeof content !== 'object')
    return xss(content, {
      // whiteList
    })
  if (content instanceof Date || content instanceof RegExp) return new Date(content)
  if (map.has(content)) return map.get(content)

  const filtered = new content.constructor()
  map.set(content, filtered)
  for (const key in content) {
    if (content.hasOwnProperty(key)) {
      filtered[key] = filter(content[key], map)
    }
  }
  return filtered
}

module.exports = xssFilter
