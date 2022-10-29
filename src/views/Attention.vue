<!--
 * @Author: 肖俊男、邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-10-11 18:43:49
 * @LastEditors: 肖俊男
 * @Description: 注意事项
 * @FilePath: \exams\src\views\Attention.vue
 * 鲸落
-->



<template>
    <div class="tipMessage">
        <div class="attention">
            <!-- <p>此次竞赛主题为：
                <br/><br/><strong>学习“党史”，永担使命</strong>
            </p> -->
            <p>1、共20道题，总时长7分钟。</p>
            <p>2、每道题认真思考后作答。</p>
            <p>3、答题进度会被实时保存。</p>
            <p>4、请在规定时间内完成答题。</p>
            <p>5、未完成答题将无法提交答案。</p>
            <div class="elSelect">
                <el-select v-model="value" placeholder="请选择试卷" clearable>
                    <el-option v-for="item in options" :key="item.value" :id="item.id" :value="item.value"></el-option>
                </el-select>
            </div>
            
            <el-row>
                <div class="action">
                    <el-button type="danger" style="background-color: red;" @click="study">开始答题</el-button>
                    <el-button type="danger" style="background-color: red;" @click="luckDraw" class="click">点击抽奖</el-button>
                </div>
            </el-row>

            <el-row>
                
            </el-row>
        </div>
    </div>
</template>

<script>
export default{
    name:'Attention',
    data () {
        return {
            options: [
                {
                    value: '现在没有试卷',
                    id:''
                }, 
            ],
            value:'',
            examType:'',
            examId:''
        }
    },
    methods:{
        study(){
            // let routeData = this.$router.resolve({ path: '/exam/home'});
            // window.open(routeData.href, '_blank');
            if(this.value != ""){
                for(var i =0;i<this.options.length;i++){
                    if (this.options[i].value == this.value) {
                        this.examId = this.options[i].id
                        // console.log(this.examId);
                        // console.log(this.value);
                        // 携带参数请求数据
                         this.$axios({
                            method:"post",
                            url:"/exam/get_question",
                            data:{
                                    question_id:0,
                                    exam_id:this.options[i].id,
                                },
                            headers:{
                                token: sessionStorage.getItem('token')
                            },
                        }).then((res) => {
                            var examList = JSON.parse(window.sessionStorage.getItem('list'))
                            // console.log(examList);
                            // console.log(examList.length);
                            for(var j = 0;j<examList.length;j++){
                                if(examList[j].paper_name == this.value){
                                    // console.log(examList[j].end_exam);
                                    if(examList[j].end_exam == 1){
                                         window.sessionStorage.setItem('endResult',examList[j].score)
                                        this.$router.push('/exam/end')
                                    }
                                    else{
                                        // console.log(res);
                                        this.$store.commit("setResult",res);
                                        this.$store.commit("setQuestionNumber",res.data.result.question_number);
                                        this.$store.commit("setExamId",this.examId)
                                        this.$router.replace('/exam/home');

                                        window.sessionStorage.setItem('exam_id',this.examId)
                                        window.sessionStorage.setItem('question_number',res.data.result.question_number)
                                        // console.log(window.sessionStorage.getItem('exam_id'));
                                    }
                                }
                            }
                        })

                    }
                }
            }
            else{
                this.$message({
                    message: '请先选择试卷',
                    center: true,
                })
            }
        },
        luckDraw(){
            this.$router.push("/exam/luckDraw");
        }
    },
    created(){
        var valid = sessionStorage.getItem("token");
        // 判断token是否存在
        if(!valid){
            this.$router.push('/exam/login');
        }
        // console.log(this.options[0].label);
        // this.options[0].value = this.options[0].label

        this.$axios({
            methods:"get",
            url:"/exam/get_exam_list",
            headers:{
                token: sessionStorage.getItem('token')
            }
        }).then((res) => {
            // console.log(res);
            // console.log(res.data.result);
            this.options = res.data.result
            for(var i =0;i<res.data.result.length;i++){
                this.options[i].value = res.data.result[i].paper_name
                this.options[i].id = res.data.result[i].id
            }
        })
    }
}
</script>

<style scoped>
.tipMessage{
    /* background-color: red; */
    background-image: url(../assets/image/4.jpg);
    background-size:cover;
    height: 100%;
    width: 100%;
    margin: auto;
    line-height: 15px;
    font-size: 20px;
    min-height: 346px;
    /* padding: -20px -10px; */
}
.tipMessage p{
    text-align: center;
    color: white;
    font-size: 18px;
    text-align: justify;
}
/* .tipMessage p:nth-child(1){
    margin-top: 10px;
} */
/* .tipMessage p:nth-child(5){
    line-height: 25px;
} */
.action{
    margin-top: 7%;
    text-align: center;
}
.attention{
    /* box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.65); */
    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 20px;
    padding:50px 20px 0px 20px;
    /* height: 100%; */
    position: relative;
    left:50%;
    height: 52%;
    top:20%;
    transform: translate(-50%,0);
    width:80%;
}
.elSelect{
    display: flex;
    justify-content: center
}
</style>