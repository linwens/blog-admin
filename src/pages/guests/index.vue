<template>
    <div id="Guest_index">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="m-userPad">
                    <!-- 1、用户基本信息(头像，昵称，登录时间，登录ip)</br>
                    3、网站样式切换开关 -->
                    <el-row type="flex" align="middle">
                        <el-col :span="12" class="u-avator" :style="avatorBg"></el-col>
                        <el-col :span="12" class="u-nickname">
                            <p>{{nickName}}</p>
                            <span>超级管理员</span>
                        </el-col>
                    </el-row>
                    <el-row class="u-loginInfo">
                        <el-col>
                            <p>最近一次登录：2018-06-05</p>
                            <p>本次登录地址：浙江杭州</p>
                        </el-col>
                    </el-row>
                    <el-row type="flex" align="middle">
                        <el-col :span="8">
                            隐藏/显示侧边栏：
                        </el-col>
                        <el-col :span="4">
                            <el-switch
                                v-model="sidebarState"
                                @change="toggleSidebar"
                            ></el-switch>
                        </el-col>
                    </el-row>
                    <el-row type="flex" align="middle">
                        <el-col :span="8">
                            切换主题色：
                        </el-col>
                        <el-col :span="4">
                            <el-color-picker
                                v-model="myColor"
                                :predefine="pfColor"
                            ></el-color-picker>
                        </el-col>
                    </el-row>
                    <div class="u-userInfo">
                        
                    </div>
                    <div class="u-switch"></div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-card shadow="hover" class="m-statistics">
                            <i class="iconfont icon-wenzhangliebiaoxiangqing"></i>
                            <div class="u-count">
                                <p>50</p>
                                <span>已发文章</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" class="m-statistics">
                            <i class="iconfont icon-daiqueren"></i>
                            <div class="u-count">
                                <p>26</p>
                                <span>待发文章</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" class="m-statistics">
                            <i class="iconfont icon-fangkeshu"></i>
                            <div class="u-count">
                                <p>123</p>
                                <span>访客数</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-card shadow="hover" class="m-progress">
                            <!-- 5、项目进度条(点击进度条展示) -->
                            <h2>近期项目</h2>
                            <el-row type="flex" justify="center" class="m-circle-box">
                                <el-col :span="8">
                                    <h3>vue后台系统</h3>
                                    <el-progress type="circle" :width="140" :percentage="0" :stroke-width="8" color=""></el-progress>
                                </el-col>
                                <el-col :span="8">
                                    <h3>express个人博客</h3>
                                    <el-progress type="circle" :width="140" :percentage="50" :stroke-width="8" color=""></el-progress>
                                </el-col>
                                <el-col :span="8">
                                    <h3>react-native DEMO</h3>
                                    <el-progress type="circle" :width="140" :percentage="100" :stroke-width="8" color=""></el-progress>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="6"><!-- 剥离出来做个组件 -->
                        <el-card shadow="hover" class="m-progress-detail" :body-style="{height:'80%'}">
                            <!-- 5、相应项目计划表 -->
                            <h2>项目详情</h2>
                            <el-steps direction="vertical" :active="1" class="u-steps">
                                <el-step title="创建项目" description="2018.06.05"></el-step>
                                <el-step title="页面开发" description="2018.06.06"></el-step>
                                <el-step title="本地mock" description="2018.06.16"></el-step>
                                <el-step title="接口联调" description="2018.06.19"></el-step>
                                <el-step title="项目测试" description="2018.06.24"></el-step>
                                <el-step title="项目发布" description="2018.07.01"></el-step>
                            </el-steps>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-card shadow="hover" class="m-drag">
                    <!-- 4、事件备忘录(三列展示：灵光一现~pre、就是干~doing、你好棒棒~done，拖入拖出实现增删)Vue.Draggable, ui模仿teambition,    npm install vuedraggable sortablejs --save -->
                    <h2>需求池</h2>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-card shadow="never" :body-style="{backgroundColor:'#eee'}">
                                <el-dropdown :hide-on-click="false">
                                    <span class="el-dropdown-link">
                                    灵光一现<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>当前栏描述</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <draggable v-model="demandArr" :options="{group:'demand'}" @start="drag=true" @end="drag=false" class="m-dragZone">
                                   <div v-for="element in demandArr" :key="element.id" class="u-dragItem">{{element.name}}</div>
                                </draggable>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="never" :body-style="{backgroundColor:'#eee'}">
                                <el-dropdown :hide-on-click="false">
                                    <span class="el-dropdown-link">
                                    就是干<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>当前栏描述</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <draggable v-model="doingArr" :options="{group:'demand'}" @start="drag=true" @end="drag=false" class="m-dragZone">
                                   <div v-for="element in doingArr" :key="element.id" class="u-dragItem">{{element.name}}</div>
                                </draggable>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="never" :body-style="{backgroundColor:'#eee'}">
                                <el-dropdown :hide-on-click="false">
                                    <span class="el-dropdown-link">
                                    你好棒棒<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>当前栏描述</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <draggable v-model="doneArr" :options="{group:'demand'}" @start="drag=true" @end="drag=false" class="m-dragZone">
                                   <div v-for="element in doneArr" :key="element.id" class="u-dragItem">{{element.name}}</div>
                                </draggable>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    //import '@/assets/........' //引入less
    import draggable from 'vuedraggable';
    export default{
        name:'Guest_index',
        data: function(){
            return {
                userType:this.$store.state.user.type,
                myColor:'#1e90ff',
                pfColor:[
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                ],
                avatorBg:{
                    backgroundImage:''
                },
                sidebarState:true,
                demandArr:[
                    {
                        name:'vuejs',
                        id:'1',
                    }
                ],
                doingArr:[
                    {
                        name:'fighting',
                        id:'5',
                    }
                ],
                doneArr:[
                    {
                        name:'great',
                        id:'6',
                    }
                ]
            }
        },
        components:{
            draggable,
        },
        created(){
            this.avatorBg.backgroundImage = 'url('+this.avatorPic+')';//created里给头像背景图设置style样式
        },
        computed:{
            nickName(){
              let nn = '';
              if(this.userType==='guests'){
                nn = 'admin';
              }else{
                nn = '努力的小林';
              }
              return nn;
            },
            avatorPic(){
              let ap = '';
              if(this.userType==='guests'){
                ap = 'http://otvt0q8hg.bkt.clouddn.com/smile.png';
              }else{
                ap = 'http://osurqoqxj.bkt.clouddn.com/IMG_4106.jpg';
              }
              return ap;
            }
        },
        methods:{
            toggleSidebar (val){//参数就是新值
                //参考NavMenu导航菜单
                console.log(val);
                console.log('开关控制左侧边栏');
            }
        }
    }
</script>
<style lang="less">
    #Guest_index{
        .el-row{
            margin-bottom: 20px;
        }
        .m-userPad{
            height: 422px;
            .u-avator{
                width: 150px;
                height: 150px;
                border-radius: 150px;
                overflow: hidden;
                text-align: center;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
            .u-nickname{
                margin-left: 20px;
                p{
                    font-size: 30px;
                    color: #303133;  
                }
                span{
                    font-size: 12px;
                    color: #909399;
                }
            }
            .u-loginInfo{
                padding-top: 10px;
                border-top: 2px solid #DCDFE6;
                p{
                    color: #909399;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        .m-statistics{
            overflow: hidden;
            height: 130px;
            i.iconfont{
                position: relative;
                left: -20px;
                top: -20px;
                width: 130px;
                height: 130px;
                line-height: 130px;
                float: left;
                text-align: center;
                font-size: 50px;
                color: #fff;
            }
            i.iconfont.icon-wenzhangliebiaoxiangqing{
                background: #1E90FF;
            }
            i.iconfont.icon-daiqueren{
                background: #FF4500;
            }
            i.iconfont.icon-fangkeshu{
                background: #02D902;
            }
            div.u-count{
                float: left;
                p{
                    line-height: 56px;
                    font-size: 30px;
                    font-weight: bold;
                    color: #606266;
                }
                span{
                    font-size: 16px;
                    color: #C0C4CC;
                }
            }
        }
        .m-progress{
            height: 270px;
            h2{
                font-size: 20px;
                margin-bottom: 20px;
            }
            h3{
                font-size: 16px;
                color: #909399;
                margin-bottom: 10px;
            }
            .m-circle-box{
                text-align: center;
            }
        }
        .m-progress-detail{
            height: 500px;
            h2{
                font-size: 20px;
                margin-bottom: 20px;
            }
            .u-steps{
                margin-left: 20px;
            }
        }
        .m-drag{
            min-height: 300px;
            margin-top: -250px;
            h2{
                font-size: 20px;
                margin-bottom: 20px;
            }
            .m-dragZone{
                width: 100%;
                min-height: 100px;
                background-color: #eee;
            }
            .u-dragItem{
                width: 90%;
                height: 80px;
                padding: 10px 10px 10px 20px;
                margin: 10px auto;
                font-size: 14px;
                color: #909399;
                background-color: #fff;
                border-radius: 5px;
            }
        }
    }
</style>