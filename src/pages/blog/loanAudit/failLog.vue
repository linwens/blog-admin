<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="loanAuditlog">
        <el-row class="m-util">
            <el-col :span="24">
                <el-form :model='searchForm' :rules="searchRules" ref="searchForm" label-width="60px" label-position="right" class="searchContainer">
                    <el-form-item prop="username" label="标的名称" label-width="100px">
                        <el-input
                            placeholder="请输入内容模糊查询"
                            icon="search"
                            v-model="searchForm.bidName"
                            :on-icon-click="search">
                        </el-input>
                    </el-form-item>
                    <el-button type="primary" class="u-goback" @click="$router.go(-1)">返回</el-button>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="st-card">
          <el-row type="flex" justify="center" align="middle">
              <el-table :data="tableData" stripe>
                  <el-table-column prop="bidName" label="标的名称" min-width="100" header-align="center" align="center"></el-table-column>
                  <el-table-column prop="callApitime" label="接口调用时间" min-width="200" header-align="center" align="center"></el-table-column>
                  <el-table-column prop="errCode" label="错误代码" min-width="200" header-align="center" align="center"></el-table-column>
                  <el-table-column prop="errReason" label="失败原因" min-width="200" header-align="center" align="center"></el-table-column>
              </el-table>
          </el-row>
          <el-row type="flex" justify="end" align="middle" class="u-page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
          </el-row>
        </el-row>
    </div>
</template>

<script>
//import '@/assets/........' //引入less
export default {
    name: 'loanAuditlog',
    data: function(){
        return{
            currentPage: 1,
            searchForm:{
                bidName:''
            },
            searchRules:{},
            tableData: [],
            dialogShow:false
        }
    },
    components:{},
    methods: {
        goPage(val){
            this.$router.push({path:val})
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        getData(){
            this.getAjax('/api/searchOnsaleli',{},'GET').then(data=>{
                            this.tableData = data;
                        });
        },
        search(){
            this.getAjax('/api/searchOnsaleli',{bidName:this.searchForm.bidName},'GET').then(data=>{
                this.tableData = data;
            });
        }
    },
    mounted(){
        this.getData();
    }
}
</script>

<style lang="less">
    #loanAuditlog{
        .m-util{
            padding: 20px;
            .el-form{
                float: right;
            }
            .el-form-item{
                float: left;
                margin-bottom: 0;
            }
            .u-goback{
              margin-left: 15px;
            }
        }
        .st-card{
            background: #FFFFFF;
            border: 1px solid #E0E6ED;
            box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.12), 0px 0px 6px 0px rgba(0,0,0,0.04);

        }
        .u-page{
            padding:20px;
        }
        .docOutputbtn{
            float: left;
        }
    }
</style>