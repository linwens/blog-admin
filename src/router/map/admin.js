/*引入组件*/
const Home = resolve => require(['@/pages/home'], resolve);
	//blog
const publish = resolve => require(['@/pages/blog/publish'], resolve);
const articleList = resolve => require(['@/pages/blog/articleList'], resolve);
	//Html5
const addItem = resolve => require(['@/pages/html5/addItem'], resolve);
const h5List = resolve => require(['@/pages/html5/h5List'], resolve);
	//gallery
const upload = resolve => require(['@/pages/gallery/upload'], resolve);
const imgList = resolve => require(['@/pages/gallery/imgList'], resolve);
	//Admin_index
const Index = resolve => require(['@/pages/index/index'], resolve);

/*router config*/
export const Blog = {//module1,挂载在主页面home上
	path: '/blog',
	name: 'blog',
	component: Home,
	redirect: '/blog/page', //页面重定向(新增)
	icon: 'iconfont icon-bokexinwen',
	meta: {
        requireAuth: true,
        roles:[1126]
    },
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

export const Html5 = {//module1,挂载在主页面home上
	path: '/html5',
	name: 'html5',
	component: Home,
	redirect: '/html5/page', //页面重定向(新增)
	icon: 'iconfont icon-html5',
	meta: {
        requireAuth: true,
        roles:[1126]
    },
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

export const Gallery = {//module1,挂载在主页面home上
	path: '/gallery',
	name: 'gallery',
	component: Home,
	redirect: '/gallery/page', //页面重定向(新增)
	icon: 'iconfont icon-i-img',
	meta: {
        requireAuth: true,
        roles:[1126]
    },
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

export const Admin_index = {
    path:'/',
    name:'首页',
    component:Home,
    meta:{
        requireAuth:true,
        roles:[1126]
    },
    icon: 'iconfont icon-caidanlan-shouye',
    redirect: '/index',
    children:[
        {
            path:'index',
            name:'我的主页',
            components:{
                page:Index
            },
            meta:{
                requireAuth:true,
                role:[1126]
            },
            hidden:true,
        }
    ]
}