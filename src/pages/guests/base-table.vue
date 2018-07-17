<template>
    <div id="Guest_table">
        <!-- 这里是基础数据表格页,我希望放的东西有：
        1、常规表格列表（表头，分页，筛选工具栏）ok
        2、弹窗操作 ok
        3、信息提示 ok
        4、跳转文章编辑 ok
        5、筛选工具栏：关键字搜索ok，排序ok，批量操作，
        6、tab切换，使用keep-live ok
        -->
        <el-card>
            <el-tabs tab-position="left">
                <el-tab-pane label="文章列表">
                    <el-row>
                        <el-col :span="24">
                            <el-select v-model="sequence" placeholder="排序方式" @change="doSeque">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-input placeholder="请输入内容" v-model="keywords" class="input-with-select">
                                <el-select v-model="schType" slot="prepend" placeholder="范围" class="innerSelect">
                                    <el-option label="文章标题" value="title"></el-option>
                                    <el-option label="文章简介" value="brief"></el-option>
                                </el-select>
                                <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table :data="artList" stripe border class="m-el-table" :header-cell-class-name="'th-bgc'">
                            <el-table-column type="selection" min-width="20" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="title" label="文章标题" min-width="100" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="brief" label="文章简介" min-width="300" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="time" label="文章发布日期" min-width="80" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                            <el-table-column prop="aid" label="操作" min-width="80" header-align="center" align="center">
                                <template slot-scope="tableOp">
                                    <el-badge :value="(tableOp.row.operate&&tableOp.row.operate==='save')?'未发':''" class="u-badge">
                                        <el-button size="small" type="primary" @click="goPage('/guests/v-markdown/'+tableOp.row.aid)"><i class="el-icon-edit el-icon--left"></i>修改</el-button>
                                    </el-badge>
                                    <el-button size="small" type="danger" @click="handleDelete(tableOp.$index, tableOp.row)"><i class="el-icon-delete2 el-icon--left"></i>删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row type="flex" justify="end">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="curPage"
                            :page-sizes="[5, 10, 20]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalNum"
                            background
                        >
                        </el-pagination>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="已删除文章">
                    <el-row>
                        <el-table :data="delList" class="m-el-table" :show-header="false">
                            <el-table-column type="expand" min-width="20" header-align="center" align="center">
                                <template slot-scope="props">
                                    {{ props.row.brief }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="title" min-width="500" header-align="center" align="left"></el-table-column>
                            <el-table-column prop="time" min-width="100" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                            <el-table-column prop="aid" min-width="50" header-align="center" align="center">
                                <template slot-scope="tableOp">
                                    <el-button plain size="small" type="success" @click="handleRestore(tableOp.$index, tableOp.row)"><i class="el-icon-delete2 el-icon--left"></i>还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row type="flex" justify="end">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange2"
                            :current-page="delCurPage"
                            :page-sizes="[5, 10, 20]"
                            :page-size="delPagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="delArtlist.length"
                        >
                        </el-pagination>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
    import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
    import { Notification } from 'element-ui';

    export default{
        name:'Guest_table',
        data: function(){
            return {
                searchForm:{
                    schWord:''
                },
                artList: [],
                delList:[],
                schOldval:{//存储旧的搜索参数
                    schWord:''
                },
                apiCtrl:{},
                totalNum:0,//文章列表文章总数
                curPage: 1,
                pagesize:5,
                delCurPage:1,
                delPagesize:5,
                options: [{
                  value: '-1',
                  label: '发布时间由近到远'
                }, {
                  value: '1',
                  label: '发布时间由远到近'
                }],
                sequence: '',//排序
                keywords:'',//搜索关键字
                schType:'',//搜索范围
                checked:false,//批量选择
                curSque:{type:'',val:1},//当前排序规则
                curList:1,//当前哪类文章列表，1:原文章列表;2:筛选后文章列表;3:被删除文章列表
            }
        },
        components:{},
        computed:{
            articleList(){
                return this.$store.state.mockdatas.articleList;
            },
            delArtlist(){
                return this.$store.state.mockdatas.delArtlist;
            },
            filterArtlist(){
                return this.$store.state.mockdatas.filterArtlist;
            }
        },
        watch:{
            articleList(){
                //this.artList = this.$store.state.mockdatas.articleList;
                if(this.curList===1){
                    this.getData({type:'artList'});
                }
            },
            delArtlist(){
                //this.delList = this.$store.state.mockdatas.delArtlist;
                this.getData({curPage:this.delCurPage, pageSize:this.delPagesize,type:'delList'});
            },
            filterArtlist(){
                if(this.curList===2){
                    this.getData({type:'filterArtlist'});
                }
            }
        },
        methods: {
            doSearch(){
                //搜索功能
                this.$store.dispatch('FILTER_ARTICLE',{
                    keywords:this.keywords,
                    schType:this.schType
                }).then(()=>{
                    //this.artList = this.$store.state.mockdatas.filterArtlist;
                    this.curPage = 1;
                    this.curList = 2;
                    this.getData({type:'filterArtlist'});
                });
            },
            doSeque(val){
                this.curSque.type='time';
                this.curSque.val=val;
                this.$store.dispatch('SORT_ARTICLE',{
                    type:this.curSque.type,
                    val:val,
                });
            },
            goPage(val){//跳转
                this.$router.push({path:val})
            },
            timeFormat(row, column){//时间戳转化
                return timeFormat(row[column.property])
            },
            handleDelete(index, row) {
                this.$confirm("此操作将删除文章，请仔细检查再确认?", '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let place = (this.curPage-1)*this.pagesize+index;
                    console.log(place);
                    this.$store.dispatch('DEL_ARTICLE',{index:place,curList:this.curList});
                    console.log(this.delList);
                }).catch(err => {});
            },
            handleRestore(index, row){
                let place = this.delList.length>this.delPagesize?(this.curPage-1)*this.delPagesize+index:index;
                this.$store.dispatch('RESTORE_ARTICLE', {index:place,sortRule:this.curSque,curList:this.curList});//第二个参数是当前排序规则，第三个是搜索后当前列表
            },
            getData({curPage=this.curPage, pageSize=this.pagesize, type="artList"}){
                let params = Object.assign({}, this.schOpt, {curPage:curPage, pageSize:pageSize});
                let allData = this.$store.state.mockdatas;
                if(type==='artList'){
                    this.artList = allData.articleList.slice((curPage-1)*pageSize, (curPage-1)*pageSize+pageSize);
                    this.totalNum = allData.articleList.length;
                }else if(type==='delList'){
                    this.delList = allData.delArtlist.slice((curPage-1)*pageSize, (curPage-1)*pageSize+pageSize);
                }else{
                    this.artList = allData.filterArtlist.slice((curPage-1)*pageSize, (curPage-1)*pageSize+pageSize);
                    this.totalNum = allData.filterArtlist.length;
                }
            
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {//获取文章当前页数据
                console.log(`第 ${val} 页`);
                this.curPage = val;
                if(this.curList===1){
                    this.getData({curPage:val});
                }else if(this.curList===2){
                    this.getData({curPage:val, type:'filterArtlist'});
                }
            },
            handleCurrentChange2(val) {//获取已删除文章当前页数据
                console.log(`第 ${val} 页`);
                this.delCurPage = val;
                this.getData({curPage:val, pageSize:this.delPagesize,type:'delList'});
            }
        },
        mounted(){
            this.getData({});
        }
    }
</script>
<style lang="less">
    #Guest_table{
        .th-bgc{
            background-color: #FAFAFA;
            >div.cell{
                background-color: #FAFAFA;
            }
        }
        .el-tab-pane .el-table tr:nth-child(2n-1){
            background: #fff;
        }
        .input-with-select{
            width: 300px;
            .innerSelect{
                width:110px;
            }
        }
        .m-el-table{
            margin: 30px 0;
        }
        
        .m-util{
            padding: 20px 0 15px;
            .el-form{
                float: right;
            }
            .el-form-item{
                float: left;
                margin-bottom: 0;
            }
        }
        .u-page{
            padding:20px;
        }
        .docOutputbtn{
            float: left;
        }
        /*角标提示*/
        .el-table .cell{
            overflow: visible;
        }
        .u-badge{
            .el-badge__content{
                right: 80px;
                background-color: #f7ba2a;
            }
        }
    }
</style>