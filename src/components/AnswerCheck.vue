<!--
 * @Author: 肖俊男、邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-03-05 08:52:30
 * @LastEditors: 肖俊男
 * @Description: 答题卡
 * @FilePath: \exams\src\components\AnswerCheck.vue
 * 鲸落
-->


<template>
  <div class="answercheck">
    <header>
      <div id="closed" @click="backanswer">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div id="title">答题卡</div>
    </header>
    <main>
      <el-row>
        <el-button v-for="(item,index) in questionNumber" :key="index" circle @click="getTimu(item)" :class="{tored:getIdTo[item] != undefined}" >{{item}}</el-button>
      </el-row>
      
    </main>
    <footer @click="checkSub()">提交</footer>
  </div>
</template>

<script>
export default {
  name: "AnswerCheck",
  data () {
    return {
      //答题卡跳转
      questionListNumber:'',
      //答题题号
      IdList:[],
      //题量
      questionNumber:''
    }
  },
  methods: {
    backanswer() {
      // this.$router.push('/exam/home');
      this.$parent.tofalse()
    },
    getTimu(item){
      // console.log(item);
      this.questionListNumber = item
      this.$parent.tofalse()
      this.$emit('timu',this.questionListNumber)
      //调用home里的函数来调用答题页面的函数实现跳转
      this.$parent.jump()
    },
    checkSub(){
      // console.log("sss");
      //通过调用父组件home的函数来调用答题页面的提交
      this.$parent.homeSub()
    }
  },
  created () {
    // console.log(this.getIdTo);
  },
  mounted () {
    // console.log(typeof(this.$store.getters.getQuestionNumber));
    // console.log(typeof(window.sessionStorage.getItem('question_number')));
    var questionNumber = Number(window.sessionStorage.getItem('question_number'))
    this.questionNumber = questionNumber
  },
  //getGrade答题情况
  props:["getIdTo"],
};
</script>

<style lang='less' scoped>
.answercheck {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
header {
  display: flex;
  height: 60px;
  background-color: rgb(247, 11, 11);
  color: yellow;
}
#closed {
  line-height: 60px;
  width: 3rem;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}
#title {
  flex: 1;
  line-height: 60px;
  font-size: 14px;
  text-align: center;
}
main {
  flex: 1;
}
footer {
  height: 60px;
  line-height: 60px;
  width: 100%;
  bottom: 0;
  text-align: center;
  font-size: 14px;  
  background-color: rgb(247, 11, 11);
  color: yellow;
}
.el-row{
  display: inline-block;
}
.el-row .el-button{
  width: 51px;
  margin: 10px;
  font-size: 25px;
  // padding: 12px 20px 11px 19px;
  // color: black;
}
.tored{
  background-color: red;
}
</style>