<template>
  <div class="container-chat">
    <!--头部-->
    <div class="chat-header">
      <div class="header-left">
        <i class="icon-sphere"></i>
      </div>
      <div class="header-center">
        <i class="icon-users"></i>
      </div>
      <div class="header-right">
        <i class="icon-home"></i>
      </div>
    </div>
    <!--聊天区域-->
    <div class="chat-area">

    </div>
    <!--尾部输入框-->
    <div class="chat-footer">
      <div class="footer-left">
        <i class="icon-smile"></i>
      </div>
      <div class="footer-center">
        <input type="text" placeholder="请输入聊天信息">
      </div>
      <div class="footer-right">
        <button>发送</button>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {

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
      background-color goldenrod
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
      background-color green
      display: flex
      display -webkit-flex
      flex 10

    .chat-footer
      width: 100%
      background-color goldenrod
      flex 1
      display: flex
      display -webkit-flex
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












