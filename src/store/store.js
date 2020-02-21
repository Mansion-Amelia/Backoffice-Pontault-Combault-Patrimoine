import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state= {
    activePageBackoffice:null,
    backofficeLocation:[],
    backofficeWalk:[],
    backofficeQuestion:[],
    localStoreLocations:[],
    localStoreWalks:[],
    localStoreQuestions:[]
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
    },
    ADD_LOCATION(state,props){
        state.localStoreLocations.push(props)
    },
    ADD_WALK(state,props){
        state.localStoreWalks.push(props)
    },
    ADD_QUESTION(state,props){
        state.localStoreQuestions.push(props)
    },
    DELETE_LOCATION(state,props){
        state.localStoreLocations=state.localStoreLocations.filter((item) => item.name !== props.name)
    },
    DELETE_WALK(state,props){
        state.localStoreWalks=state.localStoreWalks.filter((item) => item.name !== props.name)
    },
    DELETE_QUESTION(state,props){
        state.localStoreQuestions=state.localStoreQuestions.filter((item) => item.name !== props.name)
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
    },
    getLocalStoreLocations(state){
        return state.localStoreLocations
    },
    getLocalStoreWalks(state){
        return state.localStoreWalks
    },
    getLocalStoreQuestions(state){
        return state.localStoreQuestions
    },
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
    },
    addLocationToStore(store,props){
        store.commit('ADD_LOCATION',props)
    },
    addWalkToStore(store,props){
        store.commit('ADD_WALK',props)
    },
    addQuestionToStore(store,props){
        store.commit('ADD_QUESTION',props)
    },
    deleteLocationFromStore: (store, props) => {
        store.commit('DELETE_LOCATION', props)
    },
    deleteWalkFromStore: (store, props) => {
        store.commit('DELETE_WALK', props)
    },
    deleteQuestionFromStore: (store, props) => {
        store.commit('DELETE_QUESTION', props)
    },
}

export default new Vuex.Store({
    state:state,
    mutations:mutations,
    getters:getters,
    actions:actions
})