<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="onSaleli">
        <el-row class="m-util searchContainer">
            <el-col :span="24">
                <hqbSch :realSchopt="searchForm" :fakeSchopt="schOldval" :allrefs="this.$refs" ref="hqbSch">
                    <span slot="seeFailLog"></span>
                </hqbSch>
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
            <hqbPage :schOpt="schOldval" :ctrlOpt="apiCtrl" :ajaxUrl="'/api/manageApi/borrow'" @getData="getPageData" ref="hqbPage"></hqbPage>
        </el-row>
    </div>
</template>

<script>
import hqbPage from '@/components/loanMag/page';
import hqbSch from '@/components/loanMag/search';
import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
export default {
    name: 'onSaleli',
    data: function(){
        return{
            searchForm:{
                name:''
            },
            onSalelist: [],
            schOldval:{//存储旧的搜索参数
                name:''
            },
            apiCtrl:{
                method_name:'list',
                status:1
            }
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
            this.onSalelist = rslt;
        },
        timeFormat(row, column){//时间戳转化
            return timeFormat(row.addtime)
        }
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