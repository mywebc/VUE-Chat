import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Chat from '@/views/chat'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/chat'
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/chat',
      component: Chat
    }
  ]
})
