import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
import Router from 'vue-router'
/*页面引入及路由编写，请用路由嵌套存放子页面*/

import blog from '@/router/map/blog'

const Home = resolve => require(['@/pages/home'], resolve);
const Login = resolve => require(['@/pages/login'], resolve);
const Unfind = resolve => require(['@/pages/unfind'], resolve);
const Index = resolve => require(['@/pages/index/index'], resolve);

Vue.use(Router)
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
        {
            path: '*',//如果路由不匹配跳转到404,注意要放在最后面
            hidden: true,
            redirect: { path: '/404' }
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.user.uid) {
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})


router.afterEach(router => {
    
});
export default router
