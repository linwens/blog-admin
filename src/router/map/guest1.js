const Home = resolve => require(['@/pages/home'], resolve);
const Index = resolve => require(['@/pages/guest1/index'], resolve);

export default{
	path:'/guest1',
	name:'guest1',
	component:Home,
	redirect:'/guset1/index',
	icon: 'iconfont icon-caidanlan-jiekuanguanli',//自定义属性
	children:[
		{
	    	path: 'index',
	    	name: '游客1首页',
	    	components: {
	    		page:Index
	    	},
	    	meta: {
                roles:[2]
            }
	    }
	]
}