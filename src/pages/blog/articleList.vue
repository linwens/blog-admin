<template>
    <div id="articleList">
        <el-row class="m-util searchContainer">
            <el-col :span="24">
                <hqbSch :realSchopt="searchForm" :fakeSchopt="schOldval" :allrefs="this.$refs" ref="hqbSch">
                    <span slot="seeFailLog"></span>
                </hqbSch>
            </el-col>
        </el-row>
        <el-row class="borderStyle">
            <el-row type="flex" justify="center" align="middle" class="m-content">
                <el-table :data="artList" stripe>
                    <el-table-column prop="title" label="文章标题" min-width="100" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="text" label="文章正文" min-width="200" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="time" label="文章发布日期" min-width="200" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                    <el-table-column prop="aid" label="操作" min-width="100" header-align="center" align="center">
                        <template scope="tableOp">
                            <el-button type="text" @click="goPage('/blog/publish/'+tableOp.row.aid)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <hqbPage :schOpt="schOldval" :ctrlOpt="apiCtrl" :ajaxUrl="'/api/ajax/getList'" @getData="getPageData" ref="hqbPage"></hqbPage>
        </el-row>
    </div>
</template>

<script>
import hqbPage from '@/components/loanMag/page';
import hqbSch from '@/components/loanMag/search';
import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
export default {
    name: 'articleList',
    data: function(){
        return{
            searchForm:{
                schWord:''
            },
            artList: [],
            schOldval:{//存储旧的搜索参数
                schWord:''
            },
            apiCtrl:{}
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
            for(let i = 0;i<rslt.length;i++){//截取第一对HTML标签内(<,>)的文案
                var stt = rslt[i].text.indexOf('>');
                var end = rslt[i].text.indexOf('<',1);
                if(end>20){
                    end = 20
                }
                rslt[i].text = rslt[i].text.substring(stt+1, end)+'...';
            }
            this.artList = rslt;
        },
        timeFormat(row, column){//时间戳转化
            return timeFormat(row[column.property])
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