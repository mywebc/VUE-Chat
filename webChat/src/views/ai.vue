<template>
  <div class="container-chat">
    <!--头部-->
    <div class="chat-header">
      <div class="header-left">
        <i class="icon-users" @click="returnChat"></i>
      </div>
      <div class="header-right">
        <i class="icon-home" @click="returnBack"></i>
      </div>
    </div>
    <!--聊天区域-->
    <div class="chat-area" style="position: relative">
      <div v-for="item of msgs">
        <!--其他人的聊天-->
        <div v-if="item.other" class="chat-other">
          <div class="chat-time">
            {{item.date}}
          </div>
          <div class="chat-avatar">
            <img src="./../assets/logo.png" alt="">
            <i>{{item.loginInfo}}</i>
          </div>
          <div class="chat-msgs">
            {{item.content}}
          </div>
        </div>
        <!--自己的聊天-->
        <div class="chat-self" v-else>
          <div class="chat-time">
            {{item.date}}
          </div>
          <div class="chat-avatar">
            <img src="./../assets/logo.png" alt="">
            <i>{{item.loginInfo}}</i>
          </div>
          <div class="chat-msgs">
            {{item.content}}
          </div>
        </div>
      </div>
    </div>

    <!--尾部输入框-->
    <div class="chat-footer">
      <div class="footer-center">
        <input type="text" placeholder="请输入聊天信息" @keyup.enter="msgSubmit" ref="msg" contenteditable="true">
      </div>
      <div class="footer-right">
        <button @click="msgSubmit">发送</button>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        msgs: [{
          other: true,
          content: this.$store.state.robot,
          date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
          loginInfo: '菲菲宝宝'
        }],
        content:''
      }
    },

    methods: {
      returnBack () {
        this.$router.push({
          path: '/'
        })
      },
      returnChat() {
        this.$router.push({
          path: '/chat'
        })
      },
      msgSubmit () {
        var msg = this.$refs.msg.value
        // 判断是否为空，不为空发送给服务器
        if (msg === '') {
          return
        } else {
          this.content=msg
          this.msgs.push({
            other: false,
            content: msg,
            date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
            loginInfo: window.localStorage.getItem('userName')
          })
          // 清空输入框
          this.$refs.msg.value = ''
          // 自动滑到底部
          this.changLine()
        }
        this.axios.get(`http://chenxiaolani.com:3000/robot`,{
          params:{
            key:'free',
            appid:0,
            msg:this.content
          }
        }).then((res)=>{
          console.log(res)
          this.msgs.push({
            other: true,
            content: res.data.content,
            date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
            loginInfo: '大宝宝'
          })
        }).then(()=>{
          this.changLine()
        })
      },
      changLine () {
        // 给一个回调，等他完全渲染出来
        setTimeout(()=>{
          var content = document.querySelector('.chat-area')
          content.scrollTop = content.scrollHeight
        },20)
      }
    },
    computed: {},
    // 我们在初始化的时候读取本地名字，并且发送给服务器，告知谁上线
    mounted () {
      socket.emit('online', localStorage.getItem('userName'))
      socket.on('online', (val) => {
        if (!val) {
          return
        }
        console.log(val + '上线了！')
      })
      socket.on('chat', (msg) => {
        this.msgs.push(msg)
        this.changLine()
      })
    },
  }
</script>

<style scoped lang="stylus">

  .container-chat
    position: absolute
    top 0px
    left 0px
    width: 100%
    height: 100%
    display: flex
    display -webkit-flex
    flex-direction column

    .chat-header
      width: 100%
      background-color cadetblue
      flex 1
      display: flex
      display -webkit-flex
      font-size 24px

      .header-left
        flex 1
        align-self stretch
        display flex
        display -webkit-flex
        align-items center
        justify-content flex-start
        margin-left 15px
      .header-right
        flex 1
        align-self stretch
        display flex
        display -webkit-flex
        align-items center
        justify-content flex-end
        margin-right 15px

    .chat-area
      width: 100%
      background-color #fff
      flex 10
      overflow-x hidden
      overflow-y: auto

    .chat-other
      width: 100%
      min-height 50px
      margin 10px
      .chat-time
        color: #000
        font-size 14px
        width: 100%
        text-align center
      .chat-avatar
        img
          width: 30px
          height: 30px
          display inline-block
          border-radius 50%
          border 1px solid #ccc
          float: left
        i
          float: left
          font-size 16px
          margin-top 5px
          font-family: "Microsoft YaHei"
      .chat-msgs
        border: 1px solid #ccc
        line-height 30px
        font-size 16px
        background-color #eee
        width: 60%
        border-radius 10px
        text-align start
        clear both
        white-space normal
        word-break break-all
        padding-left 5px
    .chat-self
      width: 100%
      min-height 50px
      margin -10px
      margin-top 10px
      overflow: hidden
      margin-bottom 10px

      .chat-time
        color: #000
        font-size 14px
        width: 100%
        text-align center
      .chat-avatar
        img
          width: 30px
          height: 30px
          display inline-block
          border-radius 50%
          border 1px solid #000
          float: right
        i
          float: right
          font-size 16px
          margin-top 5px
      .chat-msgs
        border: 1px solid #000
        line-height 30px
        font-size 16px
        background-color #fff
        width: 60%
        border-radius 10px
        text-align start
        clear both
        white-space normal
        word-break break-all
        padding-left 5px
        float: right

    .chat-footer
      width: 100%
      background-color cadetblue
      flex 1
      display: flex
      display -webkit-flex
      .emoji
        width: 100%
        position: absolute
        left 0px
        bottom 55px
        border: 1px solid #000
        background-color #eee
        ul
          display block
          margin 0 auto
          li
            list-style none
            float left
            width 20px
            border 1px solid #000
            padding 5px

      .footer-center
        float: left
        width: 80%
        height: 100%
        input
          width: 100%
          height: 60%
          margin-top 10px
          border none
          padding-left 2px
      .footer-right
        float: left
        width: 20%
        height: 100%
        button
          background-color dodgerblue
          color #fff
          border none
          width 100%
          height 65%
          margin-top 10px
          font-size 14px
</style>












