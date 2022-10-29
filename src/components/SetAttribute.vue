<template>
  <div class="setAttribute">
    <div class="returnPreview">
      <el-page-header @back="backPreview" content="发布试卷">
      </el-page-header>
    </div>
    <div class="setAttribution">
      <div class="wrapper">
        <el-form label-width="80px" :model="form" :rules="rules" ref="form">
          <el-form-item label="试卷名称" prop="paper_name">
            <el-input v-model="form.paper_name"></el-input>
          </el-form-item>
          <el-form-item label="题序随机">
            <el-switch v-model="form.random"></el-switch>
          </el-form-item>
          <el-form-item label="发布学院" prop="type">
            <el-select v-model="form.type" multiple placeholder="请选择学院" filterable prop="type">
              <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          
        </el-form>
        <el-button type="primary" @click="onSubmit()" class="onsubmit">发布</el-button>
      </div>
    </div>
 </div>
</template>

<script>
import "../assets/js/flexible.js"
export default {
  name: 'SetAttribute',
  data(){
    return{
      options:['信息工程学院','研究生学院','水资源与环境学院','宝石与材料工艺学院','经贸学院',
      '商学院','法政学院','外国语教学部','继续教育学院','体育部','影视艺术学院','资源学院',
      '勘查技术与工程学院','会计学院','管理科学与工程学院','艺术设计系','数理教学部','职业技术学院',
      '社会科学部','访客'],
      form:{
        paper_name:'',
        random:false,
        type:[],
        paper_id:-99
      },
      rules:{
        // 表单判断规则
        paper_name: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在2--15字符', trigger: 'blur' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个学院', trigger: 'change' }
        ],
      }
    }
  },
  methods:{
    backPreview(){
      this.$router.push("/exam/preview")
    },
    getData(){
      // 接受组件传过来的参数并且赋值
      // 注意是 $route 不是 $router
      this.form.paper_id = parseInt(this.$route.query.id);
    },
    // 发布试卷
    onSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('你确定发布试卷吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 点击确定
            // console.log(this.form);
            this.$axios({
              method:"post",
              url:"/paper/public_paper",
              data:this.form,
              headers:{
                token: sessionStorage.getItem('token')
              }
            }).then((res) => {
              // console.log(res);
              this.$message({
                type: 'success',
                message: '发布成功'
              });
              this.$router.push({
                        path:'/exam/temp',
                    })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消发布'
            });          
          });
        } else {
          return false;
        }
      })
    }
  },
  mounted(){
    this.getData();
  }
 }
</script>
<style lang="less">
@media screen and (max-width: 500px) {
  .el-message-box{
    width: 290px !important;
    
  }
  .el-message--info {
    min-width: 290px !important;
  }
  .el-message--success {
    min-width: 290px !important;
  }
}
</style>
<style lang='less' scoped>
.setAttribution {
  padding: 20px;
  .wrapper {
    padding: 10px;
    .onsubmit{
      margin-top: 40px;
      width: 100%;
    }
  }
}

// 移动适配
@media only screen and (max-width: 720px) {
  
  .setAttribute{
      font-size: 0.4167rem;
      .returnPreview {
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
          border-bottom: 1px solid rgba(238, 238, 238);
      }
  }
}
// 电脑适配
@media only screen and (min-width: 720px) {
    .setAttribute {
        .returnPreview {
            padding: .1783rem 0rem .1783rem .1422rem;
            /deep/ .el-page-header__title {
                font-size: .1867rem;
            }
            /deep/ .el-page-header__content {
                font-size: .225rem;
            }
            border-bottom: 1px solid rgba(238, 238, 238);
        }
    }
}
</style>
