import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import roles from './modules/roles'
import theme from './modules/theme'
import mockdatas from './modules/mockdata'//mock数据

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        roles,
        theme,
        mockdatas
    }
});

export default store
