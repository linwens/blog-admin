import Vue from 'vue'
import {USER_LOGIN, USER_LOGOUT} from '../mutations_types'

const user = {
	state: JSON.parse(sessionStorage.getItem('user')) || '',
	mutations: {
		[USER_LOGIN] (state, user) {
			sessionStorage.setItem('user', JSON.stringify(user))//把前端传过来的值存进sessionStorage的user下
			Object.assign(state, user)//把user这个存储用户数据的对象添加到state里
		},
		[USER_LOGOUT] (state) {
			sessionStorage.removeItem('user')
			state = ''
		}
	},
	actions: {
		[USER_LOGIN] ({commit},user) {
			commit('USER_LOGIN', user)
		},
		[USER_LOGOUT] ({commit}) {
			commit('USER_LOGOUT')
		}
	}
}


export default user


//Old function
// export default {
// 	state: JSON.parse(sessionStorage.getItem('user')) || '',


// 	//从session里取user这个字段，没有就是空
// 	mutations: {
// 		[USER_LOGIN] (state, user) {
// 			sessionStorage.setItem('user', JSON.stringify(user))//把前端传过来的值存进sessionStorage的user下
// 			Object.assign(state, user)//把user这个存储用户数据的对象添加到state里
// 		},
// 		[USER_LOGOUT] (state) {
// 			sessionStorage.removeItem('user')
// 			state = {}
// 		}
// 	},
// 	actions: {
// 		[USER_LOGIN] ({commit},user) {
// 			commit('USER_LOGIN', user)
// 		},
// 		[USER_LOGOUT] ({commit}) {
// 			commit('USER_LOGOUT')
// 		}
// 	}
// }