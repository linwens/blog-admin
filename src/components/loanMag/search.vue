<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="search">
        <el-form :model='searchForm' :rules="searchFormrules" ref="searchForm" label-position="right">
            <el-form-item prop="schWord" label="标的名称" label-width="100px">
                <el-input
                    placeholder="请输入内容模糊查询"
                    icon="search"
                    v-model="searchForm.schWord"
                    :on-icon-click="search">
                </el-input>
            </el-form-item>
            <slot name="seeFailLog">
                <el-button class="u-seeFlog" @click="goPage('/errlog/curBid')">查看标的还款失败日志</el-button>
            </slot>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'search',
    data: function(){
        return{
            searchForm:this.realSchopt,
            searchFormrules:{},
            schOldval:this.fakeSchopt
        }
    },
    props: ['realSchopt','fakeSchopt', 'allrefs'],
    components:{},
    methods:{
        search(){
            if(this.schOldval.schWord==this.searchForm.schWord){
                return false;
            }else{
                this.schOldval.schWord=this.searchForm.schWord
                if(this.allrefs.hqbPage.page === 1){
                    this.allrefs.hqbPage.getData({});
                }else{
                    this.allrefs.hqbPage.page = 1;
                }
            }
        },
    }
}
</script>
    
<style>
    
</style>