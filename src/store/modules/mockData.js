import {DEL_ARTICLE, RESTORE_ARTICLE} from '../mutations_types'

const mockdatas = {
	state:{
		articleList:[
			{
				"time": "1527214893",
				"aid": "5771cc90-5fc2-11e8-af8e-91bfc1337408",
				"brief": "涉及微信，手机自动浏览器，app三端间的交互",
				"title": "活动开发--app与wap交互",
				"tags": [],
				"operate": "save"
			}, {
				"time": "1526265440",
				"aid": "b9962e30-571f-11e8-af8e-91bfc1337408",
				"brief": "学习jQuery中ajax的实现思路，同时进一步学习ajax实现的原理。",
				"title": "jQuery学习(12)--$.ajax()",
				"tags": ["jquery", "ajax"],
				"operate": "save"
			}, {
				"time": "1525350303",
				"aid": "01b743d0-4ecd-11e8-af8e-91bfc1337408",
				"brief": "学习nginx配置，顺便研究下nginx是如何实现代理的。",
				"title": "nginx配置相关",
				"tags": ["nginx"],
				"operate": "save"
			}, {
				"time": "1524819256",
				"aid": "90e69df0-49f8-11e8-af8e-91bfc1337408",
				"brief": "vue-router原理",
				"title": "vue基础---vue-router原理",
				"tags": ["vue-router"],
				"operate": "save"
			}, {
				"time": "1524711257",
				"aid": "1c99b000-48fd-11e8-af8e-91bfc1337408",
				"brief": "vuex实现原理",
				"title": "vue基础---vuex实现原理",
				"tags": ["vuex"],
				"operate": "save"
			}, {
				"time": "1524448632",
				"aid": "a390b330-4699-11e8-af8e-91bfc1337408",
				"brief": "了解vue生命周期的原理",
				"title": "vue基础---生命周期",
				"tags": ["vue"],
				"operate": "save"
			}, {
				"time": "1524126779",
				"aid": "441e6a40-43ac-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(11)--$.attr()",
				"title": "jQuery学习(11)--$.attr()",
				"tags": ["attr", "access"],
				"operate": "save"
			}, {
				"time": "1523347484",
				"aid": "d4606180-3c95-11e8-af8e-91bfc1337408",
				"brief": "学习前端优化之cdn加速，后续涉及工程化思路",
				"title": "网络知识--CDN部署",
				"tags": ["cdn"],
				"operate": "save"
			}, {
				"time": "1523176074",
				"aid": "bbf57b70-3b06-11e8-af8e-91bfc1337408",
				"brief": "学习jQuery核心方法中的index()，获取元素对象索引值",
				"title": "jQuery学习(10)--index()",
				"tags": ["jQuery", "index"],
				"operate": "save"
			}, {
				"time": "1522823045",
				"aid": "c61f5eb0-37d0-11e8-af8e-91bfc1337408",
				"brief": "正则表达式学习记录",
				"title": "正则表达式记录",
				"tags": ["正则表达式", "exec"],
				"operate": "save"
			},{
				"time": "1522806049",
				"aid": "33e422f0-37a9-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(9)--$()核心 及jQuery架构思路",
				"title": "jQuery学习(9)--$()核心",
				"tags": ["jQuery", "init"],
				"operate": "save"
			}, {
				"time": "1522748439",
				"aid": "11b3a8d0-3723-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(8)--$.param()",
				"title": "jQuery学习(8)--$.param()",
				"tags": ["jQuery", "param"],
				"operate": "save"
			}, {
				"time": "1522722609",
				"aid": "edc32f90-36e6-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(7)--$.proxy()",
				"title": "jQuery学习(7)--$.proxy()",
				"tags": ["jquery", "proxy"],
				"operate": "save"
			}, {
				"time": "1522550359",
				"aid": "e0b1c880-3555-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(5)--$.parseJSON()",
				"title": "jQuery学习(6)--$.parseJSON()",
				"tags": ["jQuery", "parseJSON"],
				"operate": "save"
			}, {
				"time": "1522335946",
				"aid": "a887e510-3362-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(5)--$.map()和$.inArray()",
				"title": "jQuery学习(5)--$.map()",
				"tags": ["jQuery", "map"],
				"operate": "save"
			}, {
				"time": "1522058371",
				"aid": "60f13900-30dc-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(4)--$.when()",
				"title": "jQuery学习(4)--$.when()",
				"tags": ["jQuery", "when"],
				"operate": "save"
			}, {
				"time": "1522052061",
				"aid": "afcb10f0-30cd-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(2)--$.grep()以及$.makeArray()",
				"title": "jQuery学习(3)--grep和makeArray",
				"tags": ["jQuery", "grep", "makeArray", "merge"],
				"operate": "save"
			}, {
				"time": "1521692371",
				"aid": "384ef160-2d88-11e8-af8e-91bfc1337408",
				"brief": "学习$.extend()、isPlainObject()的实现思路",
				"title": "jQuery学习(2)--$.extend()",
				"tags": ["jQuery", "extend"],
				"operate": "save"
			}, {
				"time": "1521556660",
				"aid": "3e4d2560-2c4c-11e8-af8e-91bfc1337408",
				"brief": "jQuery源码学习，主要涉及数据操作。",
				"title": "jQuery学习(1)--$.each()",
				"tags": ["jQuery", "each"],
				"operate": "publish"
			}, {
				"time": "1521425969",
				"aid": "f3fac750-2b1b-11e8-af8e-91bfc1337408",
				"brief": "vue单页模仿多页的切换效果",
				"title": "vue--单页面transition",
				"tags": ["vue"],
				"operate": "save"
			}
		],//文章列表
        delArtlist:[],//被删除文章列表
	},
	mutations:{
		[DEL_ARTICLE](state,index){
			let curItem = state.articleList[index];
			state.articleList.splice(index,1);
			state.delArtlist.push(curItem);
		},
		[RESTORE_ARTICLE](state,index){
			let curItem = state.delArtlist[index];
			state.delArtlist.splice(index,1);
			//还原后插回到原来的位置，根据时间顺序
			state.articleList.push(curItem);
			state.articleList.sort(function(a,b){
				return -(a.time-b.time);
			});
		}
	},
	actions:{
		[DEL_ARTICLE]({commit},index){
			commit('DEL_ARTICLE',index);
		},
		[RESTORE_ARTICLE]({commit},index){
			commit('RESTORE_ARTICLE',index);
		}
	}
};

export default mockdatas;