const Home = resolve => require(['@/pages/home'], resolve);

const upload = resolve => require(['@/pages/gallery/upload'], resolve);
const imgList = resolve => require(['@/pages/gallery/imgList'], resolve);
export default {//module1,挂载在主页面home上
	path: '/gallery',
	name: 'gallery',
	component: Home,
	redirect: '/gallery/page', //页面重定向(新增)
	icon: 'iconfont icon-caidanlan-jiekuanguanli',
	children:[//子模块内容
		{
	    	path: 'upload/:id',
	    	name: '增加图片',
	    	components: {
	    		page:upload
	    	},
	    	meta: {
                requireAuth: true,
                roles:[1126]
            }
	    },
	    {
	    	path: 'list',
	    	name: '图片列表',
	    	components: {
	    		page:imgList
	    	},
	    	meta: {
                requireAuth: true,
                roles:[1126]
            }
	    }
	]
}