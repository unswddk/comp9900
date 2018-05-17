import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/mainPage'
import userProtfile from '@/components/userProtfile'
import changePwd from '@/components/changePwd'
import tradeBoard from "@/components/trading"
import coinsInfoCard from "@/components/coinsInfoCard"
// import userProtfile from "@/components/userProtfile"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // children: [
      //   {
      //     path: '/protflie',
      //     component: UserProtfile,
      //     meta : {
      //       requireAuth: true, 
      //     },
      //   },
      // ],
    },
    {
      path: '/changePwd/:id',
      name: 'changePwd',
      component: changePwd,
    },{
      path:'/trading',
      name:'tradeBoard',
      component:tradeBoard,
    },{
      path:'/stocks',
      name:'stocks',
      component:coinsInfoCard
    }
    ,{
      path:'/portflio',
      name:'portflio',
      component:userProtfile
    }
  ]
})
