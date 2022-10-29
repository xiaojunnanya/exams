<!--
 * @Author: 肖俊男
 * @Date: 2022-10-06 21:47:20
 * @LastEditTime: 2022-10-11 12:53:31
 * @LastEditors: 肖俊男
 * @Description: 抽奖页面
 * @FilePath: \exams\src\views\luckDraw.vue
 * 鲸落
-->
<template>
  <div class="all" v-loading="isLoading"
      element-loading-text=" "
      element-loading-spinner=" "
      element-loading-background="rgba(198, 9, 9, 0.65)">
    <div>
        <div align="center" style="padding-top:50px"><img src="../assets/image/black.png" alt=""></div>
    </div>
    <div style="padding-top:50px">
        <div class="name">{{name}}同学，{{show}}</div>
        <div class="clicked" style="padding-top:30px">
            <el-button type="primary" @click="clicked" :disabled="okCilcked">点击抽奖</el-button>
            <el-button type="primary" @click="backToHome">点击返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'luckDraw',
    data(){
        return{
            isLoading:'ture',
            name:'',
            list:[],
            show:"",
            okCilcked:false
        }
    },
    mounted(){
        var valid = sessionStorage.getItem("token");
        // 判断token是否存在
        if(!valid){
            this.$router.push('/exam/login');
        }
        this.isLoading = true
        this.judge()
    },
    methods:{
        backToHome(){
            this.$router.push({path:'/exam'})
        },
        judge(){
            //获取名称
            this.$axios({
                method:"get",
                url:"/prize",
                headers:{
                    token: sessionStorage.getItem('token')
                },
            }).then((res)=>{
                console.log(res);
                this.name = res.data.result.name
                this.list = res.data.result.list
                console.log(res.data.result.list);
                // console.log(this.list[0].id);
                console.log(this.list.length);
                if(this.list.length == 0){
                    this.show ="您暂时没有抽奖资格"
                    this.okCilcked = true
                    this.isLoading = false
                }else{
                    this.okCilcked = false
                    this.show = "您有" + this.list.length + "次抽奖机会"
                    this.isLoading = false
                }

            }).catch((res)=>{
                console.log(res);
            })
        },
        clicked(){
            const toast = this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: '倒计时 3 秒',
            });

            let second = 3;
            const timer = setInterval(() => {
            second--;
            if (second) {
                    toast.message = `倒计时 ${second} 秒`;
                } else {
                    clearInterval(timer);
                    this.$toast.clear();
                    this.$axios({
                        method:"post",
                        url:'/prize',
                        data:{
                            id:this.list[0].id,
                        },
                        headers:{
                            token: sessionStorage.getItem('token')
                        },
                    }).then((res)=>{
                        console.log(res);
                        if(res.data.msg == "用户不具有抽奖资格或已经抽过奖"){
                            this.$dialog.alert({
                                message: '您不具有抽奖资格或已经抽过奖',
                            }).then(() => {
                                this.$router.go(0)
                            });
                        }else if(res.data.msg == "谢谢参与"){
                            this.$dialog.alert({
                                message: '很遗憾您未抽中奖品',
                            }).then(() => {
                                this.$router.go(0)
                            });
                        }else{
                            this.$dialog.alert({
                                //还有谢谢惠顾的情况
                                message: '恭喜您抽中' + res.data.msg,
                            }).then(() => {
                                this.$router.go(0)
                            });
                        }
                    })

                    
                }
            }, 1000);
        }
    }
}
</script>

<style scoped>
.name{
    text-align: center;
    font-size: 20px;
    padding-top: 30px;
    font-weight: 700;
    font-family: 'Courier New', Courier, monospace;
    color: #fff;
}
.clicked{
    margin-top: 30px;
    text-align: center;
}
.all {
    background-image: url(../assets/image/4.jpg);
    background-size: cover;
    height: 100%;
}
.el-button--primary{
    background-color: red !important;
    border: 0;
}
</style>