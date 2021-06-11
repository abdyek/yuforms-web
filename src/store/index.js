import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    formTitle: 'New Form Title'
}

const getters = {
    
}

const mutations = {
    setFormTitle(state, title) {
        state.formTitle = title
    }
}

const actions = {
    setFormTitle({commit}, title) {
        commit('setFormTitle', title)
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
