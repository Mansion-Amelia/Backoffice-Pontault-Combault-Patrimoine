import "./plugins/vue2-leaflet";
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)
import { db } from './config/db'

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

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    db.ref('site/users/' + user.uid).once('value').then(function(snapshot) {
      userStore.dispatch("fetchUser", snapshot.val());
      userStore.dispatch("setIsVerified", user.emailVerified)
      if (!app) {
        app = new Vue({
          router: router,
          el:'#app',
          store:store,
          render: h => h(App),
        })
      }
    });
  }
  else {
    if (!app) {
      app = new Vue({
        router: router,
        el:'#app',
        store:store,
        render: h => h(App),
      })
    }
  } 
});

/* DIRECTIVEs */

Vue.directive('vpshow', {
  inViewport (el) {
    var rect = el.getBoundingClientRect()
    return !(rect.bottom < 0 || rect.right < 0 || 
             rect.left > window.innerWidth ||
             rect.top > window.innerHeight)
  },

  bind(el, binding) {
    if(binding.value === 'left') {
      el.classList.add('lbefore-enter')
    }
    else {
      el.classList.add('rbefore-enter')
    }

    el.$onScroll = function() {
      if (binding.def.inViewport(el)) {
        if(binding.value === 'left') {
          el.classList.remove('lbefore-enter')
        }
        else {
          el.classList.remove('rbefore-enter')
        }
        el.classList.add('enter')
       
        binding.def.unbind(el, binding)        
      }
    }
    document.addEventListener('scroll', el.$onScroll)
  },

  inserted(el) {
    el.$onScroll()  
  },

  unbind(el) {    
    document.removeEventListener('scroll', el.$onScroll)
    delete el.$onScroll
  }  
})