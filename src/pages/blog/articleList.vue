<template>
    <div id="articleList">
        <el-row class="m-util searchContainer">
            <el-col :span="6">
                <hqbSch :realSchopt="searchForm" :fakeSchopt="schOldval" :allrefs="this.$refs" ref="hqbSch">
                    <span slot="seeFailLog"></span>
                </hqbSch>
            </el-col>
        </el-row>
        <el-row class="borderStyle">
            <el-row type="flex" justify="center" align="middle" class="m-content">
                <el-table :data="artList" stripe>
                    <el-table-column prop="title" label="文章标题" min-width="100" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="brief" label="文章简介" min-width="300" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="time" label="文章发布日期" min-width="100" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                    <el-table-column prop="aid" label="操作" min-width="100" header-align="center" align="center">
                        <template scope="tableOp">
                            <el-button size="small" type="primary" @click="goPage('/blog/publish/'+tableOp.row.aid)"><i class="el-icon-edit el-icon--left"></i>修改</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(tableOp.$index, tableOp.row)"><i class="el-icon-delete2 el-icon--left"></i>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <hqbPage :schOpt="schOldval" :ctrlOpt="apiCtrl" :ajaxUrl="'/ajax/getList'" @getData="getPageData" ref="hqbPage"></hqbPage>
        </el-row>
    </div>
</template>

<script>
import hqbPage from '@/components/loanMag/page';
import hqbSch from '@/components/loanMag/search';
import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
import { Notification } from 'element-ui';
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