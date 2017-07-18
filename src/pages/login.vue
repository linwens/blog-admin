<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="login">
        <el-form :model='loginForm' :rules="loginRules" ref="loginForm" label-position="right" class="loginContainer">
            <h3>欢迎使用华侨宝资产管理系统</h3>
            <el-form-item prop="username">
                <i class="iconfont icon-denglu-yonghuming"></i>
                <el-input type="text" v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <i class="iconfont icon-denglu-mima"></i>
                <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="validCode">
                <i class="iconfont icon-denglu-yanzhengma"></i>
                <el-input v-model="loginForm.validCode" placeholder="验证码">
                    <el-button slot="append">获取验证码</el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginSubmit('loginForm')" class="btn-doLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import '@/assets/less/utils/mixin.less' //引入less
//import { swiper, swiperSlide } from 'vue-awesome-swiper'  //引入vue插件,或其他组件
export default {
    name: 'login',
    data: function(){
        var checkCode = (rule, value, cb) => {
            if(!value){
                cb(new Error('验证码不能为空'))
            }else{//必须要加正常情况的返回，否则提交校验的时候走不进函数
                cb()
            }
        };
        return{
            loginForm:{
                username:'linwens',
                password:'lws5681280!@#',
                validCode:'1234'
            },
            loginRules:{
                username:[
                    { required:true, message:'请输入姓名', trigger:'blur'},
                    { min: 2, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                password:[
                    { required:true, message:'请输入密码', trigger:'blur'},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
                    { pattern :/^[a-zA-Z0-9]+$/+/((?=[\x21-\x7e]+)[^A-Za-z0-9])/, message: '密码格式错误', trigger: 'blur' }//匹配数字字母和特殊符号
                ],
                validCode:[
                    { required:true, message:'请输入验证码', trigger: 'blur'},
                    { validator: checkCode, trigger: 'blur'}
                ]
            }
        }
    },
    components:{},
    methods:{
        loginSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log('submit success');
                    let datas = {
                        username: this.loginForm.username, 
                        password: this.loginForm.password, 
                        validCode: this.loginForm.validCode
                    };
                    this.getAjax('/api/ajax/login', datas ,'POST').then( res => {
                        //success
                        if(res.res_code === '1') {
                            var data = res.data,
                                user = {};
                            for(var key in data){
                                user[key] = data[key]
                            }
                            this.$store.dispatch('USER_LOGIN', user);
                            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                            this.$router.push({
                                path: redirect
                            });
                        } else {
                            this.$message.error('用户名或密码错误');
                        }
                    });
                }else{
                    return;
                }
            })
        }
    },
    mounted () {
        console.log(this.$store);
    }

}
</script>

<style lang='less'>
#login{
    height: 100%;
    background-image:url(../assets/images/login/loginBg.jpg),url(../assets/images/login/bgColor.jpg);
    background-repeat: no-repeat, repeat-x;  
    background-position: center top, 0 top;
    background-color: #00d2e9;
    .loginContainer{
        width: 360px;
        height: 480px;
        background: rgba(255,255,255,0.1);
        position: absolute;
        top:265px;
        left:50%;
        margin-left: 185px;
        padding: 0 30px;
        border-radius: 25px;
        h3{
            margin: 30px 0;
            text-align: center;
            font-weight: normal;
            font-size: 20px;
            color: #fff;
        }
        i.iconfont{
            position: absolute;
            top:6px;
            left:8px;
            font-size: 27px;
            color: #fff;
        }
        .el-input{
            width:100%;
            input{
                height: 48px;
                border-radius: 30px;
                background: rgba(255,255,255,0);
                color: #fff;
                border: 1px solid #fff;
                padding-left: 60px;
            }
        }
        .el-button{
            width:100%;
            &.btn-doLogin{
                border-radius: 30px;
                height: 50px;
                background-color: #02a5f7;
                box-shadow: 0 10px 50px 0 #02a5f7;
                font-size:20px;
            }
        }
    }
}

</style>