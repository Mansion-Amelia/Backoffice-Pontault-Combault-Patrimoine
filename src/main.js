import "./plugins/vue2-leaflet";
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)

/* Boostrap */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
Vue.use(BootstrapVue)

/* Stores */
import store from "./store/store";
import userStore from "./store/userStore";

/* firebase */
import * as firebase from "firebase";
firebase.auth().onAuthStateChanged(user => {
  userStore.dispatch("fetchUser", user);
});

Vue.config.productionTip = false
new Vue({
  router: router,
  el:'#app',
  store:store,
  render: h => h(App),
})