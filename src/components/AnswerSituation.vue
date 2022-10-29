<template>
  <div class="answerSituationWrap" v-loading="loading">
    <div class="returnAttention">
      <el-page-header @back="backAttention" content="答题详情">
      </el-page-header>
    </div>
    <div class="answerSituation">
      <el-container style="height: 500px; border: 1px solid #eee">
        <!-- 左边导航 -->
        <el-aside style="background-color: rgb(238, 241, 246)">
          <el-menu >
              <div class="title">
                <i class="el-icon-tickets"></i>
                试卷类型
              </div>
              <el-menu-item-group v-for="(item, index) in paperData" :key="index">
                <el-menu-item @click="getStuInfo(item.id)">{{item.paper_name}}</el-menu-item>
              </el-menu-item-group>
          </el-menu>
        </el-aside>
        <!-- 右边内容 -->
        <el-container>
          <el-main>
            <el-table :data="activeData" height="500" @row-click="ansDetail">
              <el-table-column prop="student_id" label="学号" >
              </el-table-column>
              <el-table-column prop="name"  label="姓名">
              </el-table-column>
              <el-table-column prop="score"  label="成绩">
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer>
            <el-button type="primary" v-if="find" @click="submit()">导出该试卷数据</el-button>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import "../assets/js/flexible";
export default {
  name: "AnswerSituation",
  data(){
    return{
      activeData:[],
      paperData:[],
      loading:true,
      activePaperId:-1,
      find:false
    }
  },
  methods: {
    // 返回主页面
    backAttention() {
      this.$router.push("/exam/teacher");
    },

    // 点击后筛选数据,展示
    getStuInfo(id) {
      // 获取该卷子下所有学生答题情况
      this.$axios({
        method:"post",
        url:"/exam/get_student_list",
        headers:{
          token: sessionStorage.getItem('token')
        },
        data:{
          id
        },
      }).then((res) => {
          this.activeData = res.data.result;
          this.activePaperId = id;
          if(this.activePaperId>=0){
            this.find = true
          }
      })
    },
    // 展示学生详细情况, element 自带的event参数,把点击的行对应的对象传过来
    ansDetail(event){
      this.$router.push({
        path:'/exam/answerdetail',
        query:event
      })
    },
    // 获取试卷种类列表
    getPaperList(){
      this.$axios({
        methods:"get",
        url:"/paper/get_paper_list",
        headers:{
          token: sessionStorage.getItem('token')
        }
      }).then((res) => {
          this.paperData = res.data.result.reverse();
          this.loading = false
      })
    },
    submit(){
      // console.log("dwesafsd");
      // console.log(this.activePaperId);
      this.$axios({
        method:"post",
        url:"/paper/out_data",
        data:{
          paper_id:this.activePaperId
        },
        headers:{
          token: sessionStorage.getItem('token')
        },
        responseType:"blob"
      }).then((response)=>{

          // console.log(response)
          const filename = decodeURI(response.headers['content-disposition'].split(';')[1].split('=')[1]);
          let blob = new Blob([response.data],{
            type: response.headers['content-type']
          });
          var blobURL = window.URL.createObjectURL(blob)
          var tempLink = document.createElement('a')
          tempLink.style.display = 'none'
          tempLink.href = blobURL
          tempLink.setAttribute('download', filename)
          if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank')
          }
          document.body.appendChild(tempLink)
          tempLink.click()
          document.body.removeChild(tempLink)
          window.URL.revokeObjectURL(blobURL)

      }).catch((res)=>{
        // console.log(res);
      })
    }
  },
  created(){
    this.getPaperList();
  }
};
</script>

<style lang='less' scoped>
.el-footer{
    text-align: center;
}
.title {
  margin-left: 10px;
  margin-top: 10px;
}
// 移动端
@media only screen and (max-width: 720px) {
  .answerSituationWrap {
    font-size: 0.4167rem;
    .returnAttention {
      padding: 0.3125rem;
      
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
    .answerSituation {
      /deep/ .el-aside{
        width: 3.5417rem !important;
        border-right:1px solid rgba(180, 180, 180, 0.6);
        overflow-y: auto;
        .el-menu {
          width: 3.5417rem !important;
          overflow-y: scroll !important;
          .el-menu-item{
            text-align: center;
            overflow-y: hidden;
            overflow-x: scroll;
            border-bottom: 1px solid rgba(180, 180, 180, 0.6);
          }
        }
      }
    }
  }
}
// pc端
@media only screen and (min-width: 720px) {
  .answerSituationWrap {
    .returnAttention {
      margin: .1783rem 0rem .1783rem .1422rem;
      /deep/ .el-page-header__title {
        font-size: .1867rem;
      }
      /deep/ .el-page-header__content {
        font-size: .225rem;
      }
    }
    .answerSituation {
      /deep/ .el-aside {
        width: 2.3417rem !important;
        overflow: hidden;
        .el-menu {
          height: 500px;
          overflow: auto;
        }
      }
    }
  }
}
</style>
