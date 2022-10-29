<!--
 * @Author: 肖俊男、邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-10-11 10:46:02
 * @LastEditors: 肖俊男
 * @Description: 成绩展示部分
 * @FilePath: \exams\src\components\End.vue
 * 鲸落
-->



<template>
  <div class="mybody">
    <div></div>
    <div>
      <p>您的最终成绩是{{chj}}分</p>
    </div>
    <div class="button">
      <el-button type="primary" @click="backToHome()">点击返回</el-button>
      <el-button type="primary" @click="toDraw()">点击抽奖</el-button>
    </div>
  </div>
</template>

<script>
  export default{
    name:'end',
    data(){
      return{
        chj:0,//存入JSON转换的对象
      }
    },
    methods: {
      backToHome(){
        this.$router.push({path:'/exam'})
      },
      toDraw(){
        this.$router.push({path:"/exam/luckDraw"})
      }
    },
    created(){
      var aa = window.sessionStorage.getItem('endResult')
      // console.log(aa);
      this.chj = aa
      
    }
  }
</script>

<style scoped>
  .mybody{
    background-image: url(../assets/image/4.jpg);
    background-size:cover;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  p{
    font-size: 25px;
    text-align: center;
    color: white;
    font-weight: 800;
  }
  .button{
    display: flex;
    justify-content: space-around;
  }
  .el-button--primary{
    background-color: red !important;
    border: 0;
  }
</style>