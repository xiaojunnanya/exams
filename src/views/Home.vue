<!--
 * @Author: 肖俊男、邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-10-10 23:01:13
 * @LastEditors: 肖俊男
 * @Description: 主页面
 * @FilePath: \exams\src\views\Home.vue
 * 鲸落
-->


<template>
  <div>
    <div>
    <el-container>
      <el-header>
        <!-- 倒计时 -->
        <div class="headerleft"><van-count-down :time="time" @finish="finish"></van-count-down></div>
        <!-- 题目跳转  -->
        <!-- <router-link to="/exam/answercheck" tag="div" class="headerright">答题卡</router-link> -->
        <div @click="tofalse()" class="headerright">答题卡</div>
        </el-header>
      <!-- 答题部分 radioTest:答题的成绩传给父  timu:点击题号跳转题目  -->
      <AnswerQuestion @Id="Id" ref="question" :getTimu="Timu"></AnswerQuestion>
    </el-container>
    </div><!-- 答题卡   getGrade：将成绩radioTest传给答题卡-->
    <div v-if="!isTrue"><!-- 点击答题卡，决定check是否存在  -->
      <!-- getIdTo与Id一类，为答题的题号    getTimu timu一类,为答题卡的点击题号，在答题页面进行跳转-->
      <AnswerCheck :getIdTo="getId" @timu="timu" ref="check" style="position:fixed;z-index:10;top:0;left:0;background-color:#fff;"></AnswerCheck>
    </div>
  </div>
</template>

<script>
  import AnswerQuestion from 'components/AnswerQuestion'
  import AnswerCheck from 'components/AnswerCheck'
  export default {
    name: "Home",
    components: {
      AnswerQuestion,
      AnswerCheck
    },
    data(){
      return{
        //考试倒计时
        time:7 * 60 * 1000,
        //答题的题号，给check页面
        getId:[],
        isTrue:'true',
        //答题卡题目跳转
        Timu:'',
      }
    },
    methods:{
      finish(){
        this.$message({
          message: '答题时间结束,自动退出',
          center: true,
          type: 'warning'
        });
      },
      //答题题号
      Id(Id){
        this.getId = Id;
        // console.log(this.getId);
      },
      //答题卡跳转
      timu(timu){
        // console.log(timu);
        this.Timu = timu;
      },
      //答题页面的显示与否
      tofalse(){
        this.isTrue = !this.isTrue
      },
      jump(){
        // console.log(this.Timu);
        this.$refs.question.questionJump();
      },
      homeSub(){
        // console.log("homeSub");
        //调用答题卡页面的提交
        this.$refs.question.questionSub();
      }
    }
  };
</script>

<style scoped lang="less">
  .el-container {
    height: 100%;
    /* width:100%; */
  }

  .el-header {
    background-color: rgb(247, 11, 11);
    display: flex;
    width: 100%;
  }

  .headerleft {
    text-align: center;
    line-height: 60px;
    position: relative;
    top:40%;
    left:50%;
    transform: translate(-50%,0);
  }

  .headerright {
    width: 70px;
    // border-radius: 7px;
    // background-color: rgb(211, 34, 34);
    color: rgb(240, 218, 18);
    position: absolute;
    top: 3%;
    right: 3%;
    cursor: pointer;
    text-align: center;
  }
  .van-count-down{
    font-size: 25px;
    color: white;
    /* position: relative;
    top:50%;
    left:50%;
    transform: translate(50%,-50%); */
  }
.el-header{
  text-align: center;
}
</style>