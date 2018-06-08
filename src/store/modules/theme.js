import {BAR_SWITCH} from '../mutations_types'

const theme = {
	state:{
		sideBarCol:false,//侧边栏收缩开关
		themeColor:'default',//网站主题
	},
	mutations:{
		[BAR_SWITCH](state){
			state.sideBarCol = !state.sideBarCol;
			console.log(state.sideBarCol)
		}
	},
	actions:{
		[BAR_SWITCH]({commit}){
			commit('BAR_SWITCH')
		}
	}
}
export default theme;