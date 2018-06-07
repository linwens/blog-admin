// import Vue from 'vue'
import {USER_LOGIN, USER_LOGOUT} from '../mutations_types'

const user = {
	state: JSON.parse(localStorage.getItem('userdata')) || '',
	mutations: {
		[USER_LOGIN] (state, user) {
			localStorage.setItem('userdata', JSON.stringify(user))//把前端传过来的值存进sessionStorage的user下
			Object.assign(state, user)//把user这个存储用户数据的对象添加到state里
		},
		[USER_LOGOUT] (state) {
			localStorage.removeItem('userdata')
			state = null
		}
	},
	actions: {
		[USER_LOGIN] ({commit,dispatch},user) {
			commit('USER_LOGIN', user);
			//触发动态加载路由
			return new Promise((resolve, reject)=>{
				dispatch('ADD_ROUTERS', user).then(res=>{
					resolve(res);
				});

			});
		},
		[USER_LOGOUT] ({commit}) {
			commit('USER_LOGOUT')
		}
	}
}


export default user
