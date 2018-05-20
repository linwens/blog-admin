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

function recurRoutes(routes, role){
	if(routes.meta&&routes.meta.roles){
		return routes.meta.roles.some(v=>{
			v===role //检查meta.roles里有没有存在一个role
		});
	}else{
		return true;//可能一级{}不存在role,但是其子集存在role
	}
};

const roles = {
	state:{
		curRouterMap:cmnRouterMap,
		newRouterMap:[]
	},
	mutations:{
		[CONCAT_ROUTERS] (state, routes) {

			console.log('update');
			state.newRouterMap = cmnRouterMap.concat(routes);
		}
	},
	actions: {
		[ADD_ROUTERS] ({commit,state},data) {
			console.log('进入role.js-----ADD_ROUTERS');
			return new Promise((resolve, reject)=>{
				let role;
				if(data.uid){//不改后台，直接判断有没有uid
					role = 1126;//本来需要后端返回role属性
				}else{
					role = 2;
				}
				console.log(role);
				let accessRoutes = asyncRouterMap.filter(v=>{
					if(recurRoutes(v,role)){//一级{}有meta且存在role,就存入
						if(v.children&&v.children.length>0){//一级{}有children继续filter
							v.children = v.children.filter(c=>{//二级{}有meta且存在role,就存入
								return recurRoutes(c,role)
							})
						}else{
							console.log('retur true');
							return true;
						}
					}else{
						return false;
					}
				});
				commit('CONCAT_ROUTERS',accessRoutes);
				resolve(state.newRouterMap);
			});
			
			

			
		}
	}
}

export default roles;