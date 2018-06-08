<template>
    <div id="Guest_table">
        这里是基础数据表格页,我希望放的东西有：
        <p>1、常规表格列表（表头，分页，筛选工具栏）</p>
        <p>2、弹窗操作</p>
        <p>3、信息提示</p>
        <p>4、跳转文章编辑</p>
        <p>5、筛选工具栏：关键字搜索，排序，批量操作，</p>
        <p>6、tab切换，使用keep-live</p>
        <el-card>
            <el-tabs tab-position="left">
                <el-tab-pane label="文章列表">
                    <el-row>
                        <el-col :span="24">
                            <el-checkbox v-model="checked" border>批量选择</el-checkbox>
                            <el-select v-model="sequence" placeholder="排序方式">
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
                                    <el-option label="文章标题" value="1"></el-option>
                                    <el-option label="文章简介" value="2"></el-option>
                                </el-select>
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table :data="artList" stripe border class="m-el-table" :header-cell-class-name="'th-bgc'">
                            <el-table-column type="selection" min-width="20" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="title" label="文章标题" min-width="100" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="brief" label="文章简介" min-width="300" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="time" label="文章发布日期" min-width="100" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                            <el-table-column prop="aid" label="操作" min-width="100" header-align="center" align="center">
                                <template slot-scope="tableOp">
                                    <el-badge :value="(tableOp.row.operate&&tableOp.row.operate==='save')?'未发':''" class="u-badge">
                                        <el-button size="small" type="primary" @click="goPage('/blog/publish/'+tableOp.row.aid)"><i class="el-icon-edit el-icon--left"></i>修改</el-button>
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
                            :current-page="currentPage4"
                            :page-sizes="[5, 10, 20]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="60"
                        >
                        </el-pagination>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="已删除文章">
                    <el-row>
                        <el-table :data="delList" class="m-el-table" :show-header="false">
                            <el-table-column type="expand" min-width="20" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="title" min-width="500" header-align="center" align="left"></el-table-column>
                            <el-table-column prop="time" min-width="100" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                            <el-table-column prop="aid" min-width="50" header-align="center" align="center">
                                <template slot-scope="tableOp">
                                    <el-button size="small" type="danger" @click="handleDelete(tableOp.$index, tableOp.row)"><i class="el-icon-delete2 el-icon--left"></i>还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row type="flex" justify="end">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[5, 10, 20]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="60"
                        >
                        </el-pagination>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
    import hqbPage from '@/components/page';
    import hqbSch from '@/components/search';
    import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
    import { Notification } from 'element-ui';

    export default{
        name:'Guest_table',
        data: function(){
            return {
                searchForm:{
                    schWord:''
                },
                artList: [
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'public',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                ],
                delList:[
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'public',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                    {
                        title:'文章标题',
                        brief:'文章简介',
                        time:1528448796,
                        aid:'001',
                        operate:'save',
                    },
                ],
                schOldval:{//存储旧的搜索参数
                    schWord:''
                },
                apiCtrl:{},
                currentPage4: 4,
                options: [{
                  value: '1',
                  label: '发布时间由近到远'
                }, {
                  value: '2',
                  label: '发布时间由远到近'
                }],
                sequence: '',//排序
                keywords:'',//搜索关键字
                schType:'',//搜索范围
                checked:false,//批量选择
            }
        },
        components:{
            hqbPage,
            hqbSch
        },
        methods: {
            goPage(val){//跳转
                this.$router.push({path:val})
            },
            getPageData(rslt){
                this.artList = rslt;
            },
            timeFormat(row, column){//时间戳转化
                return timeFormat(row[column.property])
            },
            handleDelete(index, row) {
                console.log(index+'||'+JSON.stringify(row));
                this.$confirm("此操作将删除文章，请仔细检查再确认?", '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getAjax(this.HOST+'/ajax/removeArticle',{aid:row.aid},'POST').then(data=>{
                        Notification({
                            type:'success',
                            message:'文章删除成功',
                            customClass:'hqb-notice',
                            duration:2000,
                            offset:300
                        });
                        setTimeout(()=>{
                            this.$refs.hqbPage.getData({});
                        }, 1500);
                    })
                }).catch(err => {});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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