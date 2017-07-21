<template>
    <div>
        <el-form :model="h5Form" :rules="h5Formrules" ref="h5Form" label-position="left" label-width="90px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="H5作品名称" prop="name">
                        <el-input v-model="h5Form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6"><p style="line-height: 36px;margin-left: 10px;color: #ff4949;">名称与前台项目的文件夹名称相同</p></el-col>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="H5作品描述" prop="desc">
                        <el-input type="textarea" v-model="h5Form.desc" :rows="10"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-button type="primary" @click="submitH5" style="margin-left:90px;">确认添加</el-button>
    </div>
</template>

<script>
//import '@/assets/........' //引入less
import { Notification } from 'element-ui';
export default {
    name: 'addItem',
    data: function(){
        return{
            h5Form:{
                name:'',
                desc:''
            },
            h5Formrules: {
                name: [
                    { required: true, message: '请输入作品名称', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请填写作品描述', trigger: 'blur' }
                ]
            },
            option:''
        }
    },
    components:{},
    methods:{
        submitH5(){
            let parmas = null;
            if(this.option == 'modify'){
                parmas = Object.assign({},{name:this.h5Form.name, desc:this.h5Form.desc, option:this.option, hid:this.$route.params.id})
            }else{
                parmas = Object.assign({},{name:this.h5Form.name, desc:this.h5Form.desc, option:this.option})
            }
            this.$refs['h5Form'].validate((valid) => {
                if (valid) {
                    this.getAjax(this.HOST+'/ajax/subH5',parmas,'POST').then(data=>{
                        Notification({
                            type:'success',
                            message:'增加成功',
                            customClass:'hqb-notice',
                            duration:2000,
                            offset:300
                        });
                        setTimeout(()=>{
                            this.$router.push('/html5/list');
                        }, 1500);
                    })
                } else {
                    Notification({
                        type:'error',
                        message:'数据输入有误，请检查！',
                        customClass:'hqb-notice',
                        duration:2000,
                        offset:300
                    })
                    return false;
                }
            });
        },
        //获取已有H5详情
        getDetail(){
            this.getAjax(this.HOST+'/ajax/getH5',{hid:this.$route.params.id, option:this.option},'GET').then(data=>{
                this.h5Form.name=data.H5Detail.name;
                this.h5Form.desc=data.H5Detail.desc;

            });
        }
    },
    mounted () {
        if(this.$route.params.id&&this.$route.params.id!=':id'){
            this.option = 'modify'
            this.getDetail();
        }
    }

}
</script>
    
<style>
    
</style>