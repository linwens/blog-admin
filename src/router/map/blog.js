const Home = resolve => require(['@/pages/home'], resolve);

const onSalecf = resolve => require(['@/pages/blog/onSale/confirm'], resolve);
const onSaleli = resolve => require(['@/pages/blog/onSale/list'], resolve);

const loanAuditli = resolve => require(['@/pages/blog/loanAudit/list'], resolve);
const loanAuditcf = resolve => require(['@/pages/blog/loanAudit/confirm'], resolve);
const loanAuditlog = resolve => require(['@/pages/blog/loanAudit/failLog'], resolve);

const protocols = resolve => require(['@/pages/blog/protocols/main'], resolve);

const publish = resolve => require(['@/pages/blog/publish'], resolve);
const articleList = resolve => require(['@/pages/blog/articleList'], resolve);
const upload = resolve => require(['@/pages/blog/upload'], resolve);
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
            }
	    },
	    {
	    	path: 'upload',
	    	name: '图片上传',
	    	components: {
	    		page:upload
	    	},
	    	meta: {
                requireAuth: true,
            }
	    },
	    {
	    	path: 'onSaleli',
	    	name: '上线开售',
	    	components: {
	    		page:onSaleli
	    	},
	    	meta: {
                requireAuth: true,
            }
	    },
	    {
	    	path: 'onSalecf/:id',
	    	name: '上线确认',
	    	components: {
	    		page:onSalecf
	    	},
	    	meta: {
                requireAuth: true,
                isAction: '/blog/onSaleli',
            },
            hidden:true,
            noDropdown: true
	    },
	    {
	    	path: 'loanAuditli',
	    	name: '放款审核',
	    	components: {
	    		page:loanAuditli
	    	},
	    	meta: {
                requireAuth: true,
            }
	    },
	    {
	    	path: 'loanAuditcf/:id',
	    	name: '放款确认',
	    	components: {
	    		page:loanAuditcf
	    	},
	    	meta: {
                requireAuth: true,
                isAction: '/blog/loanAuditli',
            },
            hidden:true,
            noDropdown: true
	    },
	    {
	    	path: 'loanAuditlog',
	    	name: '放款失败日志',
	    	components: {
	    		page:loanAuditlog
	    	},
	    	meta: {
                requireAuth: true,
                isAction: '/blog/loanAuditli',
            },
            hidden:true,
            noDropdown: true
	    },
	    {
	    	path: 'protocols/:id',
	    	name: '借款协议',
	    	components: {
	    		page:protocols
	    	},
	    	meta: {
                requireAuth: true,
                isAction: '/blog',
            },
            hidden:true,
            noDropdown: true
	    }
	]
}