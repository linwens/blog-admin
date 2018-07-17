<template>
	<!-- https://blog.csdn.net/harsima/article/details/77949465 -->
	<div id="sideBar">
		<el-menu
			:background-color="$store.state.theme.themeColor"
			:text-color="'#fff'"
			:active-text-color="'#fff'"
			:collapse="isCollapse"
			:unique-opened="isUnique"
			:router="true"
			class="el-menu-vertical-demo"
		>
			<template v-for="(menu,index) in routeArray"><!-- 把for循环从el-menu中拿出来放入template里，不然unique-opened不会生效 -->
				<el-submenu v-if="isSubmenu(menu)" :index="menu.path" :key="index">
					<template slot="title">
					    <i :class="menu.icon"></i>
					    <span slot="title">{{menu.name}}</span>
					</template>
					<el-menu-item v-if="!item.hidden" v-for="(item,cIndex) in menu.children" :index="menu.path+'/'+item.path" :key="cIndex">
						{{item.name}}
					</el-menu-item>
				</el-submenu>
				<el-tooltip v-else-if="!menu.hidden" class="item" effect="dark" :content="menu.name" placement="right" :disabled="!isCollapse">
				    <el-menu-item :index="menu.path" :key="index">
    					<i :class="menu.icon"></i>
    					<span>{{menu.name}}</span>
    				</el-menu-item>
				</el-tooltip>
			</template>
		</el-menu>
	</div>
</template>
<script>
	
	export default{
		name:'sidebar',
		data:function(){
			return {
				routeArray:[],
				isUnique:true
			}
		},
		computed:{
			isCollapse(){
				return this.$store.state.theme.sideBarCol;
			}
		},
		methods:{
			isSubmenu(menu){
				if(menu.children){
					let child = menu.children;
					for(let j=0;j<child.length;j++){
						if(!child[j].hidden){//如果大路由下存在子路由，且有一个子路由是要显示的，就生成submenu
							return true;
						}
					}
				}else{
					return false;
				}
				
			}
		},
		created(){
			let routes = this.$router.options.routes;
			this.routeArray = routes.filter(v=>{
				return true
			});
		}
	}
</script>
<style lang="less">
	#sideBar{
		i{
			color: #fff;
			margin-right: 3px;
		}
		.is-active{
			background-color: rgb(24, 115, 204)!important;
			&:before {
			    content: '●';
			    position: absolute;
			    margin-left: -15px;
			}
		}
		.el-menu{
			border:none;
		}
		.el-submenu__title,.el-menu-item{
			border-right: 0 solid rgba(255,255,255,0.5);
			transition: all 0.3s ease-out;
			&:hover,&.is-active{
				border-width: 4px;
			}
		}
		/*collapse*/
		.el-menu--collapse{

		}
		.el-menu-vertical-demo:not(.el-menu--collapse) {
		    width: 100%;
		    min-height: 400px;
		}
	}
</style>