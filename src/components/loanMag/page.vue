<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="pagination">
        <el-row type="flex" justify="end" align="middle" class="u-page">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    data: function(){
        return{
            page: 1,
            total: 0,
            contents: [],
            pagesize: 10,
            childApictrl:this.ctrlOpt
        }
    },
    props: ['schOpt', 'ctrlOpt', 'ajaxUrl'],
    components:{},
    methods:{
        getData({curPage=this.page, pageSize=this.pagesize}){
            let params = Object.assign({}, this.schOpt, {curPage:curPage, pageSize:pageSize});
            this.getAjax(this.HOST+this.ajaxUrl, params,'GET').then(res=>{
                if(res.dataList.length > 0) {
                    this.contents = res.dataList;
                    this.total = res.total;
                } else {
                    this.contents = [];
                    this.total = 0;
                }
                this.$emit('getData', this.contents);
            });
        },
        handleCurrentChange(val) {//获取当前页数据
            this.page = val;
            this.getData({curPage:val});
        }
    },
    mounted () {
        this.getData({});
    }
}
</script>
    
<style>
    
</style>