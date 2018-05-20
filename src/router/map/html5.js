const Home = resolve => require(['@/pages/home'], resolve);

const addItem = resolve => require(['@/pages/html5/addItem'], resolve);
const h5List = resolve => require(['@/pages/html5/h5List'], resolve);
export default {//module1,挂载在主页面home上
	path: '/html5',
	name: 'html5',
	component: Home,
	redirect: '/html5/page', //页面重定向(新增)
	icon: 'iconfont icon-caidanlan-jiekuanguanli',
	children:[//子模块内容
		{
	    	path: 'addItem/:id',
	    	name: '增加H5',
	    	components: {
	    		page:addItem
	    	},
	    	meta: {
                requireAuth: true,
                roles:[1126]
            }
	    },
	    {
	    	path: 'list',
	    	name: 'H5列表',
	    	components: {
	    		page:h5List
	    	},
	    	meta: {
                requireAuth: true,
                roles:[1126]
            }
	    }
	]
}