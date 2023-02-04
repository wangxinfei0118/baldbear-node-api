function random(randomLength, prefix = '用户') {
  // 随机词典数组
  let nameArr = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'g',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ]
  ]
  let nameStr = prefix
  for (let i = 0; i < randomLength; i++) {
    // 随机生成index
    let index = Math.floor(Math.random() * 2)
    let char = nameArr[index][Math.floor(Math.random() * nameArr[index].length)]
    // 英文字母百分之50的概率变为大写
    if (index === 1) {
      if (Math.floor(Math.random() * 2) === 1) {
        char = char.toUpperCase()
      }
    }
    nameStr += char
  }
  return nameStr
}
module.exports = random
