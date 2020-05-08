import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      isVerified: false,
      datas: null
    }
  },
  getters: {
    user(state){
      return state.user
    },
    userName(state){
      if(state.user.datas && state.user.datas.firstName && state.user.datas.lastName)
        return state.user.datas.firstName + ' ' + state.user.datas.lastName
      return null
    },
    userFirstName(state){
      if(state.user.datas && state.user.datas.firstName)
        return state.user.datas.firstName
      return null
    },
    userLastName(state){
      if(state.user.datas && state.user.datas.lastName)
        return state.user.datas.lastName
      return null
    },
    userMail(state){
      if(state.user.datas && state.user.datas.email)
        return state.user.datas.email
      return null
    },
    userAddress(state){
      if(state.user.datas && state.user.datas.address)
        return state.user.datas.address
      return null
    },
    userCP(state){
      if(state.user.datas && state.user.datas.cp)
        return state.user.datas.cp
      return null
    },
    userCity(state){
      if(state.user.datas && state.user.datas.city)
        return state.user.datas.city
      return null
    },
    userHasAccess(state){
      if(state.user.datas)
        return state.user.datas.hasAccess
    },

  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_IS_VERIFIED(state, value) {
      state.user.isVerified = value;
    },
    SET_USER(state, datas) {
      state.user.datas = datas;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", user);
      } else {
        commit("SET_USER", null);
      }
    },
    setIsVerified({ commit }, bool) {
      commit("SET_IS_VERIFIED", bool)
    }
  }
});