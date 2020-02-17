import Vue from 'vue';
import * as firebase from "firebase";
import Router from 'vue-router';

import LoginAdministration from '../views/LoginAdministration'
import BackofficeSelector from '../views/BackofficeSelector'
import BackofficeApp from '../views/BackofficeApp'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    /*{
        path: '/',
        name: 'home',
        component: Home
    },*/
    {
      path: '/',
      name: 'loginAdministration',
      component: LoginAdministration
    },
    /*{
        path: 'backoffice/*',
        redirect: '/backoffice'
    },*/
    {
      path: '/backoffice/selector',
      name: 'BackofficeSelector',
      component: BackofficeSelector,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/backoffice/app',
      name: 'BackofficeApp',
      component: BackofficeApp,
      meta: { requiresAdminAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAdminAuth = to.matched.some(record => record.meta.requiresAdminAuth)
  let isAdmin = false
  if(currentUser) {
    isAdmin = currentUser.email === 'contact@pontault-combault-patrimoine.fr'
  }

  // if(to.name === 'loginAdministration' && isAdmin) next('BackofficeApp')
  if(requiresAdminAuth) {
    if(!isAdmin) next('loginAdministration')
    else next()
  }
  else next()
})

export default router