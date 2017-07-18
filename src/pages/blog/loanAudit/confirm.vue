<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="loanAuditcf" class="st-card">
        <el-row class="st-border-bottom">
            <el-row class="u-title">产品类型/合同</el-row>
            <el-row class="st-el-row">
                <el-col :span="8">
                    <span class="u-stitle">产品类型：</span><b class="u-bind">月月赚</b>
                </el-col>
                <el-col :span="8">
                    <span class="u-stitle">合同：</span><b class="u-bind">月月赚借款合同1</b>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="st-border-bottom">
            <el-row class="u-title st-el-row">借款人</el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">借款人名称：</span><b class="u-bind">杭州凌晓资产管理有限公司</b></el-col>
                <el-col :span="8"><span class="u-stitle">银行账号：</span><b class="u-bind">1234 5678 9012 3456 789</b></el-col>
                <el-col :span="8"><span class="u-stitle">开户行：</span><b class="u-bind">广发银行杭州城西支行</b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">合同金额：</span><b class="u-bind">500000.00 元</b></el-col>
                <el-col :span="8"><span class="u-stitle">融资年化利率：</span><b class="u-bind">1.5%</b></el-col>
                <el-col :span="8"><span class="u-stitle">手续费：</span><b class="u-bind">30000.00 元</b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">罚息利率：</span><b class="u-bind">0.2‰</b></el-col>
                <el-col :span="8"><span class="u-stitle">融资期限：</span><b class="u-bind">30天</b></el-col>
                <el-col :span="8"><span class="u-stitle">借款用途：</span><b class="u-bind">经营周转</b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">申请时间：</span><b class="u-bind">2017-01-31 10:21:21</b></el-col>
            </el-row>
        </el-row>
        <el-row class="st-border-bottom">
            <el-row class="u-title st-el-row">标的信息<el-tag type="success" style="margin-left: 10px;">已上线</el-tag></el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">标的编号：</span><b class="u-bind">YYZ80-14</b></el-col>
                <el-col :span="8"><span class="u-stitle">标的名称：</span><b class="u-bind">月月赚80-14</b></el-col>
                <el-col :span="8"><span class="u-stitle">标的金额*：</span><b class="u-bind">500000.00元</b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">应还利息：</span><b class="u-bind">3721.12元</b></el-col>
                <el-col :span="8"><span class="u-stitle">手续费：</span><b class="u-bind">3000.00元</b></el-col>
                <el-col :span="8"><span class="u-stitle">总还款金额：</span><b class="u-bind">507000.00元</b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">每份金额：</span><b class="u-bind">1000.00元</b></el-col>
                <el-col :span="8"><span class="u-stitle">最低份数：</span><b class="u-bind">1</b></el-col>
                <el-col :span="8"><span class="u-stitle">最高份数：</span><b class="u-bind">无限制</b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">起息方式：</span><b class="u-bind">成立审核后起息</b></el-col>
                <el-col :span="8"><span class="u-stitle">成立方式：</span><b class="u-bind">满额成立</b></el-col>
                <el-col :span="8"><span class="u-stitle">还款方式：</span><b class="u-bind">一次性还款</b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">优惠券限制：</span><b class="u-bind"><el-tag type="danger">限制使用</el-tag></b></el-col>
                <el-col :span="8"><span class="u-stitle">有效期：</span><b class="u-bind">2天</b></el-col>
                <el-col :span="8"><span class="u-stitle">新手专享：</span><b class="u-bind"><el-tag type="danger">新手专享</el-tag></b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">创建时间：</span><b class="u-bind">2017-04-01 10：00 </b></el-col>
                <el-col :span="8"><span class="u-stitle">发布时间：</span><b class="u-bind">2017-04-01 10：00 </b></el-col>
                <el-col :span="8"><span class="u-stitle">开售时间：</span><b class="u-bind"><el-tag type="danger" style="margin-right: 10px;">定时开售</el-tag>2017-04-01 10：00 </b></el-col>
            </el-row>
            <el-row class="st-el-row">
                <el-col :span="8"><span class="u-stitle">满标时间：</span><b class="u-bind">2017-04-01 10：00 </b></el-col>
                <el-col :span="8"><span class="u-stitle">成立时间：</span><b class="u-bind">2017-04-01 10：00 </b></el-col>
                <el-col :span="8"><span class="u-stitle">放款时间：</span><b class="u-bind">2017-04-01 10：00 </b></el-col>
            </el-row>
        </el-row>
        <el-row class="st-border-bottom">
            <el-row class="u-title st-el-row">补贴设置</el-row>
            <el-row class="st-el-row">
                <el-col :span="8">
                    <span class="u-stitle">平台贴息：</span><b class="u-bind">月月赚</b>
                </el-col>
                <el-col :span="16">
                    <span class="u-stitle">会员加息：</span>
                    <div class="u-vipApr">
                        <div>
                            <p><b>会员v1</b><i class="u-bind"></i></p>
                            <p><b>会员v2</b><i class="u-bind"></i></p>
                        </div>
                        <div>
                            <p><b>会员v3</b><i class="u-bind">0.20%</i></p>
                            <p><b>会员v4</b><i class="u-bind">0.30%</i></p>
                            <p><b>会员v5</b><i class="u-bind">0.40%</i></p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row>
            <el-row class="u-title st-el-row">产品详情</el-row>
            <el-row class="st-el-row">
                <el-col :span="11">
                    <span class="u-stitle">项目介绍：</span>
                    <p class="u-projectIntri">杭州****有限公司将其持有的“华侨·中国新型城镇化基金”份额的收益权转让给****有限公司，杭州****有限公司对****有限公司享有转让价款对应的债权。现杭州****有限公司通过华侨宝平台将债权拆分转让给受让方，该债权的还款来源为：
1、第一还款来源：债务人****有限公司对杭州****有限公司应支付的基金份额收益权转让价款；
2、第二还款来源：杭州****有限公司持有的基金份额对应的本金及收益；
3、第三还款来源：平台在恒丰银行开设千万保证金，若借款人未按期兑付，将启用风险保证金先行垫付；
原产品投资范围： 浙江绿城佳园建设工程管理有限公司（注册资金10000万元）应收账款收益权转让与回购。
产品优势：
1、投资团队经验丰富，在业界均有良好口碑；
2、多重保障： 原融资方将应收账款质押给基金并在人民银行征信中心进行质押登记；中城建第十二</p>
                </el-col>
                <el-col :span="8">
                    <span class="u-stitle">保障措施：</span><b class="u-bind">中国人保财险保障资金安全。</b>
                </el-col>
            </el-row>
            <el-row class="u-title st-el-row">
                <span class="u-stitle">材料信息：</span>
                <div class="u-imgInfo">
                    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">
                </div>
            </el-row>
        </el-row>
        <el-row class="st-card">
            <investRecord :id="$route.params.id">
                <span slot="investRate"></span>
                <span slot="investMoney"></span>
            </investRecord>
        </el-row>
        <el-row>
            <el-col :span="20" class="st-fixed-bar">
                <el-button type="primary" @click="reviewCf()">放款确认</el-button>
                <el-button @click="cfChangedialog = true">修改借款人信息</el-button>
                <el-button @click="goPage('/loanMag/cutBidli')">返回</el-button>
            </el-col>
        </el-row>
        <el-dialog title="修改借款人信息" :visible.sync="cfChangedialog" custom-class="hqb-dialog">
            <el-form :model="changeInfoform" label-position="left" label-width="100px">
                <el-form-item label="开户行">
                    <el-input v-model="changeInfoform.bank" auto-complete="off" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input v-model="changeInfoform.num" auto-complete="off" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="收款人姓名">
                    <el-input v-model="changeInfoform.name" auto-complete="off" placeholder="请输入"></el-input>
                </el-form-item>
              </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cfChangedialog = false">取 消</el-button>
                <el-button type="primary" @click="borrowerInfo()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//import '@/assets/........' //引入less
import { Notification } from 'element-ui';
import investRecord from '@/components/loanMag/investRecord'
export default {
    name: 'loanAuditcf',
    data: function(){
        return{
            currentPage: 1,
            tableData: [],
            bidDetail:{
                bidName:''
            },
            cfSubmitdialog: false,
            cfChangedialog: false,
            changeInfoform:{
                bank: '',
                num:'',
                name: ''
            }
        }
    },
    components:{
        investRecord
    },
    methods:{
        goPage(val){
            this.$router.push({path:val})
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        getDetail(){
            this.getAjax('/api/onSalecf',{bidId:this.$route.params.id},'GET').then(data=>{
                this.bidDetail = data;
            });
        },
        reviewCf(){
            this.$confirm('此操作将标的成立并将款项转至借款人账号，是否继续?', '确认成标出账', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.getAjax('/apip2p/cfOnsale',{},'GET').then(data=>{
                    console.log(data.res_code);
                    if(data.res_code==1){
                        Notification({
                            type:'success',
                            //title:'成功',
                            message:'标的成标出账成功',
                            customClass:'hqb-notice',
                            duration:0,
                            offset:300
                        })
                    }else{
                        var str = '后端返回的错误信息'
                        this.$alert(str, '成标出账失败', {
                            confirmButtonText: '确定',
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            }); 
        },
        borrowerInfo(){
            this.cfChangedialog = false; 
            this.getAjax('/api/cfOnsale',{},'GET').then(data=>{
                console.log(data.res_code);
                if(data.res_code==1){
                    Notification({
                        type:'success',
                        //title:'成功',
                        message:'提交成功',
                        customClass:'hqb-notice',
                        duration:2000,
                        offset:300
                    })
                }else{
                    var str = '后端返回的错误信息'
                    this.$alert(str, '成标出账失败', {
                        confirmButtonText: '确定',
                    });
                }
            });
        }
    },
    mounted(){
        //this.getDetail();
    }
}
</script>

<style lang="less">
    #loanAuditcf{
        .u-title{
            margin-bottom: 19px;
            font-size: 18px;
            color: #1F2D3D;
            letter-spacing: 0px;
            line-height: 16px;
        }
        .u-stitle{
            display: inline-block;
            width: 98px;
            font-size: 14px;
            color: #8492A6;
            letter-spacing: 0px;
        }
        .u-bind{
            font-weight: normal;
            font-size: 14px;
            color: #1F2D3D;
            letter-spacing: 0px;
        }
        .st-card;
        .st-border-bottom{
            border-bottom:0.5px solid #979797;
        }
        .st-el-row{
            margin: 19px 0;
        }
        .st-card{
            margin-bottom: 60px;
            padding:20px;
            border: 1px solid #eee;
            box-shadow: 0 0 20px 1px #eee;
        }
        .st-fixed-bar{
            position: fixed;
            right: 0;
            bottom:0;
            z-index: 99;
            padding:20px 0;
            background: #fff;
            border-top: 1px solid #eee;
            text-align: center;
        }
        .u-vipApr{
            display: inline-block;
            vertical-align: top;
            p{
               display: inline-block;
               width: 170px;
               b{
                margin-right: 10px;
               }
               i{
                color:#ff4949;
               }
            }
        }
        .u-projectIntri{
            width: 419px;
            line-height: 19px;
            display: inline-block;
            vertical-align: top;
        }
        .u-imgInfo{
            display: inline-block;
            vertical-align: top;
            img{
                margin-right: 30px;
                height: 297px;
                width: 210px;
            }
        }
        .hqb-dialog{
            width: 460px;
            .el-dialog__footer{
                border-top: 1px solid #eee;
            }
            .el-dialog__body{
                padding-bottom: 15px;
            }
            .el-form-item{
                margin-bottom: 15px;
            }
        }
        .u-page{
            margin: 19px 0;
        }
    }
    </style>