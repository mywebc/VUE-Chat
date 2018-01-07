let mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/users')
let db = mongoose.connection

// 监听连接状态
db.once('open', function () {
  console.log('数据库连接成功！')
})

module.exports = db