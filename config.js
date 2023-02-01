module.exports = {
  jwtSecretKey: 'baldbear-wxf',
  locationUrl: process.env.NODE_ENV === 'dev' ? 'http://localhost:3008' : 'http://server.baldbear.cn'
}
