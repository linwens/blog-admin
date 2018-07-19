import {DEL_ARTICLE, RESTORE_ARTICLE, UPDATE_ARTICLE, SORT_ARTICLE, FILTER_ARTICLE} from '../mutations_types'

const mockdatas = {
	state:{
		articleList:[
			{
				"time": "1527214893",
				"aid": "5771cc90-5fc2-11e8-af8e-91bfc1337408",
				"brief": "涉及微信，手机自动浏览器，app三端间的交互",
				"title": "活动开发--app与wap交互",
				"tags": [],
				"text":'',
				"operate": "save"
			}, {
				"time": "1526265440",
				"aid": "b9962e30-571f-11e8-af8e-91bfc1337408",
				"brief": "学习jQuery中ajax的实现思路，同时进一步学习ajax实现的原理。",
				"title": "jQuery学习(12)--$.ajax()",
				"tags": ["jquery", "ajax"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1525350303",
				"aid": "01b743d0-4ecd-11e8-af8e-91bfc1337408",
				"brief": "学习nginx配置，顺便研究下nginx是如何实现代理的。",
				"title": "nginx配置相关",
				"tags": ["nginx"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1524819256",
				"aid": "90e69df0-49f8-11e8-af8e-91bfc1337408",
				"brief": "vue-router原理",
				"title": "vue基础---vue-router原理",
				"tags": ["vue-router"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1524711257",
				"aid": "1c99b000-48fd-11e8-af8e-91bfc1337408",
				"brief": "vuex实现原理",
				"title": "vue基础---vuex实现原理",
				"tags": ["vuex"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1524448632",
				"aid": "a390b330-4699-11e8-af8e-91bfc1337408",
				"brief": "了解vue生命周期的原理",
				"title": "vue基础---生命周期",
				"tags": ["vue"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1524126779",
				"aid": "441e6a40-43ac-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(11)--$.attr()",
				"title": "jQuery学习(11)--$.attr()",
				"tags": ["attr", "access"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1523347484",
				"aid": "d4606180-3c95-11e8-af8e-91bfc1337408",
				"brief": "学习前端优化之cdn加速，后续涉及工程化思路",
				"title": "网络知识--CDN部署",
				"tags": ["cdn"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1523176074",
				"aid": "bbf57b70-3b06-11e8-af8e-91bfc1337408",
				"brief": "学习jQuery核心方法中的index()，获取元素对象索引值",
				"title": "jQuery学习(10)--index()",
				"tags": ["jQuery", "index"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1522823045",
				"aid": "c61f5eb0-37d0-11e8-af8e-91bfc1337408",
				"brief": "正则表达式学习记录",
				"title": "正则表达式记录",
				"tags": ["正则表达式", "exec"],
				"text":'',
				"operate": "save"
			},{
				"time": "1522806049",
				"aid": "33e422f0-37a9-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(9)--$()核心 及jQuery架构思路",
				"title": "jQuery学习(9)--$()核心",
				"tags": ["jQuery", "init"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1522748439",
				"aid": "11b3a8d0-3723-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(8)--$.param()",
				"title": "jQuery学习(8)--$.param()",
				"tags": ["jQuery", "param"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1522722609",
				"aid": "edc32f90-36e6-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(7)--$.proxy()",
				"title": "jQuery学习(7)--$.proxy()",
				"tags": ["jquery", "proxy"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1522550359",
				"aid": "e0b1c880-3555-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(5)--$.parseJSON()",
				"title": "jQuery学习(6)--$.parseJSON()",
				"tags": ["jQuery", "parseJSON"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1522335946",
				"aid": "a887e510-3362-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(5)--$.map()和$.inArray()",
				"title": "jQuery学习(5)--$.map()",
				"tags": ["jQuery", "map"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1522058371",
				"aid": "60f13900-30dc-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(4)--$.when()",
				"title": "jQuery学习(4)--$.when()",
				"tags": ["jQuery", "when"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1522052061",
				"aid": "afcb10f0-30cd-11e8-af8e-91bfc1337408",
				"brief": "jQuery学习(2)--$.grep()以及$.makeArray()",
				"title": "jQuery学习(3)--grep和makeArray",
				"tags": ["jQuery", "grep", "makeArray", "merge"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1521692371",
				"aid": "384ef160-2d88-11e8-af8e-91bfc1337408",
				"brief": "学习$.extend()、isPlainObject()的实现思路",
				"title": "jQuery学习(2)--$.extend()",
				"tags": ["jQuery", "extend"],
				"text":'',
				"operate": "save"
			}, {
				"time": "1521556660",
				"aid": "3e4d2560-2c4c-11e8-af8e-91bfc1337408",
				"brief": "jQuery源码学习，主要涉及数据操作。",
				"title": "jQuery学习(1)--$.each()",
				"tags": ["jQuery", "each"],
				"text":'',
				"operate": "publish"
			}, {
				"time": "1521425969",
				"aid": "f3fac750-2b1b-11e8-af8e-91bfc1337408",
				"brief": "vue单页模仿多页的切换效果",
				"title": "vue--单页面transition",
				"text":'',
				"tags": ["vue"],
				"operate": "save"
			}
		],//文章列表
        delArtlist:[],//被删除文章列表
        filterArtlist:[],//被筛选后列表
	},
	mutations:{
		[DEL_ARTICLE](state,payload){
			let index = payload.index;
			if(payload.curList&&payload.curList===1){
				let curItem = state.articleList[index];
				state.articleList.splice(index,1);
				state.delArtlist.push(curItem);
			}else if(payload.curList&&payload.curList===2){
				let curItem = state.filterArtlist[index];
				state.filterArtlist.splice(index,1);
				state.delArtlist.push(curItem);
				//同时删除articleList内的对应条目
				state.articleList.splice(state.articleList.findIndex(item=>item===curItem),1);
			}
			
		},
		[RESTORE_ARTICLE](state,payload){
			let index = payload.index;
			let curItem = state.delArtlist[index];
				state.delArtlist.splice(index,1);
				state.articleList.push(curItem);//只做简单的push
			if(payload.curList&&payload.curList===2){
				state.filterArtlist.push(curItem);//只做简单的push
			};
			console.log(state.articleList);
		},
		[UPDATE_ARTICLE](state, article){
			let curArticle = state.articleList.find((val,i,arr)=>{
			    return val.aid === article.aid;
			});
			if(curArticle){
				for(let key in article){
					if(curArticle.hasOwnProperty(key)){
						if(key==='tags'){
							curArticle[key] = [];//针对vue本地调试，改为body=>query
							for(let pro in JSON.parse(article.tags)){
							    curArticle[key].push(JSON.parse(article.tags)[pro])
							}
						}else{
							curArticle[key] = article[key]
						}
					}
				}
			}else{//如果curArticle不存在说明是新加数据
				let timeStr = parseInt(new Date().getTime()/1000);
				let newArt = Object.assign({},{time:timeStr, aid:'f3fac750-2b1b-11e8-af8e-91bfc1337408'},article)
				newArt['tags']=[]
				for(let pro in JSON.parse(article.tags)){
				    newArt['tags'].push(JSON.parse(article.tags)[pro])
				}
				state.articleList.unshift(newArt);
			}
			
		},
		[SORT_ARTICLE](state, payload){
			let type = payload.type;
			let val = payload.val;
			state.articleList.sort((a,b)=>{
				if(type==='time'){
					let rslt = a[type]-b[type];
					return rslt*val
				}
			});
			state.filterArtlist.sort((a,b)=>{
				if(type==='time'){
					let rslt = a[type]-b[type];
					return rslt*val
				}
			});
		},
		[FILTER_ARTICLE](state, payload){
			let filterArr = state.articleList.filter((curVal, index, arr)=>{
				let kw = payload.keywords;
				let type = payload.schType;
				if(!kw){
					return true;
				}else{
					let regExp = new RegExp(kw);
					let rslt = true;
					if(!type){
						rslt = regExp.test(JSON.stringify(curVal));
					}else{
						rslt = regExp.test(curVal[type]);
					}
					return rslt;
				}
			});
			state.filterArtlist = filterArr;
			console.log(state.filterArtlist);
		}
	},
	actions:{
		[DEL_ARTICLE]({commit},payload){
			commit('DEL_ARTICLE',payload);
		},
		[RESTORE_ARTICLE]({commit}, payload){
			commit('RESTORE_ARTICLE',payload);
			if(payload.sortRule&&payload.sortRule.type){//且对象不为空
				commit('SORT_ARTICLE', payload.sortRule);
			}else{
				//默认根据时间由近及远排序
				commit('SORT_ARTICLE', {type:'time',val:-1});
			}
		},
		[UPDATE_ARTICLE]({commit},article){
			return new Promise((resolve, reject)=>{
				commit('UPDATE_ARTICLE',article);

				resolve({
					res_msg:article.operate==='publish'?'文章修改成功并发布':'文章修改成功未发布'
				});
			});
		},
		[SORT_ARTICLE]({commit}, condition){//排序
			commit('SORT_ARTICLE', condition);
		},
		[FILTER_ARTICLE]({commit}, condition){//筛选：范围、关键字
			commit('FILTER_ARTICLE', condition);
		}
	}
};

export default mockdatas;