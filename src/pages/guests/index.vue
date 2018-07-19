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
                            <p>登录IP：{{ipInfo.ip}}</p>
                            <p>登录地址：{{ipInfo.addr}}</p>
                            <p>运营商：{{ipInfo.carrier}}</p>
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
                                @change="changeDone"
                                @active-change="changeTheme"
                            ></el-color-picker>
                        </el-col>
                    </el-row>
                    <div class="u-userInfo"></div>
                    <div class="u-switch"></div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-card shadow="hover" class="m-statistics">
                            <i class="iconfont icon-wenzhangliebiaoxiangqing" :style="{backgroundColor:dynamicColor('color(primary h(+8) s(90%) l(*0.99))')}"></i>
                            <div class="u-count">
                                <p>50</p>
                                <span>已发文章</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" class="m-statistics">
                            <i class="iconfont icon-daiqueren" :style="{backgroundColor:dynamicColor('color(primary shade(50%))')}"></i>
                            <div class="u-count">
                                <p>26</p>
                                <span>待发文章</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" class="m-statistics">
                            <i class="iconfont icon-fangkeshu" :style="{backgroundColor:dynamicColor('color(primary tint(30%))')}"></i>
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
                            <!-- 5、项目进度条(点击进度条展示)ok -->
                            <h2>近期项目</h2>
                            <el-row type="flex" justify="center" class="m-circle-box">
                                <el-col :span="8">
                                    <h3>vue后台系统</h3>
                                    <div class="u-progress" @click="showDetail(1)">
                                        <el-progress type="circle" :width="140" :percentage="0" :stroke-width="8" :color="$store.state.theme.themeColor"></el-progress>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <h3>express个人博客</h3>
                                    <div class="u-progress" @click="showDetail(2)">
                                        <el-progress type="circle" :width="140" :percentage="50" :stroke-width="8" :color="$store.state.theme.themeColor"></el-progress>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <h3>react-native DEMO</h3>
                                    <div class="u-progress" @click="showDetail(3)">
                                        <el-progress type="circle" :width="140" :percentage="100" :stroke-width="8" :color="$store.state.theme.themeColor"></el-progress>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="6"><!-- 剥离出来做个组件 -->
                        <el-card shadow="hover" class="m-progress-detail" :body-style="{height:'80%'}">
                            <!-- 5、相应项目计划表ok -->
                            <h2>项目详情</h2>
                            <transition name='slide'>
                                <el-steps direction="vertical" :active="projectDetail.state" class="u-steps" v-if="projectDetail.name==='project1'" key="project1">
                                    <el-step :title="item.title" :description="item.desc" v-for="(item,index) in projectDetail.infoList" :key="item.id"></el-step>
                                </el-steps>
                                <el-steps direction="vertical" :active="projectDetail.state" class="u-steps" v-else-if="projectDetail.name==='project2'" key="project2">
                                    <el-step :title="item.title" :description="item.desc" v-for="(item,index) in projectDetail.infoList" :key="item.id"></el-step>
                                </el-steps>
                                <el-steps direction="vertical" :active="projectDetail.state" class="u-steps" v-else="projectDetail.name==='project3'" key="project3">
                                    <el-step :title="item.title" :description="item.desc" v-for="(item,index) in projectDetail.infoList" :key="item.id"></el-step>
                                </el-steps>
                            </transition>
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
                        <el-col :span="8" v-for="(item, index) in needsPool" :key="item.tabKey">
                            <el-card shadow="never" :body-style="{backgroundColor:'#eee'}">
                                <el-dropdown :hide-on-click="false">
                                    <span class="el-dropdown-link">
                                    {{item.tabName}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>{{item.desc}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <draggable v-model="item.dragItemlist" :options="{group:'demand'}" @start="drag=true" @end="drag=false" class="m-dragZone">
                                    <div v-for="element in item.dragItemlist" :key="element.id" class="u-dragItem">
                                        <i class="el-icon-close" @click="delIdea(item,element.id)"></i>
                                        <el-input
                                          type="textarea"
                                          :autosize="{ minRows: 2}"
                                          placeholder="请输入内容"
                                          v-model="element.name">{{element.name}}
                                        </el-input>
                                    </div>
                                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addIdea(item)">添加点子</el-button>
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
    import {generateColors, colorsFn} from '@/assets/js/cmn/color'
    import color from 'css-color-function'
    export default{
        name:'Guest_index',
        data: function(){
            return {
                userType:this.$store.state.user.type,
                myColor:this.$store.state.theme.themeColor,
                originalStyle:'',//原始主题css string
                middleStyle:'',//色值转换为关键字后的主题css string
                newStyle:'',//新的主题css string
                isInserted:false,
                pfColor:[//颜色预选值
                    '#E2A5F4',
                    '#90E8EE',
                    '#90ee90',
                    '#00ced1',
                    '#409EFF',
                ],
                avatorBg:{
                    backgroundImage:''
                },
                sidebarState:!this.$store.state.theme.sideBarCol,
                needsPool:[
                    {
                        tabKey:1,
                        tabName:'灵光一现',
                        desc:'想到的需求',
                        dragItemlist:[
                            {
                                name:'vuejs原理了解下',
                                id:'1',
                            },
                            {
                                name:'react搞起？',
                                id:'2',
                            }
                        ]
                    },
                    {
                        tabKey:2,
                        tabName:'就是干',
                        desc:'正在努力实现的需求',
                        dragItemlist:[
                            {
                                name:'vue后台系统',
                                id:'5',
                            },
                            {
                                name:'express个人博客',
                                id:'6',
                            }
                        ]
                    },
                    {
                        tabKey:3,
                        tabName:'你好棒棒',
                        desc:'完成并上线的需求',
                        dragItemlist:[
                            {
                                name:'react-native DEMO',
                                id:'7',
                            },
                            {
                                name:'个人博客',
                                id:'8',
                            },
                        ]
                    }
                ],
                projectDetail:{},
                project1:{
                    name:'project1',
                    state:0,
                    infoList:[
                        {
                            id:'11',
                            title:'创建项目',
                            desc:'2018.06.05'
                        },
                        {
                            id:'12',
                            title:'页面开发',
                            desc:'2018.06.06'
                        },
                        {
                            id:'13',
                            title:'本地mock',
                            desc:'2018.06.16'
                        },
                        {
                            id:'14',
                            title:'接口联调',
                            desc:'2018.06.19'
                        },
                        {
                            id:'15',
                            title:'项目测试',
                            desc:'2018.06.24'
                        },
                        {
                            id:'16',
                            title:'项目发布',
                            desc:'2018.07.01'
                        }
                    ]
                },
                project2:{
                    name:'project2',
                    state:3,
                    infoList:[
                        {
                            id:'21',
                            title:'创建项目',
                            desc:'2018.06.05'
                        },
                        {
                            id:'22',
                            title:'页面开发',
                            desc:'2018.06.06'
                        },
                        {
                            id:'23',
                            title:'本地mock',
                            desc:'2018.06.16'
                        },
                        {
                            id:'24',
                            title:'接口联调',
                            desc:'2018.06.19'
                        },
                        {
                            id:'25',
                            title:'项目测试',
                            desc:'2018.06.24'
                        },
                        {
                            id:'26',
                            title:'项目发布',
                            desc:'2018.07.01'
                        }
                    ]
                },
                project3:{
                    name:'project3',
                    state:6,
                    infoList:[
                        {
                            id:'31',
                            title:'创建项目',
                            desc:'2018.06.05'
                        },
                        {
                            id:'32',
                            title:'页面开发',
                            desc:'2018.06.06'
                        },
                        {
                            id:'33',
                            title:'本地mock',
                            desc:'2018.06.16'
                        },
                        {
                            id:'34',
                            title:'接口联调',
                            desc:'2018.06.19'
                        },
                        {
                            id:'35',
                            title:'项目测试',
                            desc:'2018.06.24'
                        },
                        {
                            id:'36',
                            title:'项目发布',
                            desc:'2018.07.01'
                        }
                    ]
                },
                ipInfo:{
                    ip:'未获取',
                    addr:'未获取',
                    carrier:'未获取',
                }
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
              return 'guests';
            },
            avatorPic(){
              return 'http://otvt0q8hg.bkt.clouddn.com/luffy.jpg';
            }
        },
        methods:{
            toggleSidebar (val){//参数就是新值
                //参考NavMenu导航菜单
                this.$store.dispatch('BAR_SWITCH');
            },
            showDetail (i){
                console.log('进入showDetail');
                //展示项目详情
                this.projectDetail = this['project'+i];
            },
            changeTheme(val){
                //change事件是点击确定后触发
                //active-change是选择颜色后实时展示
                let newColor = '';
                if(val.indexOf('#')<0){
                    newColor = colorsFn.toHSL(val);
                }else{
                    newColor = val;
                }
                this.myColor = newColor;
                this.$store.dispatch('CHANGE_COLOR',newColor);
                this.middleStyle = Object.assign({}, {'primary':this.myColor}, generateColors(this.myColor));//新的色值关键字json
                let cssText = this.originalStyle
                Object.keys(this.middleStyle).forEach(key => {
                    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.middleStyle[key])
                })
                this.newStyle = cssText;
            },
            changeDone(){
                console.log('确定颜色');
                this.insertStyle();
            },
            addIdea(item){
                //增加点子
                let curPoolIndex = this.needsPool.findIndex((val)=>{
                    return val.tabKey === item.tabKey;
                });
                let curList = this.needsPool[curPoolIndex].dragItemlist;
                let len = curList.length;
                curList.push([{
                    name:'',
                    id:len,
                }]);
            },
            delIdea(item,id){
                //删除点子
                //找到信息所在栏
                let curPoolIndex = this.needsPool.findIndex((val)=>{
                    return val.tabKey === item.tabKey;
                });
                let curList = this.needsPool[curPoolIndex].dragItemlist;
                //找到具体信息
                let curEleIndex = curList.findIndex((val)=>{
                    return val.id === id;
                });
                curList.splice(curEleIndex,1)
            },
            /*切换主题色相关 start */
            //获取默认样式文件资源
            getThemeStr(){
                let headFirstStyle = document.head.children[2].innerText;//写死了第二个
                this.originalStyle = this.getStyleTemplate(headFirstStyle);
            },
            //修改色值为关键字
            getStyleTemplate (data) {
                const colorMap = {
                  '#3a8ee6': 'shade-1',
                  '#409eff': 'primary',
                  '#53a8ff': 'light-1',
                  '#66b1ff': 'light-2',
                  '#79bbff': 'light-3',
                  '#8cc5ff': 'light-4',
                  '#a0cfff': 'light-5',
                  '#b3d8ff': 'light-6',
                  '#c6e2ff': 'light-7',
                  '#d9ecff': 'light-8',
                  '#ecf5ff': 'light-9'
                }
                Object.keys(colorMap).forEach(key => {
                  const value = colorMap[key]
                  data = data.replace(new RegExp(key, 'ig'), value)
                })
                return data
            },
            //插入document
            insertStyle(){
                console.log('插入style');
                if(!this.isInserted){//防止多次插入
                    let style = document.createElement('style');
                    style.innerText = this.newStyle;
                    document.head.appendChild(style);
                    this.isInserted = true;
                }else{
                    document.head.lastChild.innerText = this.newStyle;
                }
            },/*切换主题色相关 end*/
            dynamicColor(val){//加几个自定义颜色值
                let colorStr = val.replace(/primary/g, this.$store.state.theme.themeColor);
                let rgb = color.convert(colorStr);
                return rgb;
            },
            getIP(){//调用站长之家的ip查询工具
                this.getAjax(this.HOST+'/ajax/getIP',{},'GET',true).then(data=>{
                    this.ipInfo.ip = data.ip;
                    let addrArr = data.address.split(' ');
                    this.ipInfo.addr = addrArr[0]?addrArr[0]:'未获取';
                    this.ipInfo.carrier =  addrArr[1]?addrArr[1]:'未获取';
                })
            }
        },
        mounted(){
            this.projectDetail = this.project1;
            this.getThemeStr();
            this.getIP();
        }
    }
</script>
<style lang="less">
    @import '~@/assets/less/utils/theme.less';
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
                .u-progress{
                    display: inline-block;
                    cursor: pointer;
                }
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
                position: relative;
                box-sizing: border-box;
                min-height: 60px;
                padding: 20px 10px;
                margin: 10px auto;
                font-size: 14px;
                color: #909399;
                background-color: #fff;
                border-radius: 5px;
                &:hover{
                    .el-icon-close{
                        display: block;
                    }
                };
                .el-icon-close{
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    display: none;
                    cursor: pointer;
                }
                .el-textarea__inner{
                    border:none;
                    resize:none;
                }
            }
        }
    }
    /*项目详情展示动画*/
    .slide-enter-active{
        animation: fadeInRight .3s linear;
    }
    .slide-leave-active{
        animation: fadeInRight 0s linear reverse;
    }
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>