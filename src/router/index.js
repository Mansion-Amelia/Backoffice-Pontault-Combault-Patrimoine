import Vue from 'vue';
import * as firebase from "firebase";
import Router from 'vue-router';


import LoginAdministration from '../views/site/LoginAdministration'
import BackofficeSelector from '../views/backoffice/BackofficeSelector'
import BackofficeApp from '../views/backoffice/BackofficeApp'
import BackofficeSite from '../views/backoffice/BackofficeSite'
import AddDocument from '../views/backoffice/AddDocument'
import EditContent from '../views/backoffice/EditContent'
import AddReview from '../views/backoffice/AddReview'
import AddNews from '../views/backoffice/AddNews'
import EditNews from '../views/backoffice/EditNews'
import EditTerms from '../views/backoffice/EditTerms'
import EditLink from '../views/backoffice/EditLink'

import Home from '../views/site/Home'
import LoginAdhérent from '../views/site/LoginAdherent'
import Signup from '../views/site/Signup'
import EspaceAdherent from '../views/site/EspaceAdherent'
import Review from '../views/site/Review'
import News from '../views/site/News'
import Terms from '../views/site/Terms'

import EditProfile from '../components/commons/EditProfile'

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
      path: '/revue',
      name: 'Review',
      component: Review
    },
    {
      path: '/espaceAdherent',
      name: 'espaceAdherent',
      component: EspaceAdherent,
      meta: { requiresAuth: true }
    },
    {
      path: '/loginAdherent',
      name: 'loginAdherent',
      component: LoginAdhérent,
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Signup
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfile,
      meta: { requiresAuth: true },
      props: true
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
    },
    {
      path: '/backoffice/site',
      name: 'BackofficeSite',
      component: BackofficeSite,
      meta: { requiresAdminAuth: true },
      props: true
    },
    {
      path: '/backoffice/site/ajoutDocument',
      name: 'AddDocument',
      component: AddDocument,
      meta: { requiresAdminAuth: true },
      props: true
    },
    {
      path: '/backoffice/site/editionContenu',
      name: 'EditContent',
      component: EditContent,
      meta: { requiresAdminAuth: true },
      props: true
    },
    {
      path: '/backoffice/site/editionLien',
      name: 'EditLink',
      component: EditLink,
      meta: { requiresAdminAuth: true },
      props: true
    },
    {
      path: '/backoffice/site/ajoutRevue',
      name: 'AddReview',
      component: AddReview,
      meta: { requiresAdminAuth: true },
      props: true
    }, 
    {
      path: '/backoffice/site/ajoutActualite',
      name: 'AddNews',
      component: AddNews,
      meta: { requiresAdminAuth: true },
      props: true
    },
    {
      path: '/backoffice/site/editionActualite',
      name: 'EditNews',
      component: EditNews,
      meta: { requiresAdminAuth: true },
      props: true
    },
    {
      path: '/actualite',
      name: 'News',
      component: News,
    },
    {
      path: '/mentionsLegales',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/backoffice/site/editionMentionsLegales',
      name: 'EditTerms',
      component: EditTerms,
      meta: { requiresAdminAuth: true },
      props: true
    },

  ]
});

router.beforeEach((to, from, next) => {
  const requiresAdminAuth = to.matched.some(record => record.meta.requiresAdminAuth)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAdminAuth || requiresAuth ) {
    const currentUser = firebase.auth().currentUser
    if(requiresAdminAuth) {
      let isAdmin = false
      if(currentUser) {
        isAdmin = currentUser.email === 'contact@pontault-combault-patrimoine.fr'
      }
      if(!isAdmin) next('loginAdministration')
      else next()
    }
    else {
      if(!currentUser) next('/loginAdherent')
      else next()
    }

  }
  else next()
})

export default router