<template>
    <div id="imgUp">
        <el-row class="u-title st-el-row">
            <el-radio v-model="bucketType" label="galleryImg" :disabled="typeStatus">传至摄影图库</el-radio>
            <el-radio v-model="bucketType" label="blogImg" :disabled="typeStatus">传至blog图库</el-radio>
        </el-row>
        <el-row class="u-title st-el-row" v-show="bucketType">
            <span class="u-stitle">图片选择：</span>
            <el-upload
                :action="actionUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="getPicurl"
                :data="{bucketType:bucketType}"
                name="imgFiles"
                :file-list="imgList"
                class="u-upload">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-row>
        <el-form :model="imgForm" :rules="imgFormrules" ref="imgForm">
            <el-row class="u-title st-el-row">
                <el-form-item prop="title">
                    <el-input v-model="imgForm.title" placeholder="请输入图片标题"></el-input>
                </el-form-item>
            </el-row>
            <el-row class="u-title st-el-row">
                <el-form-item prop="desc">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入图片描述"
                        v-model="imgForm.desc"
                        :autosize="{ minRows: 4}"
                        resize="none">
                    </el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <el-row>
            <el-button type="primary" @click="submitImg" :disabled="btnCtrl">保存提交</el-button>
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
            bucketType:'',
            typeStatus:false,
            btnCtrl:false,
            dialogImageUrl: '',
            dialogVisible: false,
            size:'',
            url:'',
            exif:null,
            imgForm:{
                title:'',
                desc:''
            },
            imgFormrules:{
                title:[
                    { required: true, message: '请输入图片标题', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                desc:[
                    { required: true, message: '请输入图片描述', trigger: 'blur' }
                ]
            },
            imgList:[],
            actionUrl:this.HOST+'/ajax/uploadImg'
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
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG&&!isPNG) {
              this.$message.error('上传d图片只能是 JPG 或 NPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传d图片大小不能超过 2MB!');
            }
            return (isJPG||isPNG) && isLt2M;
        },
        getPicurl(res, file, fileList){//上传成功后
            console.log(JSON.stringify(res)+'||'+JSON.stringify(file)+'||'+JSON.stringify(fileList));
            this.url = res.backUrl;
            this.size = res.size;
            this.exif = res.exif;
            console.log('图片提交成功');
        },
        submitImg(){
            let parmas = {title:this.imgForm.title, desc:this.imgForm.desc, exif:this.exif, size:this.size, url:this.url, option:this.option, type:this.bucketType};
            if(this.option == 'modify'){
                parmas = Object.assign(parmas,{gid:this.$route.params.id})
            }
            this.$refs['imgForm'].validate((valid) => {
                if (valid) {
                    this.getAjax(this.HOST+'/ajax/saveImg',parmas,'POST').then(data=>{
                            Notification({
                                type:'success',
                                message:data.res_msg,
                                customClass:'hqb-notice',
                                duration:2000,
                                offset:300
                            });
                            setTimeout(()=>{
                                this.$router.push('/gallery/list');
                            }, 1500);
                    });
                }else{
                    Notification({
                        type:'error',
                        message:'数据输入有误，请检查！',
                        customClass:'hqb-notice',
                        duration:2000,
                        offset:300
                    })
                    return false;
                }
            })
        },
        getImginfo(){
            this.getAjax(this.HOST+'/ajax/getImginfo',{gid:this.$route.params.id, option:this.option},'GET').then(data=>{
                if(data.res_code==2){
                    this.btnCtrl = true;
                    Notification({
                        type:'error',
                        message:data.res_msg,
                        customClass:'hqb-notice',
                        duration:2000,
                        offset:300
                    });
                    return;
                }
                this.imgForm.title=data.imgInfo.title;
                this.imgForm.desc=data.imgInfo.desc;
                this.size = data.imgInfo.size;
                this.exif = data.imgInfo.exif;
                this.bucketType = data.imgInfo.type;
                this.typeStatus = true;
                //图片
                this.url = data.imgInfo.url;
                this.imgList.push({"url":data.imgInfo.url})
            });
        }
    },
    mounted () {
        if(this.$route.params.id&&this.$route.params.id!=':id'){
            this.option = 'modify'
            this.getImginfo();
        }
    }

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