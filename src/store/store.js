import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state= {
    localStoreLocation:[],
    localStoreWalk:[],
    activeLocation: {},
    activePage:null,
    activeTitle:null,
    activePageBackoffice:null,
    activeWalk:{},
    backofficeLocation:[],
    backofficeWalk:[],
    previousPage:null,
    previousLocation:null,
    previousWalk:null
}

const mutations= {
    ADD_LOCATION(state,props){
        state.localStoreLocation.push(props)
    },
    ADD_WALK(state,props){
        state.localStoreWalk.push(props)
    },
    SET_ACTIVE_LOCATION(state, props){
        state.activeLocation=props
    },
    SET_ACTIVE_PAGE(state, props){
        state.activePage=props
    },
    SET_ACTIVE_TITLE(state, props){
        if(props=="VisiteLibre"){
            props="Visite Libre"
        }
        state.activeTitle=props
    },
    SET_ACTIVE_PAGE_BACKOFFICE(state, props){
        state.activePageBackoffice=props
    },
    SET_ACTIVE_WALK(state, props){
        state.activeWalk=props
    },
    DELETE_LOCATION(state,props){
        state.localStoreLocation=state.localStoreLocation.filter((item) => item.name !== props.name)
    },
    DELETE_WALK(state,props){
        state.localStoreWalk=state.localStoreWalk.filter((item) => item.name !== props.name)
    },
    DELETE_BACKOFFICE_LOCATION(state,props){
        state.backofficeLocation=state.backofficeLocation.filter((item) => item.name !== props.name)
    },
    DELETE_BACKOFFICE_WALK(state,props){
        state.backofficeWalk=state.backofficeWalk.filter((item) => item.name !== props.name)
    },
    SET_BACKOFFICE_LOCATION(state, props){
        state.backofficeLocation=props
    },
    SET_BACKOFFICE_WALK(state, props){
        state.backofficeWalk=props
    },
    SET_PREVIOUS_PAGE(state, props){
        state.previousPage=props
    },
    SET_PREVIOUS_LOCATION(state, props){
        state.previousLocation=props
    },
    SET_PREVIOUS_WALK(state, props){
        state.previousWalk=props
    },
}
const getters={
    getLocalStoreLocation(state){
        return state.localStoreLocation
    },
    getLocalStoreWalk(state){
        return state.localStoreWalk
    },
    getActiveLocation(state){
        return state.activeLocation
    },
    getActivePage(state){
        return state.activePage
    },
    getActiveTitle(state){
        return state.activeTitle
    },
    getActivePageBackoffice(state){
        return state.activePageBackoffice
    },
    getActiveWalk(state){
        return state.activeWalk
    },
    getBackofficeLocation(state){
        return state.backofficeLocation
    },
    getBackofficeWalk(state){
        return state.backofficeWalk
    },
    getPreviousPage(state){
        return state.previousPage
    },
    getPreviousLocation(state){
        return state.previousLocation
    },
    getPreviousWalk(state){
        return state.previousWalk
    },
}

const actions={
    addLocationToStore(store,props){
        store.commit('ADD_LOCATION',props)
    },
    addWalkToStore(store,props){
        store.commit('ADD_WALK',props)
    },
    setActiveLocation : (store,props) => {
        store.commit('SET_ACTIVE_LOCATION', props)
    },
    setActivePage : (store,props) => {
        store.commit('SET_ACTIVE_PAGE', props)
    },
    setActiveTitle : (store,props) => {
        store.commit('SET_ACTIVE_TITLE', props)
    },
    setActivePageBackoffice : (store,props) => {
        store.commit('SET_ACTIVE_PAGE_BACKOFFICE', props)
    },
    setActiveWalk : (store,props) => {
        store.commit('SET_ACTIVE_WALK', props)
    },
    deleteLocationFromStore: (store, props) => {
        store.commit('DELETE_LOCATION', props)
    },
    deleteWalkFromStore: (store, props) => {
        store.commit('DELETE_WALK', props)
    },
    deleteBackofficeLocation: (store, props) => {
        store.commit('DELETE_BACKOFFICE_LOCATION', props)
    },
    deleteBackofficeWalk: (store, props) => {
        store.commit('DELETE_BACKOFFICE_WALK', props)
    },
    setBackofficeLocation: (store, props) => {
        store.commit('SET_BACKOFFICE_LOCATION', props)
    },
    setBackofficeWalk: (store, props) => {
        store.commit('SET_BACKOFFICE_WALK', props)
    },
    setPreviousPage: (store, props) => {
        store.commit('SET_PREVIOUS_PAGE', props)
    },
    setPreviousLocation: (store, props) => {
        store.commit('SET_PREVIOUS_LOCATION', props)
    },
    setPreviousWalk: (store, props) => {
        store.commit('SET_PREVIOUS_WALK', props)
    }
}

export default new Vuex.Store({
    state:state,
    mutations:mutations,
    getters:getters,
    actions:actions
})