<template>
    <div id="imgUp">
        <el-row class="u-title st-el-row">
            <span class="u-stitle">图片选择：</span>
            <el-upload
                action="http://localhost:8388/api/ajax/uploadImg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="getPicurl"
                name="imgFiles"
                class="u-upload">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-row>
        <el-row class="u-title st-el-row">
            <span class="u-stitle">图片描述：</span>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="desc"
                :autosize="{ minRows: 4}"
                resize="none">
            </el-input>
        </el-row>
        <el-row>
            <el-button type="primary" @click="submitImg">保存提交</el-button>
        </el-row>
    </div>
</template>

<script>
//import '@/assets/........' //引入less
import { Notification } from 'element-ui';
export default {
    name: 'imgUp',
    data: function(){
        return{
            dialogImageUrl: '',
            dialogVisible: false,
            url:'',
            desc:''
        }
    },
    components:{},
    methods:{
        handleRemove(file, fileList) {//删除提交的资料
            console.log(JSON.stringify(file)+'||'+JSON.stringify(fileList));
        },
        handlePictureCardPreview(file) {//图片信息
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file) {//上传图片校验
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        getPicurl(res, file, fileList){//上传成功后
            console.log(JSON.stringify(res)+'||'+JSON.stringify(file)+'||'+JSON.stringify(fileList));
            this.url = res.backUrl;
            console.log('图片提交成功');
        },
        submitImg(){
            this.getAjax(this.HOST+'/ajax/saveImg',{desc:this.desc, url:this.url},'POST').then(data=>{
                    Notification({
                        type:'success',
                        message:'图片上传成功！',
                        customClass:'hqb-notice',
                        duration:2000,
                        offset:300
                    });
                    setTimeout(()=>{
                        this.$router.go(0);
                    }, 1500);
            });
        }
    },
    mounted () {}

}
</script>
    
<style lang="less">
    #imgUp{
        .u-title{
            margin-bottom: 19px;
            font-size: 18px;
            color: #1F2D3D;
            letter-spacing: 0px;
            line-height: 16px;
        }
        .u-stitle{
            display: inline-block;
            width: 110px;
            font-size: 14px;
            color: #8492A6;
            letter-spacing: 0px;
        }
        .st-el-row{
            margin: 19px 0;
        }
        .u-projectIntri{
            width: 419px;
            line-height: 19px;
            display: inline-block;
            vertical-align: top;
        }
        .u-imgInfo{
            display: inline-block;
            vertical-align: top;
            img{
                margin-right: 30px;
                height: 297px;
                width: 210px;
            }
        }
        .u-upload{
            display: inline-block;
            vertical-align: top;
            .el-upload--picture-card{
                line-height: 178px;
            }
            .el-upload--picture-card,.el-upload-list__item{
                width: 180px;
                height: 180px;
            }
        }
    }
</style>