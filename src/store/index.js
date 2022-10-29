/*
 * @Author: 肖俊男
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-02-20 18:14:52
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \exams\src\store\index.js
 * 鲸落
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    result:[],
    questionNumber:'',
    examId:''
  },
  mutations: {
    setResult(state,result){
          state.result = result  //设置仓库中的值为服务器传过来的值
    },
    setExamId(state,examId){
      state.examId = examId
    },
    setQuestionNumber(state,questionNumber){
      state.questionNumber = questionNumber
    }
  },
  getters: {
    getResult:(state)=>{
      return state.result
    },
    getQuestionNumber:(state)=>{
      return state.questionNumber
    },
    getExamId:(state)=>{
      return state.examId
    }
  },
  actions: {
  },
  modules: {
  }
//   modules: {
//     result
// },
})
