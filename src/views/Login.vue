<!--
 * @Author: 肖俊男、邱奇华
 * @Date: 2021-09-09 22:04:36
 * @LastEditTime: 2022-10-12 13:31:24
 * @LastEditors: 肖俊男
 * @Description: 登录页面
 * @FilePath: \exams\src\views\Login.vue
 * 鲸落
-->

<template>
    <div id="login">
        <div class="login_container">
            <div class="login_box">
                <!-- <span>十四届三中全会知识答题系统</span> -->
                <!-- 表单 -->
                <div align="center"><img src="../assets/image/black.png" alt=""></div>
                <div class="name">喜迎二十大·激扬正青春<br/>主题知识问答</div>
                <!-- <div class="shname">学史明理&nbsp;&nbsp;学史增信<br/>学史崇德&nbsp;&nbsp;学史力行</div> -->
                <el-form label-width="80px" lable-color="black" class="login_form" :model="loginform" :rules="loginrules" ref="loginref" hide-required-asterisk>
                    <el-form-item label="姓名" prop="name" class="redItem">
                        <el-input v-model="loginform.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="学号" prop="id">
                        <el-input v-model="loginform.id" type="password" clearable></el-input>
                    </el-form-item>
                </el-form>
                <!-- 按钮 -->
                <el-row class="login_button">
                    <el-button class="el-button-danger"
                     type="danger"
                     :plain="true"
                     @click="open"
                     v-loading="isLoading"
                     element-loading-background="rgba(198, 9, 9, 0.65)"
                     :disabled="isLoading">
                        登录
                     </el-button>
                     <div>
                         <!-- <el-button type="text" @click="visitor()">访客登录</el-button> -->
                     </div>
                </el-row>
                <span>信工科协制作</span>
            </div>
            <div class="bottomName">
                <div class="onename">
                    <div>喜迎二十大&nbsp;&nbsp;</div>
                    <div>永远跟党走&nbsp;&nbsp;</div>
                    <div>奋进新征程&nbsp;&nbsp;</div>
                </div>
                <div class="twoname"> —— 信息工程学院团委</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                //这是登录表单的数据绑定对象
                // type:String,
                loginform: {
                    //管理员
                    // name: '管理员',
                    // id: '4201090701xx',
                    // 学生
                    // name:'学生1',
                    // id: '420109070101',
                    name:'',
                    id:''
                },
                //这是表单的验证规则
                loginrules: {
                    name: [//验证用户
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                    ],
                    id: [//验证密码
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { min: 12, max: 12, message: '输入12位数字的学号', trigger: 'blur' }
                    ]
                },
                isLoading:false
            }
        },
        methods: {
            // open(){
            //     this.$router.replace('/exam/attention');
            // }
            open() {
                this.$refs.loginref.validate(async valid => {
                    //const result = await this.$axios.post("/user/login", this.loginform);//将用户信息的参数传给服务器进行判断

                    this.$axios({
                        method:'post',
                        url:'/user/login',
                        data:{
                            name:this.loginform.name,
                            id:this.loginform.id
                        }
                    }).then((result)=>{

                        if (result.data.code == 2) {    //判断信息是否正确
                            // console.log('登录失败');
                            this.$message({
                                message: '姓名或学号错误',
                                center: true,
                                })
                        }else if(result.data.code == 0){
                            window.sessionStorage.setItem('token', result.data.result.token);//缓存获取到的token
                            // 管理员身份
                            if(result.data.result.roles == 0){
                                this.$router.push("/exam/teacher");
                            }
                            // 学生
                            else {
                                this.isLoading = true
                                // 向后端请求时携带请求头的token
                                this.$axios({
                                    methods:"get",
                                    url:"/exam/get_exam_list",
                                    headers:{
                                        token: sessionStorage.getItem('token')
                                    }
                                }).then((res) => {   
                                    // console.log(res);                                
                                    window.sessionStorage.setItem('list',JSON.stringify(res.data.result))

                                    if (res.data.msg == "成功") {
                                        this.$router.push("/exam/attention")
                                    }
                                }).catch(()=>{
                                    this.isLoading = false
                                })
                            }
                        }

                    }).catch((res)=>{
                        this.$message({
                            message: '服务器异常，请稍后重试',
                            center: true,
                        })
                    })
                })
            },
            visitor(){
                this.$router.push('/exam/visitor')
            }
        },
    }
</script>

<style scoped>
    #login{
        background-color: red;
    }
    span {
        display: block;
        text-align: center;
        font-size: larger;
    }

    #login {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_container {
        background-image: url(../assets/image/4.jpg);
        background-size: cover;
        height: 100%;
    }

    .login_box {
        width: 40%;
        height: 62%;
        min-width: 300px;
        min-height: 200px;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        min-height: 413px;
        transform: translate(-50%, -50%);
        /* box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.65); */
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.65);
    }
    .login_box img{
        width: 80%;
        position: relative;
        top:10px;
    }
    .login_box .name{
        text-align: center;
        font-size: 21px;
        font-weight: 800;
        line-height: 30px;
        letter-spacing: 2px;
        position: relative;
        top:25px;
        color: red;
    }
    .login_box .shname{
        text-align: center;
        font-size: 20px;
        font-weight: 800;
        line-height: 30px;
        letter-spacing: 2px;
        position: relative;
        top:-41px;
        color: red;
    }
    .login_box span{
        font-size: 10px;
        /* float: right; */
        position: fixed;
        bottom: 0;
        right: 10px;
        color: #606266;
    }
    .login_form {
        position: absolute;
        top: 44%;
        width: 100%;
        padding: 0px 10px;
        box-sizing: border-box;
        transform: translate(-20px, 0px);
    }

    .login_button {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 58%;
        transform: translate(-50%, 0);
        margin-top: 70px;
    }

    .el-button-danger {
        background-color: red;
        color: white;
        font-size: 15px;
    }
    .el-form-item__label {
        color: black !important;
    }
    .el-form-item__error{
        font-weight: 600;
        font-size: 18px !important;
        color: black !important;
    }

    .bottomName{
        position: absolute;
        bottom: 0;
        /* right: 5px; */
        left: 40px;
        padding-bottom: 10px;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
    }
    .onename{
        position: relative;
        color: red;
        letter-spacing: 5px;
        line-height: 30px;
        font-size: 20px;
        font-weight: 700;
    }
    .twoname{
        position: relative;
        font-size: 14px;
        color: red;
        left: 67px;
        /* letter-spacing: 3px; */
    }
</style>