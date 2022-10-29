<!--
 * @Author: 肖俊男、邱奇华
 * @Date: 2022-03-04 14:32:35
 * @LastEditTime: 2022-03-06 10:00:21
 * @LastEditors: 肖俊男
 * @Description: 
 * @FilePath: \exams\src\components\Temp.vue
 * 鲸落
-->
<template>
    <div class="all" v-loading="loading">
        <div class="returnTeacher">
            <el-page-header @back="backTeacher" content="组卷预览">
            </el-page-header>
        </div>
        <el-container>
            <div class="main">
                <el-table :row-class-name="tableRowClassName" :data="tableData" border style="width: 100" @row-click="handleClick">
                    <el-table-column prop="paper_name" label="已经上传试卷：" ></el-table-column>
                    <el-table-column  prop="paperStatus" label="状态："></el-table-column>
                </el-table>
            </div>
            <el-footer class="submitBouton">
                <el-upload class="upload-demo" action="upload" :http-request="handleUploadFile"
                :on-error="handleError" :before-remove="beforeRemove" multiple :on-exceed="handleExceed"
                :file-list="fileList" :before-upload="handleProgress">
                    <el-button type="primary" class="submit">点击上传</el-button>
                </el-upload>
            </el-footer>
        </el-container>
        
    </div>
</template>

<script>
import "../assets/js/flexible";
export default {
    data() {
      return {
        tableData: [],
        fileList: [],
        loading:true,
        disappear:-1
      }
    },
    methods: {
        getPaperList(){
            this.$axios({
                methods:"get",
                url:"/paper/get_paper_list",
                headers:{
                    token: sessionStorage.getItem('token')
                }
            }).then((res) => {
                this.tableData = res.data.result.reverse()
                // 试卷状态添加
                this.addPaperStatus();
                this.loading = false
            })
        },
        // 试卷状态添加
        addPaperStatus(){
            for(let i = 0; i < this.tableData.length; i++){
                if(this.tableData[i].publish == 0){
                    this.tableData[i]['paperStatus'] = "未发布";
                }else if(this.tableData[i].publish == 1){
                    this.tableData[i]['paperStatus'] = "已发布";
                }else {
                    this.tableData[i]['paperStatus'] = "结束";
                }
            }
        },
        // 给试卷状态添加颜色类
        tableRowClassName(row){
            if(row.row.publish === 0){
                return 'warning-row'
            }else if(row.row.publish === 1){
                return 'success-row'
            }else return 'final-row'
        },
        backTeacher(){
            this.$router.push("/exam/teacher");
        },
        
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$dialog.confirm({message:`确定移除 ${ file.name } 吗？`})
        },
        handleError(file,fileList){
            return this.$dialog.alert({message:'文件上传失败，请重新上传'})
        },
        handleUploadFile(){
            // console.log(this.file); 
            let formData = new FormData()
            formData.append("file",this.file)
            this.$axios({
                method:'post',
                url:'/paper/upload_template',
                data:formData,
                headers:{
                    token:sessionStorage.getItem('token'),
                }
            }).then((res)=>{
                if(res.data.code == 0){
                    this.result = res.data.result
                    // console.log(this.result);
                     window.sessionStorage.setItem('result',JSON.stringify(this.result))
                     this.disappear = 0;
                     window.sessionStorage.setItem('disappear',this.disappear)
                    // return this.$dialog.alert({message:'文件上传成功，可以进行试卷预览'})
                    // var oneresult = JSON.parse(sessionStorage.getItem('result'))
                    // var paper_id = this.result.paper_id;
                    this.$router.push({
                        path:'/exam/preview',
                    })

                }
                else{
                    return this.$dialog.alert({message:'服务器繁忙'})
                }
            }).catch(()=>{
                return this.$dialog.alert({message:'请按照模板上传正确的文件'})
            })
        },
        handleProgress(file){
            // console.log(file);
            this.file = file
        },
        handleClick(row,column,event){
            this.$axios({
                method:'post',
                url:"/paper/get_paper_info",
                data:{
                    paper_id:row.id
                },
                headers:{
                    token: sessionStorage.getItem('token')
                },
            }).then((res)=>{
                // console.log(res);
                if(res.data.code == 0){
                    this.result = res.data.result
                    window.sessionStorage.setItem('result',JSON.stringify(this.result))
                    this.disappear = row.publish;
                    window.sessionStorage.setItem('disappear',this.disappear)
                    this.$router.push({
                        path:'/exam/preview',
                    })
                }
            })
        },
        


         onSave() {
            Toast('save');
        },
        onDelete() {
            Toast('delete');
        },
        onChangeDetail(val) {
        },
    },
    mounted () {
        this.getPaperList()
    }
}
</script>

<style scoped lang="less"> 
.main{
    margin:0 10px 10px 10px;
    padding-bottom: 60px;
}
/deep/.el-table{
    // 未发布
    .warning-row {
        background: rgb(255, 255, 255) !important;
    }
    // 已发布
    .success-row {
        background: #d7f8c6 !important;
    }
    // 结束
    .final-row {
        background:rgb(247, 223, 157) !important;
    }
}
.tableColum{
    color: black !important;
    font-weight: 1000;
    font-size: 30px;
}
.upload-demo{
    text-align: center;
}
.submitBouton{
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: white;
}
.el-table__row{
    color: black;
}

@media only screen and (max-width: 720px) {
    .all {
            .returnTeacher{
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
    }
}
@media only screen and (min-width: 720px) {
    .all {
        .returnTeacher {
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