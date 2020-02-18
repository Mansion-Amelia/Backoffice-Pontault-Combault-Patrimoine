import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state= {
    activePageBackoffice:null,
    backofficeLocation:[],
    backofficeWalk:[],
    backofficeQuestion:[]
}

const mutations= {
    SET_ACTIVE_PAGE_BACKOFFICE(state, props){
        state.activePageBackoffice=props
    },
    DELETE_BACKOFFICE_LOCATION(state,props){
        state.backofficeLocation=state.backofficeLocation.filter((item) => item.name !== props.name)
    },
    DELETE_BACKOFFICE_WALK(state,props){
        state.backofficeWalk=state.backofficeWalk.filter((item) => item.name !== props.name)
    },
    DELETE_BACKOFFICE_QUESTION(state,props){
        state.backofficeQuestion=state.backofficeQuestion.filter((item) => item.name !== props.name)
    },
    SET_BACKOFFICE_LOCATION(state, props){
        state.backofficeLocation=props
    },
    SET_BACKOFFICE_WALK(state, props){
        state.backofficeWalk=props
    },
    SET_BACKOFFICE_QUESTION(state, props){
        state.backofficeQuestion=props
    }
}
const getters={
    getActivePageBackoffice(state){
        return state.activePageBackoffice
    },
    getBackofficeLocation(state){
        return state.backofficeLocation
    },
    getBackofficeWalk(state){
        return state.backofficeWalk
    },
    getBackofficeQuestion(state){
        return state.backofficeQuestion
    }
}

const actions={
    setActivePageBackoffice : (store,props) => {
        store.commit('SET_ACTIVE_PAGE_BACKOFFICE', props)
    },
    deleteBackofficeLocation: (store, props) => {
        store.commit('DELETE_BACKOFFICE_LOCATION', props)
    },
    deleteBackofficeWalk: (store, props) => {
        store.commit('DELETE_BACKOFFICE_WALK', props)
    },
    deleteBackofficeQuestion: (store, props) => {
        store.commit('DELETE_BACKOFFICE_QUESTION', props)
    },
    setBackofficeLocation: (store, props) => {
        store.commit('SET_BACKOFFICE_LOCATION', props)
    },
    setBackofficeWalk: (store, props) => {
        store.commit('SET_BACKOFFICE_WALK', props)
    },
    setBackofficeQuestion: (store, props) => {
        store.commit('SET_BACKOFFICE_QUESTION', props)
    }
}

export default new Vuex.Store({
    state:state,
    mutations:mutations,
    getters:getters,
    actions:actions
})