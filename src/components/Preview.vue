<!--
 * @Author: 肖俊男
 * @Date: 2022-02-14 15:58:28
 * @LastEditTime: 2022-10-04 21:05:00
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \exams\src\components\Preview.vue
 * 鲸落
-->
<template>
    <div class="preview">
        <div class="returnTeacher">
            <el-page-header @back="backTemp" content="试卷预览">
            </el-page-header>
        </div>
        <div class="showPaper">
            <el-descriptions title="" direction="vertical" :column="4" border>
                <el-descriptions-item :label="serverDatas[index].stem" :span="4" v-for="(item, index) in serverDatas" :key="index">
                   <!-- 单选 -->
                   <div v-if="item.type == 0">
                       <div v-for="(options, index) in item.options" :key="index">
                            <span>
                                {{index + 1}}.{{options}} <br>
                            </span>
                        </div>
                        <div>
                            答案：<span v-for="(optionAnswer, index) in item.answer" :key="index">{{optionAnswer + 1}}</span>
                        </div>
                   </div>
                   <!-- 多选 -->
                   <div v-else-if="item.type == 1">
                       <div v-for="(options, index) in item.options" :key="index">
                            <span>
                                {{index + 1}}.{{options}} <br>
                            </span>
                        </div>
                        <div>
                            答案：<span v-for="(optionAnswer, index) in item.answer" :key="index">{{optionAnswer + 1}}、</span>
                        </div>
                   </div>
                   <!-- 简答 -->
                   <div v-else-if="item.type == 2">
                        <span>
                            答案：{{item.answer}}
                        </span>
                   </div>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <el-button type="primary" class="submitPaper" @click="submitPaper" v-if="disappear === 0 ">发布试卷</el-button>
        <el-button type="danger" class="submitPaper" @click="submitPaper" v-else-if="disappear === 1 ">结束</el-button>
        <el-button type="warning" class="submitPaper" v-else-if="disappear === 2" disabled>已结束</el-button>
    </div>
</template>

<script>
import "../assets/js/flexible.js";
export default {
  data() {
    return {
      result: [],
      serverDatas: [],
      paper_id: -1,
      loading: false,
      disappear: -1,
    };
  },
  methods: {
    // 获取试卷信息，并赋值serverDatas
    load() {
      if (sessionStorage.getItem("result")) {
        this.result = JSON.parse(sessionStorage.getItem("result"));
        this.paper_id = this.result.paper_id;
        this.serverDatas = this.result.question_list;
        this.disappear = parseInt(sessionStorage.getItem("disappear"));
      }
      if (this.result.length == 0) {
        this.$message("请先上传试卷");
        this.$router.push("/exam/teacher");
      }
    },
    backTemp() {
      this.$router.push("/exam/temp");
    },
    submitPaper() {
      if (this.disappear === 0) {
        // 把试卷信息一起传到另一个组件
        this.$router.push({
          path: "/exam/setattribute",
          query: {
            id: this.paper_id,
          },
        });
      } else if (this.disappear === 1) {
        // 结束试卷
        // console.log("结试卷");
        this.$confirm("你确定结束试卷吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            // 点击确定
            this.$axios({
              method: "post",
              url: "/paper/end_exam",
              data: {
                paper_id: this.paper_id,
              },
              headers: {
                token: sessionStorage.getItem("token"),
              },
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                    type: "success",
                    message: "结束成功!",
                    });
                    this.$router.push({
                    path: "/exam/temp",
                    });
                }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消结束",
            });
          });
      }
    },
  },
  mounted() {
    this.load();
  },
  watch: {},
};
</script>

<style lang='less' scoped>
.wrapper {
  width: 80%;
  height: 80%;
  background-color: red;
}
.showPaper {
  padding-bottom: 70px;
}
.submitPaper {
  width: 100%;
  position: fixed;
  bottom: 0;
}
@media only screen and (max-width: 720px) {
  .preview{
    font-size: 0.4167rem;
    .returnTeacher {
      padding: 0.3125rem;
      /deep/ .el-page-header__title {
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
@media only screen and (min-width: 720px) {
  .preview {
    .returnTeacher {
      padding: 0.1783rem 0rem 0.1783rem 0.1422rem;
      /deep/ .el-page-header__title {
        font-size: 0.1867rem;
      }
      /deep/ .el-page-header__content {
        font-size: 0.225rem;
      }
      border-bottom: 1px solid rgba(238, 238, 238);
    }
  }
}
</style>