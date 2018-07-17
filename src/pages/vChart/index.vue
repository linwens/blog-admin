<template>
    <div id="Chart_index">
        <!-- 这里是数据统计图页,我希望放的东西有：1、上部走马灯组件;2、下部详细内容图 
        https://github.com/apertureless/vue-chartjs-->
        <el-card shadow='hover'>
            <el-row>
                <el-col :span="2">
                    <div>
                        <el-radio v-model="type" :label="1">Bar</el-radio>
                    </div>
                    <div>
                        <el-radio v-model="type" :label="2">Doughnut</el-radio>
                    </div>
                    <div>
                        <el-radio v-model="type" :label="3">Pie</el-radio>
                    </div>
                    <div>
                        <el-radio v-model="type" :label="4">Line</el-radio>
                    </div>
                </el-col>
                <el-col :span="22">
                    <Bar v-if="type===1" css-classes="m-chart-container" :height="200" :color="$store.state.theme.themeColor"></Bar>
                    <Doughnut v-else-if="type===2" css-classes="m-chart-container" :height="200" :color="$store.state.theme.themeColor"></Doughnut>
                    <Pie v-else-if="type===3" css-classes="m-chart-container" :height="200" :color="$store.state.theme.themeColor"></Pie>
                    <line-chart v-else="type===4" css-classes="m-chart-container" :height="200" :color="$store.state.theme.themeColor"></line-chart>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    //import '@/assets/........' //引入less
    import BarChart from './bar-chart.vue'
    import DoughnutChart from './doughnut-chart.vue'
    import PieChart from './pie-chart.vue'
    import LineChart from './line-chart.vue'
    export default{
        name:'Chart_index',
        data: function(){
            return {
                type:1,
            }
        },
        components:{
            Bar:BarChart,
            Doughnut:DoughnutChart,
            Pie:PieChart,
            lineChart:LineChart
        }
    }
</script>
<style lang="less">
    #Chart_index{
        .m-chart-container{
            width:80%;
            margin:0 auto;
        }
    }
</style>