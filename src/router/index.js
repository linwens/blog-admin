import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
import Router from 'vue-router'
/*------引入页面组件------*/
import {Admin_index, Blog, Html5, Gallery} from '@/router/map/admin'
import {Guests_index, Guests, VChart, G_unfind} from '@/router/map/guests'
const Login = resolve => require(['@/pages/login'], resolve);
const Unfind = resolve => require(['@/pages/unfind'], resolve);
Vue.use(Router);
//公共路由
export const cmnRouterMap = [
    {//404路由
        path: '/404',
        name: 'unfind',
        component: Unfind,
        hidden: true,  //是否在左侧列表显示
    },
    {//入口路由
        path: '/login',
        name: '登录页',
        component: Login,
        hidden: true,
    }
];

export const asyncRouterMap = [
    Admin_index,//我的主页
    Guests_index,//游客主页
    Guests,//游客栏
    VChart,//游客图表
    Blog,//我的博客
    Html5,//我的H5
    Gallery,//我的照片
    G_unfind,//游客404
    {
        path: '*',//如果路由不匹配跳转到404,注意要放在最后面
        hidden: true,
        redirect: { path: '/404' }
    }
];
const router = new Router({
    routes:cmnRouterMap
});
if (store.state.user.uid||store.state.user.type==='guests') {
    //生成动态侧边栏
    store.dispatch('ADD_ROUTERS',store.state.user).then(res=>{
        var lcHash = window.location.hash;
        router.options.routes = res;
        console.log('-------1------');
        router.addRoutes(res);
        console.log('-------2------');
        router.replace({path: lcHash.substr(1,lcHash.length-1)});//替换当前url，实现刷新
    });
}

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth||!to.name) {//动态路由还没生成，to.name=null
        if (store.state.user.uid||store.state.user.type==='guests') {
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});
router.afterEach(router => {
});
export default router
