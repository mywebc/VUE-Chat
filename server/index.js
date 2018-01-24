var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var axios= require('axios')
var cors=require('cors')

server.listen(3000);

// 设置跨域
app.use(cors())

// 机器人请求(青云客)
app.get("/robot",function (req,res,next) {
  var url = "http://api.qingyunke.com/api.php"
  axios.get(url,{
    params:req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})



var num=0;
//io.on来监听是否有客户端连接，emit监听事件，on发送事件
io.on('connection', function (socket) {
  num++;
  console.log(num)
  console.log("正在监听客户端的连接...")
  socket.on('chat', function (msg) {
    socket.broadcast.emit('chat', msg)
    console.log(msg)
  })
  socket.on('online', function (msg) {
    io.emit('online', msg)
    io.emit("num", num)
    console.log(msg+"已经连接")
  })
  socket.on("disconnect", function () {
    num--;
    io.emit("num", num)
    console.log("用户失去连接")
    console.log(num)
  })
});