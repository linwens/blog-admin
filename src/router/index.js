import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
import Router from 'vue-router'
/*页面引入及路由编写，请用路由嵌套存放子页面*/

import blog from '@/router/map/blog'
import html5 from '@/router/map/html5'
import gallery from '@/router/map/gallery'
import guests from '@/router/map/guests'
import vChart from '@/router/map/vChart'
const Home = resolve => require(['@/pages/home'], resolve);
const Login = resolve => require(['@/pages/login'], resolve);
const Unfind = resolve => require(['@/pages/unfind'], resolve);
const Index = resolve => require(['@/pages/index/index'], resolve);

Vue.use(Router)
/*
const router = new Router({
    routes: [
        {//一级目录只有首页及入口页面
            path: '/',
            name: '首页',
            component: Home,
            meta: {
                requireAuth: true,
            },
            noDropdown: true,
            icon: 'iconfont icon-caidanlan-shouye',
            redirect:'/index',
            children:[//子模块内容
                {
                    path: '/index',
                    components: {
                        page: Index
                    },
                    meta: {
                        requireAuth: true,
                        isAction: ''
                    },
                    hidden: true,
                }
            ]
        },
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
        },
        blog,
        html5,
        gallery,
        {
            path: '*',//如果路由不匹配跳转到404,注意要放在最后面
            hidden: true,
            redirect: { path: '/404' }
        }
    ]
});
*/
export const cmnRouterMap = [
    {//一级目录只有首页及入口页面
        path: '/',
        name: '首页',
        component: Home,
        meta: {
            requireAuth: true,
        },
        noDropdown: true,
        icon: 'iconfont icon-caidanlan-shouye',
        redirect:'/index',
        children:[//子模块内容
            {
                path: '/index',
                components: {
                    page: Index
                },
                meta: {
                    requireAuth: true,
                    isAction: ''
                },
                hidden: true,
            }
        ]
    },
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
    guests,
    vChart,
    blog,
    html5,
    gallery,
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
        router.addRoutes(res);
        router.replace({path: lcHash.substr(1,lcHash.length-1)});//替换当前url，实现刷新
    });
}
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        console.log('requireAuth');
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
