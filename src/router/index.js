/*
 * @Author: 肖俊男、邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-10-06 21:49:58
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \exams\src\router\index.js
 * 鲸落
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:"/exam/login"
  },
  {
    path:'/exam',
    redirect:"/exam/login"
  },
  {
    path:'/exam/answerdetail',
    name:'answerdetail',
    component:() => import('components/AnswerDetail'),
  },
  {
    path:'/exam/setattribute',
    name:'setattribute',
    component:() => import("components/SetAttribute"),
  },
  {
    path:'/exam/answersituation',
    name:'answersituation',
    component: () => import('components/AnswerSituation')
  },
  {
    path: '/exam/login',
    name: 'login',
    component:()=>import("views/Login")
  },
  {
    path: '/exam/home',
    name: 'Home',
    component: () => import('views/Home')
  },
  {
    path:'/exam/attention',
    name:'attention',
    component:() => import('views/Attention')
  },
  {
    path:'/exam/end',
    name:'end',
    component:() => import('components/End')
  },
  {
    path:'/exam/teacher',
    component:() => import('views/Teacher')
  },
  {
    path:'/exam/visitor',
    component:() => import('views/Visitor')
  },
  {
    path:'/exam/preview',
    component:() => import('components/Preview')
  },
  {
    path:'/exam/temp',
    component:() => import('components/Temp')
  },
  {
    path:'/exam/luckDraw',
    component:() => import('views/luckDraw')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//   if(to.path=='/login'){
//     return next()
//   }
//   const tokensty = window.sessionStorage.getItem('token')
//   if(!tokensty){
//     return next('/login')
//   }
//   next()
// })

export default router
