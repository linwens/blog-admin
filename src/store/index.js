import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import roles from './modules/roles'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        roles
    }
});

export default store
