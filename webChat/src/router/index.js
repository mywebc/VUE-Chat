import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Chat from '@/views/chat'
import Ai from '@/views/ai'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/'
    // },
    {
      path: '/',
      component: Index
    },
    {
      path: '/chat',
      component: Chat
    },
    {
      path: '/ai',
      component: Ai
    }
  ]
})
