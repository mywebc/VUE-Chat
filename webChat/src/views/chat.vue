<template>
  <transition name="chat">
    <div class="container-chat">
      <!--头部-->
      <div class="chat-header">
        <div class="header-left">
          <i class="icon-sphere" @click="returnAI"></i>
        </div>
        <div class="header-center">
          <i class="icon-users"></i>
        </div>
        <div class="header-right">
          <i class="icon-home" @click="returnBack"></i>
        </div>
      </div>
      <!--聊天区域-->
      <div class="chat-area" style="position: relative">
        <div class="num">当前在线人数:{{this.num}}</div>
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
        <!--表情包-->
        <transition name="fade">
          <div class="emoji" v-if="isEmoji">
            <ul>
              <li @click="chooseMeoji(item)" v-for="(item, index) of emojis">{{item}}</li>
            </ul>
          </div>
        </transition>
        <div class="footer-left">
          <i class="icon-smile" @click="showEmoji"></i>
        </div>
        <div class="footer-center">
          <input type="text" placeholder="请输入聊天信息" @keyup.enter="msgSubmit" ref="msg" contenteditable="true">
        </div>
        <div class="footer-right">
          <button @click="msgSubmit">发送</button>
        </div>
      </div>

    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        msgs: [],
        emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷',
          '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️',
          '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
        isEmoji: false,
        num: 0
      }
    },

    methods: {
      returnBack () {
        this.$router.push({
          path: '/'
        })
      },
      returnAI () {
        this.$router.push({
          path: '/ai'
        })
      },
      msgSubmit () {
        var msg = this.$refs.msg.value
        // 判断是否为空，不为空发送给服务器
        if (msg === '') {
          return
        } else {
          if (this.isEmoji) {
            this.isEmoji = false
          }
          socket.emit('chat', {
            other: true,
            content: msg,
            date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
            loginInfo: window.localStorage.getItem('userName')
          })
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
      },
      showEmoji () {
        this.isEmoji = !this.isEmoji
      },
      chooseMeoji (str) {
        var text = this.$refs.msg
        var str = str + ''
//        text.value=this.emojis[index]
        //IE浏览器
        if (document.selection) {
          let sel = document.selection.createRange()
          sel.text = str
        }
        // 火狐
        else if (text.selectionStart || text.selectionStart === '0') {
          var startPos = text.selectionStart
          var endPos = text.selectionEnd
          text.value = text.value.substring(0, startPos) + str + text.value.substring(endPos, text.value.length)
        }
        else {
          text.value += str
          text.focus()
        }

      },
      changLine () {
        // 给一个回调，等他完全渲染出来
        setTimeout(() => {
          var content = document.querySelector('.chat-area')
          content.scrollTop = content.scrollHeight
        }, 20)
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
      socket.on('num', (num) => {
        this.num = num
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
      .header-center
        flex 1
        align-self stretch
        display flex
        display -webkit-flex
        align-items center
        justify-content center
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
    .num
      width: 100%
      height: 50px
      text-align center
      margin-top 5px
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
          border 1px solid #ccc
          float: right
        i
          float: right
          font-size 16px
          margin-top 5px
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
        float: right

    .chat-footer
      width: 100%
      background-color cadetblue
      flex 1
      display: flex
      display -webkit-flex
      .fade-enter-active, .fade-leave-active {
        transition: all .2s ease;
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
      {
        transform: translateY(130px);
        opacity: 0;
      }
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

      .footer-left
        float: left
        width: 10%
        height: 100%
        font-size 33px
        line-height 10px
        i
          display block
          margin-top 10px
      .footer-center
        float: left
        width: 70%
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
  .chat-enter-active, .chat-leave-active {
    transition: all .2s ease;
  }
  .chat-enter, .chat-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    transform: translateX(-300px);
    opacity: 0;
  }
</style>












