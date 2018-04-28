import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/mainPage'
import UserProtfile from '@/components/userProtfile'
import changePwd from '@/components/changePwd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: 'protflie',
          component: UserProtfile,
          meta : {
            requireAuth: true, 
          },
        },
      ],
    },
    {
      path: '/changePwd/:id',
      name: 'changePwd',
      component: changePwd,
    }
  ]
})
