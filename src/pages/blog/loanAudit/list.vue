<template>
    <div id="loanAuditlist" class="st-card">
        <el-tabs type="border-card" @tab-click="tabSwitch">
            <el-tab-pane label="待放款标的" class="m-yetLoan">
                <el-row type="flex" justify="center" class="m-content">
                    <el-table :data="yetLoanlist">
                        <el-table-column prop="name" label="标的名称" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="real_name" label="借款人名称" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="account" label="标的金额" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="apr" label="年化利率" min-width="100" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="time_limit" label="投资期限" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="addtime" label="成立时间" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="id" label="操作" min-width="100" header-align="center" align="center">
                            <template scope="tableOp">
                                <el-button type="text" @click="goPage('/loanMag/loanAuditcf/'+tableOp.row.id)">放款</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="已放款标的" class="m-ardLoan">
                <el-row type="flex" justify="center" class="m-content">
                    <el-table :data="ardLoanlist">
                        <el-table-column prop="name" label="标的名称" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="real_name" label="借款人名称" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="account" label="标的金额" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="apr" label="年化利率" min-width="100" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="time_limit" label="投资期限" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="addtime" label="成立时间" min-width="200" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="id" label="操作" min-width="100" header-align="center" align="center">
                            <template scope="tableOp"><!-- 跳转到标详情 -->
                                <el-button type="text" @click="goPage('/loanMag/table/'+tableOp.row.id)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-row class="searchContainer">
            <el-col :span="24">
                <hqbSch :realSchopt="searchForm" :fakeSchopt="schOldval" :allrefs="this.$refs" ref="hqbSch"></hqbSch>
            </el-col>
        </el-row>
        <hqbPage :schOpt="schOldval" :ctrlOpt="apiCtrl" :ajaxUrl="'/api/manageApi/makeLoan'" @getData="getPageData" ref="hqbPage"></hqbPage>
    </div>
</template>

<script>
import hqbPage from '@/components/loanMag/page';
import hqbSch from '@/components/loanMag/search';
export default {
    name: 'loanAuditlist',
    data: function(){
        return{
            searchType:1,//判断不同tab下走不同请求
            searchForm:{
                name:''
            },
            searchFormrules:{},
            yetLoanlist:[],
            ardLoanlist:[],
            schOldval:{//存储旧的搜索参数
                name:''
            },
            apiCtrl:{
                method_name:'list',
                type:1
            }
        }
    },
    components:{
        hqbPage,
        hqbSch
    },
    methods:{
        goPage(val){//跳转
            this.$router.push({path:val})
        },
        getPageData(rslt){
            if(this.searchType == 1){
                this.yetLoanlist = rslt;
            }else{
                this.ardLoanlist = rslt;
            }
        },
        tabSwitch(tab, e){
            if((tab.index==0&&this.searchType==1)||(tab.index==1&&this.searchType==2)) return;
            this.searchForm.name='';
            this.schOldval.name='';
            this.$refs.hqbPage.pagesize = 15;
            if(tab.index==0){
                this.searchType = 1;
                this.$refs.hqbPage.childApictrl = {
                    method_name:'list',
                    type:1
                }
            }else if(tab.index==1){
                this.searchType = 2;
                this.$refs.hqbPage.childApictrl = {
                    method_name:'list',
                    type:2
                }
            }
            if(this.$refs.hqbPage.page === 1){
                this.$refs.hqbPage.getData({});
            }else{
                this.$refs.hqbPage.page = 1;
            }
        }
    }

}
</script>

<style lang="less">
    #loanAuditlist{
        position: relative;
        .el-table{
            border:none;
        }
        .el-tabs__item{
            height: 50px;
            line-height: 50px;
        }
        .el-tabs__content{
            padding:0;
            overflow: visible;
        }
        .el-tabs--border-card{
            border:none;
            box-shadow:none;
        }
        .searchContainer{
            position: absolute;
            top:7px;
            right:0;
            .u-seeFlog{
                margin: 0 15px;
            }
            .el-form-item{
                float: left;
                margin-bottom: 0;
            }
        }
        .u-page{
            padding:20px;
        }
    }
</style>