let mongoose = require('mongoose')

// 定义schema结构
let userSchema = new mongoose.Schema({
  "username": String,
  "password": String
})

// 利用schema生成模型
let Users = mongoose.model("Users", userSchema)

// 暴露出去
module.exports = Users