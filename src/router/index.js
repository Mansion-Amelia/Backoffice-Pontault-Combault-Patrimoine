import Vue from 'vue';
import * as firebase from "firebase";
import Router from 'vue-router';

import LoginAdministration from '../views/LoginAdministration'
import BackofficeSelector from '../views/BackofficeSelector'
import BackofficeApp from '../views/BackofficeApp'
import Home from '../views/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
      path: '/loginAdministration',
      name: 'loginAdministration',
      component: LoginAdministration
    },
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
  const requiresAdminAuth = to.matched.some(record => record.meta.requiresAdminAuth)

  if(requiresAdminAuth) {
    const currentUser = firebase.auth().currentUser
    let isAdmin = false
    if(currentUser) {
      isAdmin = currentUser.email === 'contact@pontault-combault-patrimoine.fr'
    }

    if(!isAdmin) next('/loginAdministration')
    else next()
  }
  else next()
})

export default router