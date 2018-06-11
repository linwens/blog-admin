<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="publish">
        <div class="mkd-tips">
            <h3>markdown语法提示</h3>
            <p><b>标题：</b>#、##、###.....</p>
            <p><b>段落：</b> 在文本前加 > ；也可以通过 > 的叠加实现段落的嵌套，如：（>,>>,>>>,...）</p>
            <p><b>列表：</b>无序列表（*、+、-）；有序列表（1、2、3等数字，不用在意数字正确性，mkd会自动按先后排序）</p>
            <p><b>代码块：</b>前后包裹 ```并换行 ；三个不能多也不能少，一定要换行</p>
            <p><b>插入图片：</b>![图片Alt](图片路径 图片title)</p>
            <p><b>文本内超链接：</b></br>
                &nbsp;&nbsp;&nbsp;如：我常去的网站[Google][1],[baidu][2]....</br>
                &nbsp;&nbsp;&nbsp;然后再在文章的最后添加
                &nbsp;&nbsp;&nbsp;[1]:http://www.google.com "Google",([]后面是引号，请注意)</br>
                &nbsp;&nbsp;&nbsp;[2]:http://www.baidu.com "Baidu"
            </p>
            <p><b>自动连接：</b>用尖括号包裹一个url字符串，如：&lthttp://example.com/>，就会生成一个内容为'http://example.com/'的a标签</p>
            <p><b>技巧：</b></br>
                &nbsp;&nbsp;&nbsp;1、新窗口打开超链接就直接写HTML标签;链接统一字体颜色：#20A0FF;
                &nbsp;&nbsp;&nbsp;2、需要自定义样式的就直接写HTML标签;
            </p>
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
            <el-form-item prop="brief">
                <h2>文章摘要</h2>
                <el-input type="textarea" v-model="articleForm.brief" :rows="3"></el-input>
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
        <el-button type="primary" @click="subArticle('save')" :disabled="btnCtrl" >保存</el-button>
        <el-button type="warning" @click="subArticle('publish')" :disabled="btnCtrl">发布</el-button>
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
            btnCtrl:false,
            tags:[],
            articleForm:{
                title:'',
                text:'',
                brief:''
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
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                text:[
                    { required: true, message: '请输入文章正文', trigger: 'blur' }
                ],
                brief:[
                    { required: true, message: '请输入文章摘要', trigger: 'blur' },
                    { min: 3, max: 100, message: '长度在 3 到 300 个字符', trigger: 'blur' }
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
        subArticle(type){//传的字段用于区分保存还是发布
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
                        parmas = Object.assign({},{title:this.articleForm.title, text:this.articleForm.text, brief:this.articleForm.brief, tags:JSON.stringify(tagsObj), option:this.option, aid:this.$route.params.id, operate:type})
                    }else{
                        parmas = Object.assign({},{title:this.articleForm.title, text:this.articleForm.text, brief:this.articleForm.brief, tags:JSON.stringify(tagsObj), option:this.option, operate:type})
                    }
                    this.$store.dispatch('UPDATE_ARTICLE',parmas).then(data=>{
                        Notification({
                            type:'success',
                            message:data.res_msg,
                            customClass:'hqb-notice',
                            duration:2000,
                            offset:300
                        });
                        setTimeout(()=>{
                            this.$router.push('/guests/base-table');
                        }, 1500);
                    }).catch(err=>{
                        console.log(err);
                        Notification({
                            type:'error',
                            message:err,
                            customClass:'hqb-notice',
                            duration:2000,
                            offset:300
                        });
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
            });
        },
        //获取已有文章详情
        getDetail(){
            let allData = this.$store.state.mockdatas.articleList;
            let data = allData.find((val,i,arr)=>{
                return val.aid === this.$route.params.id;
            });
            this.articleForm.title=data.title;
            this.articleForm.text=data.text;
            this.articleForm.brief=data.brief;
            this.tags=data.tags?data.tags:[];
        }
    },
    mounted () {
        if(this.$route.params.id&&this.$route.params.id!=':id'){
            this.option = 'modify';
            console.log(this.option);
            this.getDetail();
        }
    }
}
</script>

<style lang="less">
    #publish{
        .mkd-tips{
            background: #ccc;
            margin: 10px;
            padding-left: 20px;
            h3{
                font-size: 20px
            }
            b{
                font-weight: bold;
            }
        }
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