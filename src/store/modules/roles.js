//权限动态路由思路：
/**
 *1、router.js设置公共路由和动态路由，两个数组
 *2、在每个路由的meta里添加role数组，用来存储用户
 *3、登陆后dispatch ADD_ROUTERS
 *
 *
 *
 *
**/
import {cmnRouterMap, asyncRouterMap} from '@/router';
import {CONCAT_ROUTERS, ADD_ROUTERS} from '../mutations_types'

function hasThisRole(routes, role){
	//如果未meta设置roles就认为这个路由是可访问的，无权限限制
	if(routes.meta&&routes.meta.roles){
		//通过some()方法判断meta.roles中是否包含当前role，如果没有就认为没有此路由的访问权限，返回false，路由表中就不存入当前路由。
		return routes.meta.roles.some(v=>v===role);//检查meta.roles里有没有存在一个role
	}else{
		return true;//可能一级{}不存在role,但是其子集存在role
	}
};
//递归routerMap
function filterRouters(routes,role){
	//通过filter去过滤动态路由asyncRouterMap，遇到children就做递归，最后返回新的路由表
	const cacheRoutes = routes.filter(route=>{
		//当前路由是否插入是通过路由表中设置的meta里存储的roles进行判断，详见hasThisRole方法
		if(hasThisRole(route,role)){//一级{}有meta且存在role,就存入
			if(route.children&&route.children.length>0){//一级{}有children继续filter
				route.children = filterRouters(route.children,role);
			}
			return true;
		}
		return false;
	});
	return cacheRoutes;
}

const roles = {
	state:{
		newRouterMap:[]
	},
	mutations:{
		[CONCAT_ROUTERS] (state, routes) {
			state.newRouterMap = routes;
		}
	},
	actions: {
		[ADD_ROUTERS] ({commit,state},data) {
			return new Promise((resolve, reject)=>{
				let role;
				if(data.uid){//不改后台，直接判断有没有uid
					role = 1126;//本来需要后端返回role属性
				}else if(data.type==='guests'){
					role = 2;
				}
				let accessRoutes = filterRouters(asyncRouterMap,role);
				commit('CONCAT_ROUTERS',accessRoutes);
				resolve(state.newRouterMap);
			});
			
			

			
		}
	}
}

export default roles;