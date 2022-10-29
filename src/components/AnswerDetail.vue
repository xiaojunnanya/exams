
<template>
 <div class="AnswerDetailWrap" v-loading="loading">
    <div class="returnSituation">
      <el-page-header @back="backSituation" content="答题详情">
      </el-page-header>
    </div>
    <el-descriptions :title="ansDetail.name" direction="vertical" :column="4" border class="stuInfoWrap">
      <el-descriptions-item label="得分" :span="1">{{ansDetail.score }}</el-descriptions-item>
      <el-descriptions-item label="学号" :span="3">{{ansDetail.student_id}}</el-descriptions-item>
      <el-descriptions-item label="情况" :span="1">
        <el-tag :type="examStatusTag">{{ examStatus}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="错题号" :span="3">
        <span v-for="(item, index) in wrong" :key="index">{{item}}、</span>
      </el-descriptions-item>
      <el-descriptions-item :label="ansDetail.question_list[index]" :span="4" v-for="(item, index) in ansDetail.answer_list" :key="index">
        <span> {{item}}</span>
      </el-descriptions-item>
    </el-descriptions>

 </div>
</template>

<script>
import "../assets/js/flexible";
export default {
  name: 'AnswerDetail',
  data() {
    return{
      loading:false,
      activeData:[],
      ansDetail:[],
      wrong:[],
      examStatusTag:"",
      examStatus:"未完成"
    }
  },
  mounted() {
    // 获取AnswerSituation传过来的学生答题详细数据
    this.getData();
  },
  methods:{
    backSituation() {
      this.$router.push("/exam/answersituation");
    },
    getData(){
      // 接受组件传过来的参数并且赋值
      // 注意是 $route 不是 $router
      this.activeData = this.$route.query;
      // 获取这个学生详细答题信息
      this.$axios({
        method:"post",
        url:"/exam/get_exam_info",
        headers:{
          token: sessionStorage.getItem('token')
        },
        data:{
          id:parseInt(this.activeData.id)
        },
      }).then((res) => {
          // console.log(res);
          this.ansDetail = res.data.result;
          if(this.ansDetail.end_exam == 0) {
            this.examStatusTag = "info";
          }else {
            this.examStatusTag = "success";
            this.examStatus = "已完成";
            this.addWrong();
          }
          // console.log(this.ansDetail);
          this.loading = false;
      })
    },
    // 获取错题号
    addWrong(){
      for(let i = 0; i < this.ansDetail.true_false_list.length; i++)
      { 
        let j = 0;
        //  == 0 代表该题是错的
        if(this.ansDetail.true_false_list[i] == 0)
        {
          this.wrong.push(i + 1);
        }
      }
    }
  }
 }
</script>

<style lang='less' scoped>
.AnswerDetailWrap{
  display: flex;
  flex-direction: column;
  .stuInfo{
      width: 80%;
      padding-top: 23px;
      padding-bottom: 23px;
      margin: 0 auto;
      .wrapper{
        overflow-y: auto;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        background: linear-gradient(to bottom, #88cfff,#bbecff);
        .name_wrap {
          border-radius: 10px;
          padding-top: 20px;
          width: 60%;
          margin: 0 auto;
          text-align: center;
          padding-bottom: 20px;
          background: linear-gradient(to bottom, #fdbe5f,#ffc9a9);
        }
        .main {
          margin: 10px;
          display: flex;
          flex-direction: column;
          .detailInfo {
            display: flex;
            flex-wrap: wrap;
            border-bottom: 1px solid rgba(128, 128, 128, 0.549);
            margin-top: 10px;
            margin-bottom: 10px;
            padding-bottom: 10px;
            align-items: center;
            .title {
              color: grey;
            }
          }
          .briefWrap {
            .title {
              color: grey;
              margin-bottom: 10px;
            }
            .briefans {
              border-bottom: 1px solid rgba(128, 128, 128, 0.549);
              margin-bottom: 10px;
              .brieftitle {
                color: grey;
              }
              .stuAns {
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
  /deep/ .el-descriptions__title {
    margin: 10px;
  }
  /deep/ .el-descriptions__header {
    margin-bottom: 0px;
  }
}
// 移动端
@media only screen and (max-width: 720px) {
  .AnswerDetailWrap{
    .returnSituation{
      padding: 0.3125rem;
      border-bottom: 1px solid rgba(238, 238, 238);
      /deep/ .el-page-header__title{
        font-size: 0.3125rem;
      }
      /deep/ .el-icon-back {
        font-size: 0.3125rem;
      }
      /deep/ .el-page-header__content {
        font-size: 0.7008rem;
      }
    }
    .stuInfo {
      .wrapper{
        .name_wrap{
          .stuName{
            font-size: .4604rem;
          }
        }
      }
    }
  }
}
// pc端
@media only screen and (min-width: 720px) {
  .AnswerDetailWrap{
    .returnSituation {
      padding: .1783rem 0rem .1783rem .1422rem;
      /deep/ .el-page-header__title {
        font-size: .1867rem;
      }
      /deep/ .el-page-header__content {
        font-size: .225rem;
      }
      border-bottom: 1px solid rgba(238, 238, 238);
    }
    .stuInfo {
      .wrapper{
        .name_wrap{
          .stuName{
            font-size: 0.5604rem;
          }
        }
      }
    }
  }
}
</style>