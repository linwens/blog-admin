import {BAR_SWITCH, CHANGE_COLOR} from '../mutations_types'
/**
 *主题色切换思路：
 *1、在state里设置色值，方便全局调用；
 *2、在utils里设置颜色渐变的方法函数 gradualChange(全局主题色，渐变幅度)；
 *3、在页面中的每个涉及颜色的元素中调用 gradualChange,实现颜色渐变；
 *4、
 *
 *
 *
 *
**/
const theme = {
	state:{
		sideBarCol:false,//侧边栏收缩开关
		themeColor:'#409EFF',//网站主题色
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