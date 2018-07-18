import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index'
//import md5 from 'js-md5';
import { Loading, Message, Notification } from 'element-ui'

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
    if(res.config.custom){//这里对返回数据做自定义处理
        console.log('-------进来自定义处理啦');
    }else{
        if(res.data.res_code == 3) {//接口返回错误为登录失效code则返回登录页，否则继续下一步
            store.commit('USER_LOGOUT');
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
            return Promise.reject(res);
        }
        if(res.data.res_code != 1&&res.data.res_code != 2) {
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
