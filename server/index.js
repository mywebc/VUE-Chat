const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router/router')
const db = require('./models/db')

// 设置跨域
app.use(cors())
// 设置路由
app.get('./login',router.doLogin)
app.get('./regist',router.doRegist)




app.listen(3000)