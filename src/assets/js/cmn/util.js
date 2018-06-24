import Vue from 'vue';
import instance from '@/http';//导出拦截器中声明的instance
import qs from 'qs';
//公共数字转化
export const numFormat = (num, precision)=> {//字符串加小数点
    var precision = precision || 2;
    var tmp = num?num.toString():0;
    var len = tmp.length;
    var dot = tmp.indexOf('.');
    if(!num && num!=0){
        return "";
    }
    if(dot < 0){
        tmp=tmp+'.';
        for(var i = 0;i<precision;i++){
            tmp+='0';
        }
        return tmp;
    }
    if(len<=dot+precision){
        for(;len<=dot+precision;len++){
            tmp+='0';
        }
        return tmp;
    }  
    return tmp.substr(0,dot+precision+1); 
};
//公共时间戳转换
export const timeFormat = (val, type)=> {//拼接时间戳
    if(!val) return '0000-00-00 00:00:00'
    var openDate = new Date();
    openDate.setTime(val*1000);
    var YY = openDate.getFullYear(); //获取完整的年份
    var MM = openDate.getMonth()+1; //获取当前月份
    var DD = openDate.getDate(); // 获取系统日，
    var hh = openDate.getHours(); //获取系统时，
    var mm = openDate.getMinutes(); //分
    var ss = openDate.getSeconds(); //秒
    var str = '';
    if(type == 1){//年月日
        str = YY+"-"+(MM<10?'0'+MM:MM)+"-"+(DD<10?'0'+DD:DD);
    }else if(type == 2){//时分秒
        str = (hh<10?'0'+hh:hh)+": "+(mm<10?'0'+mm:mm)+": "+(ss<10?'0'+ss:ss);
    }else{//完整时间
        str = YY+"-"+(MM<10?'0'+MM:MM)+"-"+(DD<10?'0'+DD:DD)+" "+(hh<10?'0'+hh:hh)+": "+(mm<10?'0'+mm:mm)+": "+(ss<10?'0'+ss:ss);
    }
    return str;
}
//公共请求方法，返回promise对象
export const getAjax = (url, params, type)=> {
    return new Promise((resolve, reject) => {
        instance({
            url: url,
            method: type,
            params: type==='GET'?params:'',//GET请求以URL拼接方式传参
            data: type==='POST'?qs.stringify(params):'' //POST请求以请求体传参
        }).then(res => {resolve(res.data)}).catch(err => {
            // console.log('22222'); console.log(err);
        })
    })
};
//渐变颜色值
/*将rgb转16进制*/
function clamp(v, max) {
    return Math.min(Math.max(v, 0), max);
}

function toHex(v) {
    return '#' + v.map(function (c) {
        c = clamp(Math.round(c), 255);
        return (c < 16 ? '0' : '') + c.toString(16);
    }).join('');
}

export const gradualChange = (rgba,val)=>{
    //先拿到rgba的值
    //再抄几个颜色值转换公共方法
    //再抄api方法

}
