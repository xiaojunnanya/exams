<!--
 * @Author: 肖俊男
 * @Date: 2022-02-14 10:39:31
 * @LastEditTime: 2022-10-04 21:14:50
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \exams\src\views\Teacher.vue
 * 鲸落
-->
<template>
  <div class="all">
      <div v-if="shownotice">
        <van-dialog v-model="show" title="注意事项" :show-cancel-button="showCancelButton" :before-close="beforeClose">
            <div class="box1">按照步骤:</div>
            <div class="box2">
                <ol>
                    <li>1、点击下载文件下载模板</li>
                    <li>2、按照模板进行文件编辑</li>
                    <li>3、点击组卷预览进行上传</li>
                    <li>4、上传是进行信息编辑</li>
                    <li>5、发布试卷</li>
                </ol>
            </div>
            <van-checkbox v-model="checked" @click="nextPop()">不再弹出</van-checkbox>
        </van-dialog>
      </div>
      
    <div class="title">河北地质大学答题系统后台</div>
    <hr>
      <div v-if="false">
            <van-address-edit :show-area="false" show-delete show-search-result :search-result="searchResult"
            @save="onSave" @delete="onDelete" @change-detail="onChangeDetail"/>
      </div>
      <div class="showthree">
        <div @click="downLoad()">
            <div class="template"><img src="../assets/iocn/download.png" alt=""></div>
            <el-button type="text">下载模板</el-button>
        </div>
        <div>
            <el-upload class="upload-demo" action="http://vip.jzab.xyz:8000/api/paper/upload_template"
            :on-error="handleError" :on-exceed="handleExceed"
             :file-list="fileList">
                <div class="template"><img src="../assets/iocn/shangchuan.png" alt=""></div>
                <el-button type="text">点击上传</el-button>
            </el-upload>

            <!-- <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload> -->


        </div>
        <div @click="answersituation()">
            <div class="template"><img src="../assets/iocn/chaxun.png" alt=""></div>
            <el-button type="text">考试查询</el-button>
        </div>
        <!-- <div @click="preview()">
            <div class="template"><img src="../assets/iocn/yulan.png" alt=""></div>
            <el-button type="text">试卷预览</el-button>
        </div> -->
        <div @click="temp()">
            <div class="template"><img src="../assets/iocn/yulan.png" alt=""></div>
            <el-button type="text">组卷预览</el-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        fileList: [], //在后端将试卷的名字传过来在这里展示
        show:true,
        disapper:true,
        checked:false,
        showCancelButton:false,
        showdialog:false,
        shownotice:true,
        searchResult: [],
        file:'',
        result:[]
      };
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        preview(){
            // 跳转到试卷预览
            window.sessionStorage.setItem('result',JSON.stringify(this.result))
            this.$router.push({
                path:'/exam/preview'
            })
        },
        downLoad(){
            window.location.href = 'http://vip.jzab.xyz:8000/api/paper/download_template'
        },
        answersituation(){
            this.$router.push("/exam/answersituation")
        },
        nextPop(){
            // console.log(this.checked);
            this.showdialog = this.checked
        },
        
        temp(){
            window.sessionStorage.setItem('result',JSON.stringify(this.result))
            this.$router.push({
                path:'/exam/temp'
            })
        },
        beforeClose(action, done){
           if (action === 'confirm') { // 确认
                // console.log('[点击事件 - 备注] - 确认');
                // console.log(this.showdialog);
                if(this.showdialog){
                    this.showdialog  = false
                    // console.log(this.showdialog);
                    var showdialog = window.localStorage
                    showdialog.setItem('dialogFalse',this.showdialog)
                    // console.log(showdialog.getItem('dialogFalse'));
                }
                done(); // 关闭提示框
            }
        },

        handleError(e){
            console.log(e);
        },
        handleExceed(e){
            console.log(e);
        }
    },

    created () {
        // console.log("sda");
        if(localStorage.getItem("dialogFalse") == "false"){
            // console.log(this.shownotice);
            this.shownotice = false
        }
    }
}
</script>

<style scoped>
.title{
    font-size: 20px;
    text-align: center;
}
.all{
    margin: 0px 10px;
}
span{
    width: 100%;
}
.van-checkbox{
    display: flex;
    justify-content:center;
}
.box1{
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
}
.box2{
    display: flex;
    justify-content: flex-start;
    margin-left: 30px;
}
.upload-demo,.el-button{
    display: inline-block;
}
.updown{
    margin-left: 10px;
}
.one{
    margin-bottom: 20px;
}
.one,.two{
    display: flex;
    justify-content: center;
}
img{
    width: 57px;
    
}
.template{
    border: 1px solid white;
    border-radius: 30%;
    background-color: #27A7FE;
    height: 57px;
    width: 57px;
}
.showthree{
    display: flex;
    justify-content: center;
}
.showthree>div{
    margin: 0 10px;
}
.el-button--text{
    color: black;
}
.showthree>div[data-v-1e273cd0]{
    width: 59px;
}
</style>