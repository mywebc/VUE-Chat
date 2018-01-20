<template>
  <div class="container">
    <img src="../assets/logo.png" alt="图片显示错误">
    <i class="icon-bubbles2"></i>
    <h1>请输入你的昵称</h1>
    <input type="text" autofocus @keyup.enter="submit" ref="inputMes">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    submit() {
      var val = this.$refs.inputMes.value
      if( val !== ''){
        // 存在本地
        window.localStorage.setItem('userName', val)
          this.$router.push({
            path: '/chat'
          })
      } else {
        return
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .container
    position: absolute
    width: 100%
    height: 100%
    background-color cadetblue
    color #fff
    img
      display block
      width: 200px
      height: 200px
      margin 30px auto
    i
      font-size 30px
    h1
      font-family "Adobe 宋体 Std L"
      font-size 20px
      margin-top 10px
      margin-bottom 10px
    input
      border-bottom 1px solid #fff
      color #fff
      outline none
      background-color cadetblue
      text-align center
      letter-spacing 2px
</style>












