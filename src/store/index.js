import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
    },
    getters: {
        GET_IS_AUTHENTICATED(state) {
            return state.isAuthenticated;
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            state.isAuthenticated = !!user && !!user.emailVerified
        }
    },
    actions: {
        authUser({commit}, user) {
            commit('SET_USER', user)
        },
        logout({commit}) {
            commit('SET_USER', null)
        }
    }
})

export default store;