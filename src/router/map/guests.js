const Home = resolve => require(['@/pages/home'], resolve);
const Index = resolve => require(['@/pages/guests/index'], resolve);
const BaseTable = resolve => require(['@/pages/guests/base-table'], resolve);
const VMarkdown = resolve => require(['@/pages/guests/v-markdown'], resolve);
const VUpload = resolve => require(['@/pages/guests/v-upload'], resolve);

export default{
	path:'/guests',
	name:'guests',
	component:Home,
	redirect:'/guests/index',
	icon: 'iconfont icon-iconguest',//自定义属性
	meta: {
        requireAuth: true,
        roles:[2]
    },
	children:[
		{
	    	path: 'index',
	    	name: '游客首页',
	    	components: {
	    		page:Index
	    	},
	    	meta: {
	    		requireAuth: true,
                roles:[2]
            }
	    },
	    {
	    	path: 'base-table',
	    	name: '基础表格',
	    	components: {
	    		page:BaseTable
	    	},
	    	meta: {
	    		requireAuth: true,
                roles:[2]
            }
	    },
	    {
	    	path: 'v-markdown',
	    	name: '文本编辑器',
	    	components: {
	    		page:VMarkdown
	    	},
	    	meta: {
	    		requireAuth: true,
                roles:[2]
            }
	    },
	    {
	    	path: 'v-upload',
	    	name: '文件上传',
	    	components: {
	    		page:VUpload
	    	},
	    	meta: {
	    		requireAuth: true,
                roles:[2]
            }
	    }
	]
}