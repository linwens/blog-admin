const Home = resolve => require(['@/pages/home'], resolve);
const publish = resolve => require(['@/pages/blog/publish'], resolve);
const articleList = resolve => require(['@/pages/blog/articleList'], resolve);
export default {//module1,挂载在主页面home上
	path: '/blog',
	name: 'blog',
	component: Home,
	redirect: '/blog/page', //页面重定向(新增)
	icon: 'iconfont icon-caidanlan-jiekuanguanli',
	children:[//子模块内容
		{
	    	path: 'publish/:id',
	    	name: '文章发布',
	    	components: {
	    		page:publish
	    	},
	    	meta: {
                requireAuth: true,
                roles:[1126]
            }
	    },
	    {
	    	path: 'list',
	    	name: '文章列表',
	    	components: {
	    		page:articleList
	    	},
	    	meta: {
                requireAuth: true,
                roles:[1126]
            }
	    }
	]
}