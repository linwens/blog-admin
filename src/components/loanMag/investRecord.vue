<template>
    <div id="investRecord">
        <el-row class="u-title">
            <el-col :span="10" class="tt-investLog">投资记录</el-col>
            <el-col :span="14" class="sum-invest">
                <!-- 具名slot插槽预存所有可能需要的dom，如果不需要直接在父组件中设置空，如满标复审确认页 -->
                <slot name="investRate"><div><span>投资比例：</span> <i>{{investTb.total.investRate?investTb.total.investRate:0}}</i></div></slot>
                <slot name="investMoney"><div><span>投资金额：</span> <i>{{investTb.total.investMoney?investTb.total.investMoney:0}}</i>元</div></slot>
                <div><span>投资人数：</span> <i>{{investTb.total.total_people?investTb.total.total_people:0}}</i>人</div>
                <div><span>投资人次：</span> <i>{{investTb.total.total_times?investTb.total.total_times:0}}</i>次</div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle" class="m-content">
            <el-table :data="investTb.list" stripe>
                <el-table-column prop="number" label="序号" min-width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="phone" label="投资人" min-width="200" header-align="center" align="center"></el-table-column>
                <el-table-column prop="account" label="标的金额(元)" min-width="200" header-align="center" align="center"></el-table-column>
                <el-table-column prop="avalid_account" label="有效金额(元)" min-width="200" header-align="center" align="center"></el-table-column>
                <el-table-column prop="addtime" label="投资时间" min-width="200" header-align="center" align="center" :formatter="timeFormat"></el-table-column>
                <el-table-column prop="red_packet" label="抵扣券(元)" min-width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="cash_counpon" label="现金券(元)" min-width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="interest_coupon" label="加息券" min-width="100" header-align="center" align="center"></el-table-column>
                <el-table-column prop="eProtocols" label="电子协议" min-width="100" header-align="center" align="center">
                    <template scope="tableOp">
                        <el-button type="text" @click="goPage('/loanMag/protocols/'+tableOp.row.id)">查看协议</el-button>
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
    </div>
</template>

<script>
//import '@/assets/........' //引入less
import { timeFormat } from '@/assets/js/cmn/util'  //引入vue插件,或其他组件
export default {
    name: 'investRecord',
    data: function(){
        return{
            investTb: {
                total:{},
                list:[]
            },
            pagination:{
                totalSize:400,
                curPage:1,
                pageSize:15
            }
        }
    },
    props: ['id'],
    components:{},
    methods:{
        goPage(val){//跳转
            this.$router.push({path:val})
        },
        getData(curPage, pageSize){//公共方法
            this.getAjax('/api/manageApi/borrow/tender',{id:this.id, page:curPage, page_size:pageSize},'GET').then(data=>{
                this.investTb.list = data.information_list;
                this.investTb.total = data.information;
                this.pagination.totalSize = data.page_info?data.page_info.total_number:0;
            });
        },
        handleSizeChange(val) {//获取每页条数
            if(this.pagination.curPage === 1){
                this.getData(1, val);
            }else{
                this.pagination.pageSize = val;
                this.pagination.curPage = 1;
            }
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {//获取当前页数据
            this.pagination.curPage = val;
            this.getData(val, this.pagination.pageSize);
            console.log(`当前页: ${val}`);
        },
        timeFormat(row, column){//时间戳转化
            return timeFormat(row.addtime)
        }
    },
    mounted () {
        this.getData(1, this.pagination.pageSize);
    }

}
</script>
    
<style lang="less">
    .tt-investLog{
        font-size: 16px;
        color: #1F2D3D;
    }
    .sum-invest{
        text-align: right;
        >div{
            display: inline-block;
            margin-left: 20px;
        }
        font-size: 14px;
        color: #1F2D3D;
        i{
            color: #ff4949;
        }
    }
</style>