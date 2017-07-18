import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index'
//import md5 from 'js-md5';
import { Loading, Message, Notification } from 'element-ui'
// import qs from 'querystring' //post参数化方法封装
//截取URL的传参并生成signa
/*
 *signa = url后面的所有传参，除了signa，再加'|secret_token',所得的字符串最后再MD5
 */
// function createSigna(paramObj,secret){
//     if (paramObj == null) return '';
//     var paramStr = '';
//     let keys = Object.keys(paramObj).sort(),
//         newObj = {};
//     keys.forEach(n => {
//         newObj[n] = paramObj[n]
//     })
//     for(var key in newObj){
//         paramStr += '&' + key + '=' + paramObj[key]
//     }
//     paramStr += '|'+secret;
//     //console.log(paramStr);
//     return md5(paramStr)
// };

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //baseURL: 'http://testh5.huaqiaobao.cn',
    timeout: 5000
});
// http请求拦截器
var loadinginstace;
instance.interceptors.request.use(config => {
    // element ui Loading方法
    loadinginstace = Loading.service({ fullscreen: true })
    //只有在已经登录的情况下才设置请求头
    // if(store.state.user.oauth_token) {
    //     let ts = parseInt(new Date().getTime()/1000);
    //     // console.log('params='+JSON.stringify(config.params));
    //     let paramsObj = config.params ? Object.assign({}, config.params) : {};
    //     paramsObj.appkey = 'A17E6270B7D358DA4B75E67F71949472';
    //     paramsObj.oauth_token = `${store.state.user.oauth_token}`;
    //     paramsObj.ts = ts;
    //     paramsObj.version = '2.6';
    //     //TODO: config.data传输类型为fomr-data; 改为param则url之后参数拼接(取到params值赋值给data,并且清空params)
    //     config.params =  Object.assign(config.params, {
    //         oauth_token: `${store.state.user.oauth_token}`,
    //         appkey: 'A17E6270B7D358DA4B75E67F71949472',
    //         ts: ts,
    //         version:'2.6',
    //         signa: createSigna(paramsObj, `${store.state.user.secret_token}`)
    //     });
    //     config.headers.Authorization = JSON.stringify({
    //         "oauth_token": `${store.state.user.oauth_token}`,
    //         "appkey":'A17E6270B7D358DA4B75E67F71949472',
    //         "ts": ts,
    //         "version":'2.6',
    //         "signa": createSigna(paramsObj, `${store.state.user.secret_token}`)
    //     });
    // }
    //console.log('config='+JSON.stringify(config.params));
    return config
}, error => {
    loadinginstace.close()
    Notification.error({
        message:'请求超时',
        customClass:'hqb-notice',
        offset:300
    })
    // Message.error({
    //     message: '请求超时'
    // })
    return Promise.reject(error)
})
// http响应拦截器
instance.interceptors.response.use(res => {// 响应成功关闭loading
    loadinginstace.close()
    if(res.data.res_code == 3||res.data.res_code == 4) {//接口返回错误为登录失效code则返回登录页，否则继续下一步
        store.commit('USER_LOGOUT');
        router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
        })
        return Promise.reject(res);
    }
    if(res.data.res_code != 1) {
        Notification.error({
            message: res.data.res_msg,
            customClass:'hqb-notice',
            offset:300
        })
        // Message.error({
        //     message: res.data.res_msg
        // })
        return Promise.reject(res);
    }
    return res
}, error => {
    loadinginstace.close();
    Notification.error({
        message:'加载失败',
        customClass:'hqb-notice',
        offset:300
    })
    // Message.error({
    //     message: '加载失败'
    // })
    return Promise.reject(error)
})
export default instance;
