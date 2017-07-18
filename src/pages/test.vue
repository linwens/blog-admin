<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="onSaleli">
        <el-row class="m-util">
            <el-col :span="24">
                <el-form :model='searchForm' ref="searchForm" label-width="60px" label-position="right" class="searchContainer">
                    <el-form-item prop="username" label="标的名称" label-width="100px">
                        <el-input
                            placeholder="请输入内容模糊查询"
                            icon="search"
                            v-model="searchForm.bidName"
                            :on-icon-click="search"
                            :maxlength="20">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="borderStyle">
            <el-row type="flex" justify="center" align="middle" class="m-content">
                <el-table :data="onSalelist" stripe>
                    <el-table-column prop="name" label="标的名称" min-width="100" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="real_name" label="借款人名称" min-width="200" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="account" label="标的金额" min-width="200" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="apr" label="年化利率" min-width="200" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="time_limit" label="投资期限" min-width="200" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="addtime" label="提交存管时间" min-width="200" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                    <el-table-column prop="id" label="操作" min-width="100" header-align="center" align="center">
                        <template scope="tableOp">
                            <el-button type="text" @click="goPage('/loanMag/onSalecf/'+tableOp.row.id)">发布</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row type="flex" justify="end" align="middle" class="u-page">
                  <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pagination.curPage"
                      :page-sizes="[10, 15, 20]"
                      :page-size="pagination.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="pagination.totalSize">
                  </el-pagination>
            </el-row>
        </el-row>
    </div>
</template>

<script>
//import '@/assets/........' //引入less
import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
export default {
    name: 'onSaleli',
    data: function(){
        return{
            searchForm:{
                bidName:''
            },
            onSalelist: [],
            pagination:{
                totalSize:400,
                curPage:1,
                pageSize:15
            },
            schOldval:{//存储旧的搜索参数
                bidName:''
            }
        }
    },
    components:{},
    methods: {
        goPage(val){//跳转
            this.$router.push({path:val})
        },
        getData(bidName, curPage, pageSize){//公共方法
            this.getAjax('/api/manageApi/borrow',{method_name:'list', status:1, name:bidName,page:curPage, page_size:pageSize},'POST').then(data=>{
                this.onSalelist = data.information.information_list;
                this.pagination.totalSize = data.information.page?data.information.page.total_number:0;
                //请求成功存储搜索参数值
                this.schOldval.bidName = bidName;
            });
        },
        handleSizeChange(val) {//获取每页条数
            if(this.schOldval.bidName!=this.searchForm.bidName){
                this.searchForm.bidName=this.schOldval.bidName;
            }
            this.pagination.pageSize = val;
            if(this.pagination.curPage === 1){
                this.getData(this.searchForm.bidName, 1, val);
            }else{
                this.pagination.curPage = 1;
            }
        },
        handleCurrentChange(val) {//获取当前页数据
            if(this.schOldval.bidName!=this.searchForm.bidName&&val!=1){
                this.searchForm.bidName=this.schOldval.bidName;
            }
            this.pagination.curPage = val;
            this.getData(this.searchForm.bidName, val, this.pagination.pageSize);
        },
        search(){//搜索
            if(this.schOldval.bidName==this.searchForm.bidName){
                return false;
            }
            if(this.pagination.curPage === 1){
                this.getData(this.searchForm.bidName, 1, this.pagination.pageSize);
            }else{
                this.pagination.curPage = 1;
            }
        },
        timeFormat(row, column){//时间戳转化
            return timeFormat(row.addtime)
        }
    },
    mounted(){
        this.getData('', 1, this.pagination.pageSize);
    }
}
</script>

<style lang="less">
    #onSaleli{
        .el-table{
            border:none;
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
        
    }
</style>