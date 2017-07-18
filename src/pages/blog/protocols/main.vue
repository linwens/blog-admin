<!-- 该项目每个vue文件的代码模板 -->
<template>
    <div id="protocolbox">
        <div class="m-borrowProtocol" v-if="protocolType==0">
            <protc-three :contnet="protocolCont"></protc-three>
        </div>
        <div class="m-borrowProtocol" v-else-if="protocolType==1">
            <protc-four :contnet="protocolCont"></protc-four>
        </div>
        <div class="m-borrowProtocol" v-else>
            <protc-lemuji :contnet="protocolCont"></protc-lemuji>
        </div>
    </div>
</template>

<script>
import protcThree from './protocol-three';
import protcFour from './protocol-four';
import protcLemuji from './protocol-lemuji';
export default {
    name: 'protocolbox',
    data: function(){
        return{
            protocolType:'',
            protocolCont:[]
        }
    },
    components:{
        'protc-three': protcThree,
        'protc-four': protcFour,
        'protc-lemuji': protcLemuji
    },
    methods:{
        getData({id=this.$route.params.id}){//请求借款协议接口
            this.getAjax('/apitest/rest/borrow/investProtocol',{tender_id:id, access_token:this.$store.state.user.oauth_token},'GET').then(data=>{
                var rslt = data.information;
                this.protocolCont = rslt;
                if(rslt.warrantor_status){//四方
                    this.protocolType = 1;
                    if(rslt.protocol_template_name=='lemuji'){//乐木几
                        this.protocolType = 3;
                    }
                }else{//三方
                    this.protocolType = 0;
                }
            });
        }
    },
    mounted () {
        this.getData({});
    }

}
</script>
    
<style lang="less">
    #protocolbox{
        .m-borrowProtocol{
            width: 964px;
            background: #fff;
            margin: 20px auto 190px;
            padding: 40px 98px;
            -moz-user-select:none;
        }
        .m-borrowProtocol p{
            line-height: 26px;
            font-size: 14px;
            color: #6c6c6c;
        }
        .m-borrowProtocol h2{
            margin: 10px 0 15px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        .m-borrowProtocol h3{
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
        }
        .m-borrowProtocol h4{
            font-size: 14px;
            font-weight: bold;
        }
        .m-borrowProtocol table{
            border-collapse:collapse;
            margin-top: 15px;
        }
        .m-borrowProtocol table td{
            height: 49px;
            line-height: 49px;
        }
        .m-borrowProtocol table tr td:nth-child(1){
            width: 129px;
            padding-left:20px;
        }
        .m-borrowProtocol table tr td:nth-child(2){
            width: 288px;
            padding-left:30px;
        }
        .m-borrowProtocol table.lemuji-table tr td:nth-child(2){/*乐木几协议*/
            width: 610px;
        }
        .m-borrowProtocol table,.m-borrowProtocol table td{
            border:1px solid #6c6c6c;
        }
        .m-borrowProtocol .st-mb{
            margin-bottom: 20px;
        }
        .m-borrowProtocol div.u-seal{
            margin-bottom: 80px;
            overflow: hidden;
        }
        .m-borrowProtocol div.u-seal p{
            height: 198px;
            line-height: 198px;
            width: 50%;
            float: left;
        }
        .m-borrowProtocol div.u-seal img{
            height: 198px;
            width: 198px;
            vertical-align: middle;
        }
        .m-borrowProtocol div.m-tips h3{
            text-align: center;
        }
        .m-borrowProtocol div.m-tips p{
            color: red;
        }
    }
</style>