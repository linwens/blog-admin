<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="publish">
        <div class="mkd-tips">
            markdown语法提示
        </div>
        <el-form :model="articleForm" :rules="articleFormrules" ref="articleForm">
            <el-form-item prop="title">
                <h2>标题</h2>
                <el-input v-model="articleForm.title" placeholder="输入文章标题" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="text">
                <h2>正文</h2>
                <markdown-editor v-model="articleForm.text" ref="markdownEditor" :configs="configs"></markdown-editor>
            </el-form-item>
        </el-form>
        <el-tag
            :key="tag"
            v-for="tag in tags"
            :closable="true"
            :close-transition="false"
            @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            :maxlength=10
            style="width:80px;"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Tag</el-button>
        <el-button type="primary" @click="subArticle">发布</el-button>
    </div>
</template>

<script>
//import '@/assets/........' //引入less
import { markdownEditor } from 'vue-simplemde';
import { Notification } from 'element-ui';
export default {
    name: 'publish',
    data: function(){
        return{
            // title:'',
            // text:'',
            tags:[],
            articleForm:{
                title:'',
                text:''
            },
            inputVisible: false,
            inputValue: '',
            configs:{
                status: false, // 禁用底部状态栏
                initialValue: '请开始书写吧', // 设置初始值
                renderingConfig: {
                    codeSyntaxHighlighting: true, // 开启代码高亮
                    highlightingTheme: 'tomorrow-night-eighties' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
                }
            },
            editPars:{
                id:''
            },
            option:'',
            articleFormrules:{
                title:[
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                text:[
                    { required: true, message: '请输入文章正文', trigger: 'blur' }
                ]
            }
        }
    },
    components:{
        markdownEditor
    },
    methods:{
        //增加标签
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        //文章发布
        subArticle(){
            this.$refs['articleForm'].validate((valid) => {
                if (valid) {
                    let tagsObj = {};
                    for(var i = 1;i<=this.tags.length;i++){//拼成json传参
                        tagsObj = Object.assign(tagsObj,{
                            ['tag'+i]:this.tags[i-1]
                        })
                    }
                    let parmas = null;
                    if(this.option == 'modify'){
                        parmas = Object.assign({},{title:this.articleForm.title, text:this.articleForm.text, tags:tagsObj, option:this.option, aid:this.$route.params.id})
                    }else{
                        parmas = Object.assign({},{title:this.articleForm.title, text:this.articleForm.text, tags:tagsObj, option:this.option})
                    }
                    this.getAjax(this.HOST+'/ajax/subArticle',parmas,'POST').then(data=>{
                        Notification({
                            type:'success',
                            message:'提交成功',
                            customClass:'hqb-notice',
                            duration:2000,
                            offset:300
                        });
                        setTimeout(()=>{
                            this.$router.push('/blog/list');
                        }, 1500);
                    })
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
            });
        },
        //获取已有文章详情
        getDetail(){
            this.getAjax(this.HOST+'/ajax/getArticle',{aid:this.$route.params.id, option:this.option},'GET').then(data=>{
                this.articleForm.title=data.articleDetail.title;
                this.articleForm.text=data.articleDetail.text;
                this.tags=data.articleDetail.tags?data.articleDetail.tags:[];
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

<style lang="less">
    #publish{
        >h2{
            font-size: 20px;
            font-weight: normal;
            height: 40px;
            line-height: 40px;
        }
        .markdown-editor{
            margin-bottom: 20px;
        }
        .editor-preview pre, .editor-preview-side pre{
            display: block;
            overflow-x: auto;
            background: #2d2d2d;
            color: #cccccc;
            padding: 0.5em;
            margin: 0.5em 0;
            border-radius: 4px;
        }
    }
</style>