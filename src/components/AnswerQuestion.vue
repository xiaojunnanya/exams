<!--
 * @Author: 邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-02-25 10:31:08
 * @LastEditors: 肖俊男
 * @Description: 答题页面
 * @FilePath: \exams\src\components\AnswerQuestion.vue
 * 鲸落
-->


<template>
  <div class="answer-question-wrap">
    <div class="answer-question" v-loading="isLoading">
      <ul>
        <div class="question-content" v-if="result.type == 0">
          <!-- 单选题目 -->
          <div class="q-title">{{ this.page.id + 1 }}.{{ result.stem }}</div>
          <!-- 单选选项 -->
          <van-radio-group v-for="(chosen, index) in result.chose" :key="index" v-model="answers.answerAll[page.id]" class="answers">
            <van-radio :name="index" @click="getId()">{{ chosen }}</van-radio>
          </van-radio-group>
          <!-- 上下题目切换 -->
          <!-- <el-footer>
            <el-button type="primary" icon="el-icon-arrow-left" @click="firstQusetion">上一题</el-button>
            <el-button type="primary" @click="Next">{{nextQuestion}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-footer> -->
        </div>

        <!-- 多选 -->
        <div class="question-content" v-else-if="result.type == 1">
          <!-- 多选题目 -->
          <div class="q-title">{{ this.page.id + 1 }}.{{ result.stem }}</div>
          <!-- 多选选项 -->
          <van-checkbox-group v-for="(chosen, index) in result.chose" :key="index" v-model="answers.answerAll[page.id]" class="answers">
            <van-checkbox :name="index" @click="getId()">{{ chosen }}</van-checkbox>
          </van-checkbox-group>
        </div>

        <!-- 简答！！！ -->
        <div class="question-content" v-else-if="result.type == 2">
          <div class="simple_answer_stem q-title"> {{ this.page.id + 1 }}.{{ result.stem }}</div>
          <van-field  v-model="answers.answersField[page.id]" rows="2" autosize type="textarea" placeholder="请输入答案" class="simple_answer_wrap" @blur="shortId"/>
          <!-- 上下题目切换 -->
          <!-- <el-footer>
            <el-button type="primary" icon="el-icon-arrow-left" @click="firstQusetion">上一题</el-button>
            <el-button type="primary" @click="Next">{{nextQuestion}}<i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-footer> -->
        </div>
      </ul>
    </div>
    <!-- 上下题目切换 -->
    <el-footer
      v-loading="isLoading"
      element-loading-text=" "
      element-loading-spinner=" "
      element-loading-background="rgba(198, 9, 9, 0.65)">
      <el-button type="primary" icon="el-icon-arrow-left" @click="firstQusetion">上一题</el-button>
      <el-button type="primary" @click="Next">{{nextQuestion}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-footer>
  </div>
</template>

<script>

export default {
  name: "AnswerQuestion",
  data() {
    return {
      // 页码
      page: {
        id: 0,
      },
      isLoading:'ture',
      //请求返回的题目与选项
      result:'',
      nextQuestion:"下一题",
      //与答题卡进行交互的题号
      Id:[],
      //用来区分考试卷的，试卷id
      examId:'',
      //题量
      question_number:'',
      // 答题者答案
      answers: {
        // 答案
        answerAll: [],
        // // 填空
        // answerscCheckbox:[],
        // // 答题者给出的简答题
        answersField: [],
      },
    };
  },
  mounted () {   
    //console.log(window.sessionStorage.getItem('exam_id'));
    var examId = window.sessionStorage.getItem('exam_id')
    this.examId = examId
    this.question_number = window.sessionStorage.getItem('question_number')
    this.getOneQuestion()
  },
  props:['getTimu'],
  methods: {
    // 获取题目
    getOneQuestion() {
      // console.log(this.getTimu);
      // console.log(this.question_number);
      // console.log(this.page.id);

      if(this.page.id+1 == this.question_number){
        this.nextQuestion = "提交";
      }else if(this.getTimu == this.page.id+1 ){
        this.nextQuestion = "下一题";
      }
      this.isLoading = true
      // console.log(this.page.id);
      this.$axios({
          method:"post",
          url:"/exam/get_question",
          data:{
                  question_id:this.page.id,
                  exam_id:this.examId,
              },
          headers:{
              token: sessionStorage.getItem('token')
          },
      }).then((res) => {
          // console.log(res.data.result);
          this.result = res.data.result
          // console.log(res.data.result.question_number);
          this.question_number = res.data.result.question_number
          this.isLoading = false
      })
    },
    //多选单选传题号
    getId(){
      // console.log(this.page.id+1); 
      this.Id[this.page.id+1]  = this.page.id+1
      // console.log(this.Id);
      //将题号传给home页面
      this.$emit('Id',this.Id)
      // JSON.stringify('this.Id')
    },
    //简答传题号
    shortId(e){
      // console.log(e);
      // console.log(e.path[0]._value);
      if(e.path[0]._value != ""){
        // console.log(this.page.id+1); 
      // console.log(this.$refs.Radio.value+"题目里面的");
      this.Id[this.page.id+1]  = this.page.id+1
      // console.log(this.Id);
      this.$emit('Id',this.Id)
      }

      if(e.path[0]._value == ""){
          this.Id[this.page.id+1]  = undefined
        // console.log(this.Id);
        this.$emit('Id',this.Id)
      }
    },
    refreshNextText(){
      if(this.page.id+2 >= this.question_number){
        this.nextQuestion = "提交";
      }else{
         this.nextQuestion = "下一题";
      }
    },
    //下一题
    Next() {
      // console.log(this);
      // console.log(this.answers.answerAll);
      // console.log(JSON.stringify(this.answers.answerAll));
      //最后一题将“下一题“改为”提交“
      // console.log(this.page.id+2);
      this. refreshNextText()
        
      //提交答案
      if(this.page.id ==  this.question_number-1){
        this.questionSub()
      }else {
        this.page.id+=1;
        this.getOneQuestion()
      } 
    },
    questionJump(){
      setTimeout(()=>{
        
        if(this.getTimu){
          this.page.id = this.getTimu-1
          // console.log("题号"+this.getTimu);
          // console.log("this.page.id"+this.page.id);

          // console.log(typeof this.answers.answerAll);
         
          this.getOneQuestion()
        }
      },5)  
    },
    //被答题卷页面调用的提交
    questionSub(){

      // console.log(this.answers.answerAll);
      // var abc = this.answers.answerAll
      // console.log(this.answers.answersField);
      // var b = this.answers.answersField
      for(var a = 0;a<=this.answers.answersField.length;a++){
        if(this.answers.answersField[a] !=undefined){
          this.answers.answerAll[a] = this.answers.answersField[a];
        }
      }
      // console.log(JSON.stringify(abc));
      if(this.accomplish()){
          this.$dialog.confirm({
                title: '提示',
                message: '是否确定提交答案，提交后将无法更改并且自动退出答题',
              }).then(()=>{
                  
                   var answerList = JSON.stringify(this.answers.answerAll)
                  answerList =  eval('(' + answerList + ')')
                  // console.log(answerList); `
                  //examId是string类型，转为int（number）
                  var examId = Number(this.examId)
                  this.$axios({
                    method:"post",
                    url:"/exam/submit_answer",
                    data:{
                      exam_id:examId,
                      answer_list:answerList
                    },
                    headers:{
                        token: sessionStorage.getItem('token')
                    },
                  }).then((res)=>{
                    // console.log(res);
                    if(res.data.msg == "成功"){
                      // console.log(res.data.result);
                      window.sessionStorage.setItem('endResult',res.data.result)
                      this.$router.replace('/exam/end')
                    }
                    else{
                      this.$message.error(res.data.msg)
                    }
                    // console.log(res.);
                    // this.$router.push('/exam/end')
                  })
              })
      }
      else{
        this.$dialog.alert({
            title: '提示',
            message: '您尚未完成答题，请返回答题',
          }).then(() => {});
      }
    },
    //第一题
    firstQusetion() {
      if (this.page.id == 0) {
              this.$dialog.alert({
              title: '提示',
              message: '当前已经是第一题',
            }).then(() => {
            });
        // alert("当前已经是第一题");
      } else {
        this.page.id--;
        this.getOneQuestion();
        this.nextQuestion = "下一题";
      }
    },
    // 判断是否都答题完，都答题完，返回true，否则，返回false
    accomplish() {
      var answerListll = JSON.stringify(this.answers.answerAll)
      answerListll =  eval('(' + answerListll + ')')
      // console.log("answerListll", answerListll);
      // console.log(answerList.length);
      // console.log(this.question_number);
      // for(var i = 0; i < answerListll.length; i++){
      //   if((answerListll.length == this.question_number)&&(answerListll[i] != null)) {
      //     return true;
      //   }
      //   else{
      //     return false;
      //   }
      // }
      // console.log("indexOf", answerListll.indexOf(null))
      if(answerListll.length>0) {
        if(answerListll.indexOf(null) >= 0) {
          return false
        } else {
          return true
        }
      }
      // return false;
    }
  },
};
</script>

<style lang='less' scoped>
.van-radio{
  padding: 10px 0px;
}
answer-question-wrap {
  height: 100%;
  position: relative;
}
.simple_answer_wrap {
  position: relative;
  height: 300px;
  margin-top: 15px;
  border: 1px solid #333;
  overflow: hidden;
}
.q-title {
  font-weight: bold;
  font-size: 17px;
}
.van-answers {
  padding-top: 3px;
  font-size: 15px;
}
.question-content{
  padding: 0px 5px;
}
.van-checkbox {
  padding: 10px 0px;
}
.el-footer {
  background-color: rgb(247, 11, 11);
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.el-button {
  flex: 1;
  border: none;
  background-color: rgb(247, 11, 11);
  color: rgb(248, 204, 6);
  font-size: 16px;
  font-weight: 800;
}
.answer-question {
  padding: 15px 10px 15px 20px;
  height: 100%;
  background-color: white;
  // padding: 6px;
}
.answers {
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 8px;
}
.blanks-style {
  display: inline-block;
  padding-top: 12px;
  font-size: 16px;
}
.blanks-style input {
    display: inline-block;
    width: 50px;
    height: 22px;
    margin-right: 5px;
    font-size: 13px;
  }

.van-answers {
  padding-top: 10px;
}
.el-message-box{
  width:100%;
  margin-top: 50%;
}
.van-field__word-limit {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>