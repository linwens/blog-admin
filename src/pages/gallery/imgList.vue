<template>
    <div id="imgList">
        <el-row class="m-util searchContainer">
            <el-col :span="6">
                <hqbSch :realSchopt="searchForm" :fakeSchopt="schOldval" :allrefs="this.$refs" ref="hqbSch">
                    <span slot="seeFailLog"></span>
                </hqbSch>
            </el-col>
        </el-row>
        <el-tabs type="border-card" @tab-click="tab_shift">
            <el-tab-pane label="图片作品">
                <el-row type="flex" justify="center" align="middle" class="m-content">
                    <el-table :data="imgList" stripe>
                        <el-table-column prop="url" label="图片预览" min-width="100" header-align="center" align="center">
                            <template scope="scope"><img style="width:140px;height:70px;vertical-align: middle;" :src="scope.row.url" alt=""></template>
                        </el-table-column>
                        <el-table-column prop="title" label="图片标题" min-width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="desc" label="图片介绍" min-width="250" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="time" label="作品发布日期" min-width="150" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                        <el-table-column prop="hid" label="操作" min-width="150" header-align="center" align="center">
                            <template scope="tableOp">
                                <el-button size="small" type="primary" @click="goPage('/gallery/upload/'+tableOp.row.gid)"><i class="el-icon-edit el-icon--left"></i>修改</el-button>
                                <el-button size="small" type="danger" @click="handleDelete(tableOp.$index, tableOp.row)"><i class="el-icon-delete2 el-icon--left"></i>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="blog截图">
                <el-row type="flex" justify="center" align="middle" class="m-content">
                    <el-table :data="imgList" stripe>
                        <el-table-column prop="url" label="图片预览" min-width="100" header-align="center" align="center">
                            <template scope="scope"><img style="width:140px;height:70px;vertical-align: middle;" :src="scope.row.url" alt=""></template>
                        </el-table-column>
                        <el-table-column prop="title" label="图片标题" min-width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="desc" label="图片介绍" min-width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="url" label="图片外链" min-width="400" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="time" label="作品发布日期" min-width="150" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                        <el-table-column prop="hid" label="操作" min-width="150" header-align="center" align="center">
                            <template scope="tableOp">
                                <el-button size="small" type="primary" @click="goPage('/gallery/upload/'+tableOp.row.gid)"><i class="el-icon-edit el-icon--left"></i>修改</el-button>
                                <el-button size="small" type="danger" @click="handleDelete(tableOp.$index, tableOp.row)"><i class="el-icon-delete2 el-icon--left"></i>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-tab-pane>
            <hqbPage :schOpt="schOldval" :dataType="imgType" :ctrlOpt="apiCtrl" :ajaxUrl="'/ajax/getImglist'" @getData="getPageData" ref="hqbPage"></hqbPage>
        </el-tabs>
    </div>
</template>

<script>
import hqbPage from '@/components/page';
import hqbSch from '@/components/search';
import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
import { Notification } from 'element-ui';
export default {
    name: 'imgList',
    data: function(){
        return{
            searchForm:{
                schWord:''
            },
            imgList: [],
            schOldval:{//存储旧的搜索参数
                schWord:''
            },
            apiCtrl:{},
            imgType:'galleryImg'
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
            this.imgList = rslt;
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
                this.getAjax(this.HOST+'/ajax/removeImg',{gid:row.gid},'POST').then(data=>{
                    Notification({
                        type:'success',
                        message:'图片删除成功',
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
        tab_shift(tab){
            //搜索条件清除
            this.schOldval.schWord = this.searchForm.schWord = '';
            switch(tab.index){
                case '1': this.imgType='blogImg';
                    break;
                default: this.imgType='galleryImg';
            }
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