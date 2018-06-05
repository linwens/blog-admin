const Home = resolve => require(['@/pages/home'], resolve);
const Index = resolve => require(['@/pages/vChart/index'], resolve);

export default{
	path:'/vChart',
	name:'vChart',
	component:Home,
	redirect:'/vChart/index',
	icon: 'iconfont icon-areachart',//自定义属性
	meta: {
        requireAuth: true,
        roles:[2]
    },
	children:[
		{
	    	path: 'index',
	    	name: 'vue-chart图表',
	    	components: {
	    		page:Index
	    	},
	    	meta: {
	    		requireAuth: true,
                roles:[2]
            }
	    }
	]
}