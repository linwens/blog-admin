import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getter';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    },
    getters
});

export default store


//Old function
// const state = {
// 	user:{}
// }
// getters
// const mutations = {}
// const actions = {}
// const modules = {
// 	user
// }

// export default new Vuex.Store({
// 	state,
// 	getters,
// 	mutations,
// 	actions,
// 	modules
// })