import {BAR_SWITCH, CHANGE_COLOR} from '../mutations_types'
const theme = {
	state:{
		sideBarCol:true,//侧边栏收缩开关
		themeColor:'#409EFF',//网站默认主题色
	},
	mutations:{
		[BAR_SWITCH](state){
			state.sideBarCol = !state.sideBarCol;
		},
		[CHANGE_COLOR](state,newColor){
			state.themeColor = newColor
		}
	},
	actions:{
		[BAR_SWITCH]({commit}){
			commit('BAR_SWITCH')
		},
		[CHANGE_COLOR]({commit},newColor){
			commit('CHANGE_COLOR',newColor)
		}
	}
}
export default theme;