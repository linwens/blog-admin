import {BAR_SWITCH, CHANGE_COLOR} from '../mutations_types'

const theme = {
	state:{
		sideBarCol:false,//侧边栏收缩开关
		themeColor:'#1e90ff',//网站主题色
	},
	mutations:{
		[BAR_SWITCH](state){
			state.sideBarCol = !state.sideBarCol;
			console.log(state.sideBarCol)
		},
		[CHANGE_COLOR](state,newColor){
			console.log('newColor------' + newColor);
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